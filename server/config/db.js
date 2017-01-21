// let pool;
const Pool = require('pg').Pool;

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config = {
  user: process.env.DB_USER, // env var: PGUSER
  database: process.env.DB, // env var: PGDATABASE
  password: process.env.DB_PASS, // env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 300000, // how long a client is allowed to remain idle before being closed
};

// this initializes a connection pool
// it will keep idle connections open for a 30 seconds
// and set a limit of maximum 10 idle clients
const pool = new Pool(config);

process.on('error', (e) => {
  console.log(e.message, e.stack);
});

export async function getAllModules(studentid) {
  const query = `SELECT programmes.name,programmeModules.moduleCode,timetable.roomid,timetable.startTime,timetable.endTime,timetable.day FROM students INNER JOIN programmes ON students.programmeid=programmes.id INNER JOIN programmeModules ON programmeModules.programmeid = programmes.id INNER JOIN timetable ON programmeModules.moduleCode = timetable.moduleid WHERE students.id = '${studentid}';`;
  await pool.query(query, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    // console.log(result.rows);
    return result.rows;
  });
}

export async function getStudent(studentid) {
  const query = `SELECT * FROM students WHERE students.id = '${studentid}';`;
  await pool.query(query, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    // console.log(result.rows[0].name);
    return result.rows[0].name;
  });
}

export async function getStudentTimetable(studentid) {
  try {
    const sql = `SELECT modules.code,
                        m.capacity,
                        m.startTime,
                        m.endtime,
                        m.groupNumber,
                        m.day,
                        t.name
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduletype = t.id
                 INNER JOIN studentTimetable AS s
                 ON     s.moduleType = m.id
                 INNER JOIN modules
                 ON     t.moduleCode = modules.code
                 WHERE  m.groupNumber = s.groupNumber AND s.studentid = '${studentid}';`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getModuleTimetable(moduleCode) {
  try {
    const sql = `SELECT DISTINCT ON(modules.code,t.name)
                        modules.code,
                        m.startTime,
                        m.endtime,
                        m.groupNumber,
                        m.day,
                        t.name
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduleType = t.id
                 INNER JOIN modules
                 ON     t.moduleCode = modules.code
                 WHERE  modules.code = '${moduleCode}';`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getModuleTypeTimetable(moduleCode, groupNumber, name) {
  try {
    const sql = `SELECT modules.code,
           m.startTime,
           m.endtime,
           m.groupNumber,
           m.day,
           t.name
    FROM    moduleTimetable AS m
    INNER JOIN moduleTypes AS t
    ON      m.moduleType = t.id
    INNER JOIN modules
    ON      t.moduleCode = modules.code
    WHERE   modules.code = '${moduleCode}' AND m.groupNumber != ${groupNumber} AND t.name = '${name}'`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getModuleCount(moduleCode) {
  try {
    const sql = `SELECT t.moduleCode,
                        m.moduleType,
                        m.groupNumber,
                        m.capacity,
                        count(*)
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduleType = t.id
                 FULL OUTER JOIN studentTimetable AS s
                 ON     s.moduleType = m.id
                 WHERE  t.moduleCode = '${moduleCode}'
                 GROUP BY m.moduleType, m.groupNumber, t.moduleCode, m.capacity
                 HAVING count(*) > 0;`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getProgrammeModules(studentid) {
  try {
    const sql = `SELECT m.programmeid,
                        m.code
                 FROM   modules AS m
                 INNER JOIN students AS s
                 ON     m.programmeid = s.programmeid
                 WHERE  s.id = '${studentid}';`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

async function query(sql) {
  try {
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(err);
  }
}

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
    const sql = `SELECT students.id,studentTimetable.moduleCode,studentTimetable.class,timetable.roomid,timetable.startTime,timetable.endTime,timetable.day FROM students INNER JOIN studentTimetable ON students.id = studentTimetable.studentid INNER JOIN timetable ON studentTimetable.moduleCode=timetable.moduleid WHERE studentTimetable.class = timetable.class AND students.id = '${studentid}';`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getModuleTimetable(moduleCode) {
  try {
    const sql = `SELECT moduleid,roomid,startTime,endTime,class,day FROM timetable WHERE moduleid = '${moduleCode}';`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getModuleCount(moduleCode) {
  try {
    const sql = `SELECT modules.code, COUNT(*), modules.capacity FROM studentTimetable INNER JOIN modules ON moduleCode = code WHERE moduleCode = '${moduleCode}' GROUP BY modules.code;`;
    return await query(sql);
  } catch (err) {
    throw new Error(err);
  }
}

export async function getProgrammeModules(studentid) {
  try {
    const sql = `SELECT students.id,programmeModules.moduleCode FROM programmeModules INNER JOIN students ON programmeModules.programmeid = students.programmeid WHERE students.id = '${studentid}';`;
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

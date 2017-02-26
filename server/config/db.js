import { Pool } from 'pg';

process.on('error', (e) => {
  console.log(e.message, e.stack);
});

  // create a config to configure both pooling behavior
  // and client options
  // note: all config is optional and the environment variables
  // will be read if the config is not present
const config = {
  user: process.env.DB_USER, // env var: PGUSER
  database: process.env.DB, // env var: PGDATABASE
  password: process.env.DB_PASS, // env var: PGPASSWORD
  host: process.env.DB_HOST, // Server hosting the postgres database
  port: process.env.DB_PORT, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true,
};

const pools = new Pool(config);

export async function removeOldModules(studentid, pool = pools) {
  try {
    const sql = `DELETE
                 FROM   studentTimetable
                 WHERE  studentid = '${studentid}';`;
    const { rowCount } =  await pool.query(sql);
    return rowCount;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function insertStudentTimetable(studentid, id, groupNumber, pool = pools) {
  try {
    const sql = `INSERT INTO studentTimetable (studentid,moduleType,groupNumber)
                 VALUES ('${studentid}', ${id}, ${groupNumber});`;
    const { rowCount } =  await pool.query(sql);
    return rowCount;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getStudentModules(studentid, pool = pools) {
  try {
    const sql = `SELECT DISTINCT ON (m.code)
                        m.code,
                        m.compulsory
                 FROM   modules AS m
                 INNER JOIN moduleTypes AS t
                 ON     t.moduleCode = m.code
                 INNER JOIN moduleTimetable AS mt
                 ON     t.id = mt.moduleType
                 INNER JOIN studentTimetable AS s
                 ON     mt.id = s.moduleType
                 WHERE  s.studentid = '${studentid}';`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getStudentTimetable(studentid, pool = pools) {
  try {
    const sql = `SELECT modules.code,
                        m.capacity,
                        m.startTime,
                        m.endtime,
                        m.groupNumber,
                        m.day,
                        t.name,
                        m.id
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduletype = t.id
                 INNER JOIN studentTimetable AS s
                 ON     s.moduleType = m.id
                 INNER JOIN modules
                 ON     t.moduleCode = modules.code
                 WHERE  m.groupNumber = s.groupNumber AND s.studentid = '${studentid}';`;
    const {rows} = await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getModuleTimetable(moduleCode, pool = pools) {
  try {
    const sql = `SELECT modules.code,
                        modules.compulsory,
                        m.startTime,
                        m.endtime,
                        m.groupNumber,
                        m.day,
                        t.name,
                        m.id
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduleType = t.id
                 INNER JOIN modules
                 ON     t.moduleCode = modules.code
                 WHERE  modules.code = '${moduleCode}';`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}


export async function getModuleTypeTimetable(moduleCode, groupNumber, name, pool = pools) {
  try {
    const sql = `SELECT modules.code,
                        m.startTime,
                        m.endtime,
                        m.groupNumber,
                        m.day,
                        m.id,
                        t.name
                 FROM   moduleTimetable AS m
                 INNER JOIN moduleTypes AS t
                 ON     m.moduleType = t.id
                 INNER JOIN modules
                 ON     t.moduleCode = modules.code
                 WHERE  modules.code = '${moduleCode}' AND m.groupNumber != ${groupNumber} AND t.name = '${name}'`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}


export async function getModuleCount(moduleCode, pool = pools) {
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
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getProgrammeModules(studentid, pool = pools) {
  try {
    const sql = `SELECT m.programmeid,
                        m.code
                 FROM   modules AS m
                 INNER JOIN students AS s
                 ON     m.programmeid = s.programmeid
                 WHERE  s.id = '${studentid}';`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getSpecialisation(studentid, pool = pools) {
  try {
    const sql = `SELECT sp.id,
                        sp.name
                 FROM   specialisation AS sp
                 INNER JOIN students AS s
                 ON     sp.programmeid = s.programmeid
                 WHERE  s.id = '${studentid}';`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

export async function getSpecialisationModules(studentid, pool = pools) {
  try {
    const sql = `SELECT sm.specid,
                        sm.moduleCode
                 FROM   specialisationModules AS sm
                 INNER JOIN specialisation AS sp
                 ON     sp.id = sm.specid
                 INNER JOIN students AS s
                 ON     sp.programmeid = s.programmeid
                 WHERE  s.id = '${studentid}';`;
    const {rows} =  await pool.query(sql);
    return rows;
  } catch (err) {
    throw new Error(`[BadGateway] ${err.message}`);
  }
}

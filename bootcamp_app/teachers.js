const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
const values = [`${cohortName}`];
const queryString = `
SELECT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests.*) as total_assistances
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
JOIN students ON students.id = student_id
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name = $1
GROUP BY teachers.name, cohorts.name
ORDER BY teacher;
`;

pool.query(queryString, values)
  .then(res => {
    console.log('connected');
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));
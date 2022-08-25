SELECT cohorts.name as cohort, count(assignment_submissions.*) as total_submissions
FROM (assignment_submissions JOIN students ON student_id = students.id)
JOIN cohorts on cohort_id = cohorts.id
GROUP BY cohorts.name
ORDER BY total_submissions DESC;
SELECT *
FROM Maintenance
WHERE $1 = maintenance_time AND $2 = aircraft_code

/*result should be 1 for success*/

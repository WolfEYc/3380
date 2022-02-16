SELECT *
FROM Refueling
WHERE $1 = refuel_time AND $2 = aircraft_code

/*result should be 1 for success*/

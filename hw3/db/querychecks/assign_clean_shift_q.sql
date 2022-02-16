SELECT *
FROM Cleaning
WHERE $1 = flight_id AND $2 = cleaning_time

/*result should be 1 for success*/


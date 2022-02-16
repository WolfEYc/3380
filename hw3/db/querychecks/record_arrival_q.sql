SELECT *
FROM Flight
WHERE $1 = flight_id AND $2 = actual_arrival

/*result should be 1*/

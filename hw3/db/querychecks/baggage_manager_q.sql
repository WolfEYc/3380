SELECT *
FROM Baggage
WHERE $1 = baggage_id

/*result should be 1 for adding baggage and 0 for removing baggage*/

SELECT *
FROM Tickets
WHERE $1 = ticket_no AND $2 = check_in

/*result should be 1*/

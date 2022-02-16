SELECT EXISTS (SELECT 1 FROM Tickets WHERE ticket_no = $1);

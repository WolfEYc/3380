SELECT EXISTS (SELECT 1 FROM FLIGHT WHERE flight_id = $1);

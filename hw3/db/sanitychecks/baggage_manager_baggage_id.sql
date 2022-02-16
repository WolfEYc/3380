/*This only applies to inserting baggage*/

SELECT EXISTS (SELECT 1 FROM Baggage WHERE baggage_id = $1);

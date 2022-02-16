BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE
	given_baggage_id INTEGER := $1;
	given_passenger_id VARCHAR(6) := $2;
	check_in_or_out BOOLEAN := $3; /*false means check out, true means check in*/

	TakenCount INTEGER := -1;

begin
	SELECT COUNT(*) INTO TakenCount
	FROM (SELECT baggage_id
		FROM Baggage
		WHERE (baggage_id = given_baggage_id)) AS invalid_baggage;

	IF TakenCount = 0 AND check_in_or_out = True
		THEN INSERT INTO Baggage
		VALUES(given_baggage_id, given_passenger_id);
	ELSIF TakenCount = 1 AND check_in_or_out = False
		THEN DELETE FROM Baggage WHERE given_baggage_id = baggage_id;
	END IF;	
end $$;
COMMIT;

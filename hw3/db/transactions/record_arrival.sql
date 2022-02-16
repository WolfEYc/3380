BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE
	given_flight_id VARCHAR(5) := $1;
	given_timestamp TIMESTAMP := $2;

begin

	UPDATE Flight SET actual_arrival = given_timestamp WHERE flight_id = given_flight_id AND actual_arrival IS NULL;
end; $$;

COMMIT;

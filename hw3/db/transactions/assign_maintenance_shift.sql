BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE
	given_aircraft_code VARCHAR(4) := $1;
	given_maintenance_time TIMESTAMP := $2;
	given_worker_id INTEGER := $3;

	previous_time TIMESTAMP := '1990-01-01 12:00:00';
	next_time TIMESTAMP := '2999-01-01 12:00:00';

	TakenCount INTEGER := -1;
	
	busyCounter INTEGER := -1;

begin

SELECT COUNT(*) INTO busyCounter
FROM Refueling
WHERE (given_maintenance_time - refuel_time) <= '20 minutes' AND (given_maintenance_time - refuel_time) >= '-20 minutes' AND worker_id = given_worker_id; 


	SELECT MAX(scheduled_arrival) INTO previous_time
	FROM(	SELECT flight_id, scheduled_arrival
		FROM Flight
		WHERE scheduled_arrival < given_maintenance_time) AS T1;

	SELECT MIN(scheduled_departure) INTO next_time
	FROM(	SELECT flight_id, scheduled_departure
		FROM Flight
		WHERE scheduled_departure > given_maintenance_time) AS T2;

IF next_time IS NULL
	THEN next_time := '2999-01-01 12:00:00';
END IF;

IF previous_time IS NULL
	THEN previous_time := '1990-01-01 12:00:00';
END IF;

SELECT COUNT(*) INTO TakenCount
FROM Maintenance
WHERE maintenance_time >= previous_time AND maintenance_time <= next_time AND given_aircraft_code = aircraft_code;

IF TakenCount = 0 AND busyCounter = 0
	THEN INSERT INTO Maintenance
	VALUES (given_maintenance_time,given_worker_id, given_aircraft_code);
END IF;

end; $$;

COMMIT;

BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE 
	possible_departure_gate VARCHAR(6) := $1;
	possible_arrival_gate VARCHAR(6) := $2;
	possible_departure_time TIMESTAMP := $3;
	possible_arrival_time TIMESTAMP := $4;
	possible_food VARCHAR(20) := $5;
	possible_check_in TIMESTAMP := $6;
	currentFlightID VARCHAR(5) := $7;
	


	possiblePilot INTEGER := 635;
	possibleCopilot INTEGER := 917;
	possibleCleaner INTEGER := 459;


	p_status VARCHAR(10) := 'ONTIME';
	flightAircraft VARCHAR(4) := '-';
	Taken_Count INTEGER := -1;
	validOrder BOOLEAN := True;
	validCheckIn BOOLEAN := True;
begin


IF (possible_departure_time - possible_arrival_time) > '0 seconds' THEN validOrder := False; END IF;
	IF (possible_check_in - possible_departure_time) < '-4 hours' OR (possible_check_in - possible_departure_time) > '-1 hour' THEN validCheckIN := False; END IF;



SELECT aircraft_code INTO flightAircraft
FROM Aircraft
EXCEPT
SELECT aircraft_code
FROM(	SELECT aircraft_code, scheduled_arrival
	FROM Flight) as aircraftTest 
WHERE (scheduled_arrival - possible_departure_time) < '1 day' AND (scheduled_arrival - possible_departure_time) > '-1 day'
LIMIT 1;

SELECT crew_id INTO possiblePilot
FROM Crew
WHERE role = 'Pilot'
EXCEPT
SELECT pilot_id
FROM (	SELECT pilot_id, scheduled_arrival
	FROM Flight) as pilotTest
WHERE (scheduled_arrival - possible_departure_time) < '1 day' AND (scheduled_arrival - possible_departure_time) > '-1 day'
LIMIT 1;

SELECT crew_id INTO possibleCopilot
FROM Crew
WHERE role = 'Copilot'
EXCEPT
SELECT copilot_id
FROM(	SELECT copilot_id, scheduled_arrival
	FROM FLight) as copilotTest
WHERE (scheduled_arrival - possible_departure_time) < '1 day' AND (scheduled_arrival - possible_departure_time) > '-1 day'
LIMIT 1;

SELECT crew_id INTO possibleCleaner
FROM CREW
WHERE role = 'Cleaner'
EXCEPT
SELECT cleaner_id
FROM(	SELECT cleaner_id, scheduled_arrival
	FROM Flight) as cleanerTest
WHERE (scheduled_arrival - possible_departure_time) < '1 day' AND (scheduled_arrival - possible_departure_time) > '-1 day'
LIMIT 1;

SELECT COUNT(*) into Taken_Count 
	FROM (SELECT flight_id
		FROM Flight
		WHERE (departure_gate_number = possible_departure_gate
			AND ((possible_departure_time - scheduled_departure) <= '1 hour' AND (possible_departure_time - scheduled_departure) >= '-1 hour'))
			OR (arrival_gate_number = possible_arrival_gate
			AND ((possible_arrival_time - scheduled_arrival) <= '1 hour' AND (possible_arrival_time - scheduled_arrival) >= '-1 hour'))) AS invalid_flight;

IF Taken_Count = 0 AND validOrder = TRUE AND validCheckIn = True THEN
		INSERT INTO Flight
			VALUES (currentFlightID, flightAircraft, possible_departure_time, possible_arrival_time, possible_food, possible_check_in, possible_arrival_gate, possible_departure_gate, p_status, NULL, NULL, possiblePilot, possibleCopilot, possibleCleaner);
END IF;

end $$;

COMMIT;

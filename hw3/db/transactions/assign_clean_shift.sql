/*Assume an employee has is signing up for a specific cleaning time, check and see if that time is not already taken...
Given crew_id, flight_id, cleaning_time*/

BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE
given_flight_id VARCHAR(5) := $1;
possible_cleaning TIMESTAMP := $2;
Taken_Count INTEGER := -1;
validTime BOOLEAN := True;

beginTime TIMESTAMP := '1900-01-01 12:00:00';
endTime TIMESTAMP := '1900-01-01 12:00:00';


begin



SELECT scheduled_departure INTO beginTime
FROM Flight
WHERE flight_id = given_flight_id;

SELECT scheduled_arrival INTO endTime
FROM Flight
WHERE flight_id = given_flight_id;

IF (possible_cleaning < beginTime) OR (possible_cleaning > endTime) THEN validTime := False; END IF;
	

SELECT COUNT(*) INTO Taken_Count 
	FROM (SELECT cleaning_time, flight_id
		FROM Cleaning
		WHERE  (((possible_cleaning - cleaning_time) <= '30 minutes' AND (possible_cleaning - cleaning_time) >= '-30 minutes') AND given_flight_id = flight_id)) AS T;
  
IF Taken_Count = 0 AND validTime = True THEN
	INSERT INTO Cleaning
                 VALUES (possible_cleaning, given_flight_id);
END IF;
end $$;
COMMIT;

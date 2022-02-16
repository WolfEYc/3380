SELECT * FROM Aircraft JOIN Aircraft_Model ON Aircraft_Model.aircraft_model = Aircraft.Aircraft_Model
WHERE ($1 = false OR ($1 = true AND wifi = true)) AND ($2 = false OR ($2 = true AND movie = true));

/*
SELECT * FROM (
    IF (false = $1) AND ($2 = false)
        THEN SELECT * FROM Aircraft JOIN Aircraft_Model ON Aircraft_Model.aircraft_model = Aircraft.Aircraft_Model;
    ELSIF ($1 = true) AND $2 = false THEN SELECT * FROM Aircraft JOIN Aircraft_Model ON Aircraft_Model.aircraft_model = Aircraft.Aircraft_Model WHERE wifi = true;
    ELSIF $1 = true AND $2 = true THEN SELECT * FROM Aircraft JOIN Aircraft_Model ON Aircraft_Model.aircraft_model = Aircraft.aircraft_model WHERE wifi = true AND movie = true;
    ELSIF $1 = false AND $2 = true THEN SELECT * FROM Aircraft JOIN Aircraft_Model ON Aircraft_Model.aircraft_model = Aircraft.aircraft_model WHERE movie = true;
    END IF;
);
*/

SELECT EXISTS (SELECT 1 FROM Aircraft WHERE aircraft_code = $1);

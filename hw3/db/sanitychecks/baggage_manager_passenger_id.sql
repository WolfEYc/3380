SELECT EXISTS (SELECT 1 FROM Passenger WHERE passenger_id = $1);

SELECT EXISTS (SELECT 1 FROM airport_employee WHERE airport_employee.airport_worker_id = $1);

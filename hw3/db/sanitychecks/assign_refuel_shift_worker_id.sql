SELECT EXISTS (SELECT 1 FROM Flight WHERE airport_worker_id = $1);

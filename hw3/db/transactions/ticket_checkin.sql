/*This transaction is unable to be used until the database is updated to support NULL check_in values*/

BEGIN ISOLATION LEVEL SERIALIZABLE;

do $$
DECLARE
	given_ticket_no INTEGER := $1;
	given_timestamp TIMESTAMP := $2;

begin
	UPDATE Tickets SET check_in = given_timestamp WHERE ticket_no = given_ticket_no;
end; $$;

COMMIT;

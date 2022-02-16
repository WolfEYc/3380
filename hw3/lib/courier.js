const pgp = require('pg-promise')({});
const {join: joinPath} = require('path');

class courierClient{
    
    constructor(){
        const cn = 'postgres://dbs099:1873765R@3380db.cs.uh.edu:5432/COSC3380';
        this.db = pgp(cn);
    }

    transaction = (file) => {
        const fullPath = joinPath(__dirname, '..', '..','..', 'db','transactions', file);
        return new pgp.QueryFile(fullPath, { minify: true });
    }

    query = (file) => {
        const fullPath = joinPath(__dirname, '..', '..','..', 'db','querychecks', file);
        return new pgp.QueryFile(fullPath, { minify: true });
    }

    sanityCheck = (file) => {
        const fullPath = joinPath(__dirname, '..', '..','..', 'db','sanitychecks', file);
        return new pgp.QueryFile(fullPath, { minify: true });
    }

    transactions = {
        assignCleanShift: this.transaction('assign_clean_shift.sql'),
        assignMaitnence: this.transaction('assign_maintenance_shift.sql'),
        assignRefuelShift: this.transaction('assign_refuel_shift.sql'),
        baggageManager: this.transaction('baggage_manager.sql'),       
        newFlight: this.transaction('new_flight_transactions.sql'),
        recordArrival: this.transaction('record_arrival.sql'),
        recordDeparture: this.transaction('record_departure.sql'),
        ticketCheckin: this.transaction('ticket_checkin.sql')
    }

    queries = {
        assignCleanShift: this.query('assign_clean_shift_q.sql'),
        assignMaitnence: this.query('assign_maintenance_shift_q.sql'),
        assignRefuelShift: this.query('assign_refuel_shift_q.sql'),
        baggageManager: this.query('baggage_manager_q.sql'),
        filterAircraft: this.query('filter_aircraft.sql'),        
        newFlight: this.query('new_flight_transactions_q.sql'),
        recordArrival: this.query('record_arrival_q.sql'),
        recordDeparture: this.query('record_departure_q.sql'),
        ticketCheckin: this.query('ticket_checkin_q.sql')
    }

    sanityChecks = {
        assignCleanShiftFlightId: this.sanityCheck('assign_clean_shift_flight_id.sql'),
        assignMaitnenceAircraftCode: this.sanityCheck('assign_maintenance_shift_aircraft_code.sql'),
        assignMaitnenceWorkerId: this.sanityCheck('assign_maintenance_shift_worker_id.sql'),
        assignRefuelShiftAircraftCode: this.sanityCheck('assign_refuel_shift_aircraft_code.sql'),
        assignRefuelShiftWorkerId: this.sanityCheck('assign_refuel_shift_worker_id.sql'),
        baggageManagerId: this.sanityCheck('baggage_manager_baggage_id.sql'),
        baggageManagerPassengerId: this.sanityCheck('baggage_manager_passenger_id.sql'),
        recordArrivalFlightId: this.sanityCheck('record_arrival_flight_id.sql'),
        recordDepartureFlightId: this.sanityCheck('record_departure_flight_id.sql'),
        ticketCheckinTicketNo: this.sanityCheck('ticket_checkin_ticket_no.sql')
    }
    
    submitQuery = (file, vals) => {
        return this.db.task((t) => {
            return t.any(file, vals);
        })
    }
}

const courier = new courierClient()

export default courier;
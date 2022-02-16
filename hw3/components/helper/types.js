
const transactorTypes = {
    "Assign Clean Shift": { endpoint: 'assignCleanShift', fields: [{param: 'given_flight_id', type: "VARCHAR", len: 5}, {param:'possible_cleaning', type: "TIMESTAMP"}] },
    "Assign Maitenence": { endpoint: 'assignMaitenence', fields: [{ param: 'given_aircraft_code', type: "VARCHAR", len: 4}, {param: 'given_maintenance_time', type: "TIMESTAMP"}, {param:'given_worker_id', type: "INTEGER"}] },
    "Assign Refuel Shift": { endpoint: 'assignRefuelShift', fields: [{param: 'given_aircraft_code', type: "VARCHAR", len: 4}, {param: "given_refuel_time", type: "TIMESTAMP"}, {param: "given_worker_id", type: "INTEGER"}] },
    "Baggage Manager": { endpoint: 'baggageManager', fields: [{param: "given_baggage_id", type: "INTEGER"}, {param: "given_passenger_id", type:"VARCHAR", len: 6}, {param: "check_in_or_out", type: "BOOLEAN"}] },
    "Filter Aircraft": { endpoint: 'filterAircraft', fields: [{param:"wifi", type:"BOOLEAN"}, {param: "movies", type:"BOOLEAN"}] },
    "New Flight": { endpoint: 'newFlight', fields: [{param:"departure_gate", type: "VARCHAR", len: 6}, {param:"arrival_gate", type:"VARCHAR", len: 6}, {param:"departure_time", type: "TIMESTAMP"}, {param:"arrival_time", type: "TIMESTAMP"}, {param:"food", type:"VARCHAR", len: 5}, {param:"check_in", type:"TIMESTAMP"}, {param:"currentFlightID", type:"VARCHAR", len: 5}] },
    "Record Arrival": { endpoint: 'recordArrival', fields: [{param: "given_flight_id", type: "VARCHAR", len: 5}, {param: "given_timestamp", type: "TIMESTAMP"}] },
    "Record Departure": { endpoint: 'recordDeparture', fields: [{param: "given_flight_id", type: "VARCHAR", len: 5}, {param: "given_timestamp", type: "TIMESTAMP"}] },
    "Ticket Checkin": { endpoint: 'ticketCheckin', fields: [{param: "given_ticket_no", type: "INTEGER"}, {param: "given_timestamp", type: "TIMESTAMP"}] }
}

export default transactorTypes;
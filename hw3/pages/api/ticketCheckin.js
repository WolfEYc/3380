// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = async (req, res) => {
    const values = 
    [
        req.body.given_ticket_no,
	    req.body.given_timestamp
    ]

    const flight_valid = (await courier.submitQuery(courier.sanityChecks.ticketCheckinTicketNo, [values[0]]))[0].exists

    if(flight_valid == false){
        res.status(200).send('Ticket No Invalid!');
    } else {

    courier.submitQuery(courier.transactions.ticketCheckin, values)
    .then((val) => {
        courier.submitQuery(courier.queries.ticketCheckin, values)
        .then((dbRes) => {
            res.status(200).send(dbRes);
        }).catch((err) => {
            res.status(400).send(err);
        }) 
    })
    .catch((err) => {
       res.status(400).send(err);
    })
}
}

export default handler;
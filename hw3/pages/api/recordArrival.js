// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = async (req, res) => {
    const values = 
    [
        req.body.given_flight_id,
	    req.body.given_timestamp
    ]

    const flight_valid = (await courier.submitQuery(courier.sanityChecks.recordArrivalFlightId, [values[0]]))[0].exists

    if(flight_valid == false){
        res.status(200).send('Flight ID Invalid!');
    } else {

    courier.submitQuery(courier.transactions.recordArrival, values)
    .then((val) => {
        courier.submitQuery(courier.queries.recordArrival, values)
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
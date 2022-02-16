// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = async (req, res) => {
    const values = 
    [
        req.body.given_baggage_id,
	    req.body.given_passenger_id,
	    req.body.check_in_or_out
    ]

    const baggage_id_valid = (await courier.submitQuery(courier.sanityChecks.baggageManagerId, [values[0]]))[0].exists

    const passenger_id_valid = (await courier.submitQuery(courier.sanityChecks.baggageManagerPassengerId, [values[1]]))[0].exists

    if(baggage_id_valid == false){
        res.status(200).send('Baggage ID Invalid!');
    } else if (passenger_id_valid == false) {
        res.status(200).send('Passenger ID Invalid!');
    } else {

    courier.submitQuery(courier.transactions.baggageManager, values)
    .then((val) => {
        courier.submitQuery(courier.queries.baggageManager, [values[0]])
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
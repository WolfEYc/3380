// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = async (req, res) => {
    const values = 
    [
        req.body.given_aircraft_code,
	    req.body.given_refuel_time,
	    req.body.given_worker_id
    ]

    const aircraft_valid = (await courier.submitQuery(courier.sanityChecks.assignRefuelShiftAircraftCode, [values[0]]))[0].exists

    const worker_id_valid = (await courier.submitQuery(courier.sanityChecks.assignRefuelShiftWorkerId, [values[2]]))[0].exists

    if(aircraft_valid == false){
        res.status(200).send('Aircraft Code Invalid!');
    } else if (worker_id_valid == false) {
        res.status(200).send('Worker ID Invalid!');
    } else {

    courier.submitQuery(courier.transactions.assignRefuelShift, values)
    .then((val) => {
        courier.submitQuery(courier.queries.assignRefuelShift, [values[1], values[0]])
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
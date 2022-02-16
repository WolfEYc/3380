// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = async (req, res) => {
    const values = 
    [
        req.body.given_flight_id,
        req.body.possible_cleaning
    ]

    courier.submitQuery(courier.sanityChecks.assignCleanShiftFlightId, [values[0]])
    .then((rows) => {
        if(rows[0].exists == true){
            courier.submitQuery(courier.transactions.assignCleanShift, values)
            .then((val) => {
                courier.submitQuery(courier.queries.assignCleanShift, values)
                .then((dbRes) => {
                    res.status(200).send(dbRes);
                }).catch((err) => {
                    res.status(400).send(err);
                }) 
            })
            .catch((err) => {
            res.status(400).send(err);
            })
        } else {
            res.status(200).send('Flight ID Invalid!')
        }
    })
    .catch((err) => {
        res.status(400).send(err);
    })

    

    
}

export default handler;
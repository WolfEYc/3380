// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = (req, res) => {
    const values = 
    [
        req.body.given_aircraft_code,
        req.body.given_maintenance_time,
        req.body.given_worker_id
    ]

    courier.submitQuery(courier.sanityChecks.assignMaitnenceAircraftCode, [values[0]])
    .then((rows) => {
        if(rows[0].exists == true){            
            courier.submitQuery(courier.sanityChecks.assignMaitnenceWorkerId, [values[2]])
            .then((rows) => {
                if(rows[0].exists == true){
                    courier.submitQuery(courier.transactions.assignMaitnence, values)
                    .then((val) => {
                        courier.submitQuery(courier.queries.assignMaitnence, [values[1], values[0]])
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
                    res.status(200).send('Worker ID Invalid!')
                }
            })
            .catch((err => {
                res.status(400).send(err);
            }))
        } else {
            res.status(200).send('Aircraft Code Invalid!')
        }
    })
    .catch((err => {
        console.log('bruh')
        res.status(400).send(err);
    }))

    
}

export default handler;
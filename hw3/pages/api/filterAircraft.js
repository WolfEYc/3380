// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import courier from '../../lib/courier'

const handler = (req, res) => {
    const values = 
    [
        req.body.wifi,
	    req.body.movies
    ]

    courier.submitQuery(courier.queries.filterAircraft, values)
    .then((val) => {
        res.status(200).send(val);
    })
    .catch((err) => {
        res.status(400).send(err);
    })
}

export default handler;
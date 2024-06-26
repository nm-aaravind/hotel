import express from 'express'
import Hotel from "../../src/models/hotel.js"

const router = express.Router()

function constructParams(query){
    let params = {}
    if(query.destination){
        params.city = new RegExp(query.destination, "i")
    }
    if(query.facility){
        params.facilities = {
            $all: Array.isArray(query.facility) ? query.facility : [query.facility]
        }
    }
    return params
}

router.get("/search", async (req, res) => {
    try {
        const searchParams = constructParams(req.query)
        const pageNumber = parseInt(req.query.page ? req.query.page : '1')
        const resultsPerPage = parseInt(req.query.limit ? req.query.limit : '5')
        const hotels = await Hotel.find(searchParams).skip((pageNumber - 1)*resultsPerPage ).limit(resultsPerPage);
        const totalDocuments = (await Hotel.find(searchParams)).length
        return res.status(200).json({
            data: hotels,
            pagination: {
                totalDocuments,
                page: pageNumber,
                totalPages: Math.ceil(totalDocuments/resultsPerPage)
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

export default router;
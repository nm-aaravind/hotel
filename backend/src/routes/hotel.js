import express from "express"
import { upload } from '../middlewares/multer.js';
import cloudinary from '../utils/cloudinary.js';
import { hotelValidation, verifyToken } from "../middlewares/auth.js";
import Hotel from '../models/hotel.js';
import Room from "../models/room.js";
import pLimit from "p-limit"
const router = express.Router();

router.post('/add-hotel', verifyToken ,upload.array('imageURLS', 5), hotelValidation, async (req, res) => {
    try {
        const limit = pLimit(5)
        let uploadedURLS = null;
        const photos = req.files;
        if (photos) {
            const imagesToUpload = photos.map((photo) => {
                const b64 = Buffer.from(photo.buffer).toString('base64')
                const dataURI = "data:" + photo.mimetype + ";base64," + b64
                return limit(async () => {
                    const result = cloudinary.uploader.upload(dataURI, {folder: 'tourvista'})
                    return result
                })
            })
            let uploads = await Promise.all(imagesToUpload)
            uploadedURLS = uploads.map((image) => {
                return {
                    asset_id: image.asset_id,
                    public_id: image.public_id,
                    format: image.format,
                    resource_type: image.resource_type,
                    etag: image.etag,
                    url: image.url,
                    secure_url: image.secure_url,
                    display_name: image.display_name
                }
            })
        }
        const hotel = {
            userId: req.user,
            hotelName: req.body.name,
            description: req.body.description,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            phoneNumber: req.body.phoneNumber,
            facilities: req.body.facilities ? req.body.facilities : [],
            imageURLS: uploadedURLS ? uploadedURLS : []
        }

        //error handling when images are not uploaded todo
        const createdHotel = await Hotel.create(hotel);

        if (!createdHotel) {
            throw Error("Cannot list hotel")
        }

        const rooms = req.body.rooms.map((room) => {
            return {
                hotelId: createdHotel._id, ...room
            }
        })

        const newRooms = await Room.insertMany(rooms)

        const roomIds = newRooms.map((room) => room._id)

        if(!newRooms){
            await Hotel.deleteOne(createdHotel._id)
            throw new Error("Cannot add rooms to the hotel")
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(createdHotel._id, {
            rooms: roomIds
        })

        return res.status(201).json({
            message: "Created hotel"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get("/my-hotels", verifyToken, async (req, res) => {
    try {
        const response = await Hotel.find({
            userId: req.user
        })
        return res.status(200).json({
            data: response
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get("/hotel/:hotelid" , async (req, res) => {
    const hotelId = req.params.hotelid
    try {
        const hotel = await Hotel.findById(hotelId).populate('rooms')
        return res.status(200).json({
            data: {
                hotel: hotel,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
})

router.get("/cities/:search", async (req, res) => {
    try {
        const search = req.params.search
        const searchValues = await Hotel.find({city: {$regex: search, $options: 'i'}}).select("city country -_id").limit(3)
        return res.status(200).json({
            data: searchValues
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
})

router.put("/edit/:hotelid",verifyToken, upload.array("images"), async (req, res) => {
    try {
        //wrong upload.array()
        const hotelDetails = req.body;
        hotelDetails.lastUpdated = new Date()

        const hotel = await Hotel.findOneAndUpdate({
            _id: req.params.hotelid,
            userId: req.user
        }, hotelDetails, { new : true })

        if(!hotel){
            return res.status(404).json({
                message: "Hotel not found"
            })
        }
        console.log(hotel, "After updating")

        
    } catch (error) {
        
    }

})

router.delete("/delete", verifyToken, async (req, res) => {
    try {
        const { hotelId } = req.query
        const response = await Hotel.findByIdAndDelete(hotelId)
        if(!response){
            throw Error("Cannot delete hotel")
        }
        return res.status(200).json({
            message: "Deleted hotel"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
})
export default router;
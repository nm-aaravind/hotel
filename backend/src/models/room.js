import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
    hotelId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomName: {
        type: String,
        required: true
    },
    adultCount: {
        type: Number,
        required: true
    },
    childCount : {
        type: Number,
        required: true
    },
    roomCount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Room = mongoose.model("Room", roomSchema);
export default Room
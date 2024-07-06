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
    guestCount: {
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
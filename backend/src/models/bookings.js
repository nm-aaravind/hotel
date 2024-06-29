import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    hotelId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true
    },
    roomCount: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    checkIn: {
        type: String,
        required: true
    },
    checkOut: {
        type: String,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    travellers: [
        {
            name: {
                type: String,
                required: true
            },
            age: {
                type: Number,
                required: true
            },
            gender: {
                type: String,
                enum : ['M','F'],
                required: true
            },
        }
    ]
})

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking
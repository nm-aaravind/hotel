import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
    asset_id: String,
    public_id: String,
    url: String,
    secure_url: String,
    format: String,
    resource_type: String,
    display_name: String,
    etag: String
  });

const hotelSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotelName: {
        type: String,
        requried: true
    },
    description: {
        type: String,
        required: false
    },
    address : {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    facilities: [
        {
            type: String,
            required: false
        }
    ],
    imageURLS: [
        imageSchema
    ],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required:false }]
},{
    timestamps: true
})

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel
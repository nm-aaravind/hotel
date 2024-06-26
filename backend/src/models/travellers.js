import { Schema, model } from 'mongoose'

const travellerSchema = new Schema({
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
    linked: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Traveller = model("Traveller",travellerSchema);
export default Traveller
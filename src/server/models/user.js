import mongoose from 'mongoose'

const User = new mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    createTime: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

export default mongoose.model('User', User)
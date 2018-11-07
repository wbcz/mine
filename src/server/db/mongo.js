import mongoose from 'mongoose'
mongoose.connect('mongodb://mineD:27017/mineD')
mongoose.Promise = global.Promise
export default mongoose
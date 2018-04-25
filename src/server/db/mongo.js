import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/mine')
mongoose.Promise = global.Promise
export default mongoose
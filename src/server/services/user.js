import UserModel from '../models/user'

class User {
    async get(user) {
        return UserModel.findOne(user)
    }
    async add(user = {}) {
        return new UserModel(user).save()
    }
}

export default new User()
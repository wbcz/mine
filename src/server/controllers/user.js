import App from './app'
import UserService from '../services/user'

class User extends App {
	async getUserInfo(ctx) {
		const data = await UserService.get(ctx.request.query)
		super.success(data)
	}
	async addUser(ctx) {
		return await UserService.add({uid: 3, userName: 'wbcz'})
	}
}

export default new User()
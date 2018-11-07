import user from '../model/user'
import order from '../model/order'
import ResetBase from './resetBase'

export default {
    user    : new ResetBase(user),
    upload  : new ResetBase(upload)
}
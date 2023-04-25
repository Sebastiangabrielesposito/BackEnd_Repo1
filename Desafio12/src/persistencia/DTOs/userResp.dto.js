export default class UsersRespDTO{
    constructor(user){
        this._id = user._id
        this.fullName = user.full_name
        this.email = user.email
        this.role = user.role
    }
}
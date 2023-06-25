export default class UserDBDTO{
    constructor(user){
        this.full_name=`${user.first_name} ${user.last_name}`
        this.first_name= user.first_name
        this.last_name=user.last_name
        this.email=user.email
        this.age=user.age
        this.password=user.password
        this.role= user.role
        this._id = user._id
    }
}
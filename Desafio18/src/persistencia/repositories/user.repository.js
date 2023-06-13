import UsersRespDTO from "../DTOs/userResp.dto";
import UserDBDTO from "../DTOs/userDB.dto";

export default class UsersRepository{
    constructor(dao){
        this.dao = dao
    }
    async createUser(user){
        const userDBDTO = new UserDBDTO(user)
        const userDao = await this.dao(userDBDTO)
        const usersRespDTO = new UsersRespDTO(userDao)
        return usersRespDTO
    }
}
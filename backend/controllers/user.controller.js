import { User } from "../models/user.model.js"
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).send({users})
    }catch(error){
        res.status(500).send({message: "Server error", error: error.message})
    }
}
export default getAllUsers
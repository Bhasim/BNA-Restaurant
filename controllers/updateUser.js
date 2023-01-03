import users from "../models/UserModel.js";
import hashPassword from "../utils/hashPassword.js";
import generateAuthToken from "../utils/generateAuthToken.js";

const updateUser = async (req, res, next) => {
    // try {
    //    const user = await users.findById(req.params.id).orFail();

    //     user.name = req.body.name || user.name;
    //     user.lastName = req.body.lastName || user.lastName;
    //     user.email = req.body.email || user.email;
    //     user.isAdmin = req.body.isAdmin || user.isAdmin;

    //     await user.save();

    //     res.send("user updated");

    // } catch (err) {
    //    next(err);
    // }
    await users.findByIdAndUpdate({"_id":req.params.id},req.body).then(result => res.json(result))
}
export default updateUser
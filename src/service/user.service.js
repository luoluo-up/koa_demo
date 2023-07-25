const UserModel = require("../model/user.model");
const moment = require("moment");
class UserService {
  async createUser(user_name, password) {
    const res = await UserModel.create({
      user_name,
      password,
      create_time: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
    return res;
  }
  async getUserInfo({ _id, user_name, password, is_admin }) {
    const whereOpt = {};
    _id && Object.assign(whereOpt, { _id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });
    const res = await UserModel.findOne(whereOpt);
    return res;
  }
  async updateById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    user_name && Object.assign(whereOpt, { user_name });  
    password && Object.assign(whereOpt, { password });
      is_admin && Object.assign(whereOpt, { is_admin });
    const res = await UserModel.updateOne(whereOpt);
    return res;
  }
}

module.exports = new UserService();

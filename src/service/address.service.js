const AddressModel = require("../model/address.model");
class AddrService {
  async createAddr(addr) {
    try {
      return await AddressModel.create(addr);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async findAllAddr(user_id) {
    try {
      return await AddressModel.find({ user_id }).select("-_id");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async updateAddr(id, addr) {
    try {
      return await AddressModel.updateOne({ _id: id }, addr);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  async removeAddr(id) {
    try {
      return await AddressModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
    async setDefaultAddr(user_id, id) {
      console.log(user_id, id);
    try {
      await AddressModel.updateMany({ user_id }, { is_default: false });
      return await AddressModel.updateOne({ _id: id }, { is_default: true });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
module.exports = new AddrService();

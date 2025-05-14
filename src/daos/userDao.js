import User from "../models/User.js";

class UserDao {
  async findByEmail(email) {
    return User.findOne({ email });
  }
  async create(userData) {
    return User.create(userData);
  }
  async findById(id) {
    return User.findById(id);
  }
  async updatePassword(id, newPassword) {
    return User.findByIdAndUpdate(id, { password: newPassword });
  }
}

export default new UserDao();

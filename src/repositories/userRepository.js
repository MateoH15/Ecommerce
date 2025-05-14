import userDao from "../daos/userDao.js";

class UserRepository {
  async getUserByEmail(email) {
    return userDao.findByEmail(email);
  }
  async createUser(userData) {
    return userDao.create(userData);
  }
  async getUserById(id) {
    return userDao.findById(id);
  }
  async updateUserPassword(id, newPassword) {
    return userDao.updatePassword(id, newPassword);
  }
}

export default new UserRepository();

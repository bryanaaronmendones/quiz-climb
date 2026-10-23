const { QuestionSet, User } = require('../models');

class QuestionSetRepository {
  async create(data) {
    return await QuestionSet.create(data);
  }

  async findAll(filter = {}) {
  return await QuestionSet.findAll({
    where: filter,
    include: [{ 
      model: User, 
      as: 'user', 
      attributes: ['id', 'email'] // Pinalitan ang 'user_id' ng 'id'
    }],
  });
}

async findById(set_id) {
  return await QuestionSet.findByPk(set_id, {
    include: [{ 
      model: User, 
      as: 'user' 
      // Tinanggal na ang foreignKey at targetKey dahil naka-set na ito sa models/index.js
    }],
  });
}


  async update(set_id, data) {
    const questionSet = await QuestionSet.findByPk(set_id);
    if (!questionSet) return null;
    return await questionSet.update(data);
  }

  async delete(set_id) {
    const questionSet = await QuestionSet.findByPk(set_id);
    if (!questionSet) return null;
    await questionSet.destroy();
    return true;
  }
}

module.exports = new QuestionSetRepository();
const questionSetRepository = require('../repositories/question-set.repository');

class QuestionSetService {
  async createQuestionSet(data) {
    return await questionSetRepository.create(data);
  }

  async getAllQuestionSets(filter) {
    return await questionSetRepository.findAll(filter);
  }

  async getQuestionSetById(set_id) {
    const questionSet = await questionSetRepository.findById(set_id);
    if (!questionSet) {
      throw new Error('Question Set not found');
    }
    return questionSet;
  }

  async updateQuestionSet(set_id, userId, data) {
    const questionSet = await questionSetRepository.findById(set_id);
    if (!questionSet) {
      throw new Error('Question Set not found');
    }
    // Owner rule validation
    if (questionSet.host_id !== userId) {
      throw new Error('Unauthorized: You can only update your own question sets');
    }
    return await questionSetRepository.update(set_id, data);
  }

  async deleteQuestionSet(set_id, userId) {
    const questionSet = await questionSetRepository.findById(set_id);
    if (!questionSet) {
      throw new Error('Question Set not found');
    }
    // Owner rule validation
    if (questionSet.host_id !== userId) {
      throw new Error('Unauthorized: You can only delete your own question sets');
    }
    return await questionSetRepository.delete(set_id);
  }
}

module.exports = new QuestionSetService();
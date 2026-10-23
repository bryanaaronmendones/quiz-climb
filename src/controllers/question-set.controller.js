const questionSetService = require('../services/question-set.service');

class QuestionSetController {
  async create(req, res) {
    try {
      // Assuming na mayroon tayong req.user mula sa authentication middleware
      const host_id = req.user ? req.user.user_id : req.body.host_id; 
      const data = { ...req.body, host_id };
      
      const newQuestionSet = await questionSetService.createQuestionSet(data);
      return res.status(201).json(newQuestionSet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const questionSets = await questionSetService.getAllQuestionSets(req.query);
      return res.status(200).json(questionSets);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const questionSet = await questionSetService.getQuestionSetById(req.params.id);
      return res.status(200).json(questionSet);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const userId = req.user ? req.user.user_id : req.body.user_id; // Pansamantalang kuha sa user_id
      const updated = await questionSetService.updateQuestionSet(req.params.id, userId, req.body);
      return res.status(200).json(updated);
    } catch (error) {
      const status = error.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const userId = req.user ? req.user.user_id : req.body.user_id;
      await questionSetService.deleteQuestionSet(req.params.id, userId);
      return res.status(200).json({ message: 'Question Set deleted successfully' });
    } catch (error) {
      const status = error.message.includes('Unauthorized') ? 403 : 400;
      return res.status(status).json({ error: error.message });
    }
  }
}

module.exports = new QuestionSetController();
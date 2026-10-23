const express = require('express');
const router = express.Router();
const questionSetController = require('../controllers/question-set.controller');
const { validateQuestionSet } = require('../validators/question-set.validator');

// CRUD Routes para sa Question Sets
router.post('/', validateQuestionSet, questionSetController.create);
router.get('/', questionSetController.getAll);
router.get('/:id', questionSetController.getById);
router.put('/:id', validateQuestionSet, questionSetController.update);
router.delete('/:id', questionSetController.delete);

module.exports = router;

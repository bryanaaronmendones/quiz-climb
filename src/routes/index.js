const { Router } = require('express');
const router = Router();

// Dito natin ilalagay ang iba pang route modules habang lumalaki ang project
router.use('/question-sets', require('./question-set.routes'));

module.exports = router;
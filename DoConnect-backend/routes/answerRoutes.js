const express = require('express');
const { createAnswer, getAnswers, approveAnswer, deactivateAnswer } = require('../controllers/answerController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createAnswer);
router.get('/:questionId', getAnswers);
router.put('/approve/:id', verifyToken, isAdmin, approveAnswer);
router.put('/deactivate/:id', verifyToken, isAdmin, deactivateAnswer);

module.exports = router;

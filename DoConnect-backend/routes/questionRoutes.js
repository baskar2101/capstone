const express = require('express');
const { createQuestion, getQuestions, approveQuestion, deactivateQuestion } = require('../controllers/questionController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', verifyToken, createQuestion);
router.get('/', getQuestions);
router.put('/:id/approve', verifyToken, approveQuestion);
router.delete('/:id', verifyToken, deactivateQuestion);

module.exports = router;

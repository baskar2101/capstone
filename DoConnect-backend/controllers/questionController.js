const Question = require('../models/Question');

// Create a new question
exports.createQuestion = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming user ID is attached in req.user

    try {
        const newQuestion = new Question({ title, content, userId });
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all questions
exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate('userId', 'username');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve a question
exports.approveQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findByIdAndUpdate(id, { isApproved: true }, { new: true });
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a question (deactivate)
exports.deactivateQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        await Question.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: 'Question deactivated' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

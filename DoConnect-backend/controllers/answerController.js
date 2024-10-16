const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
    const { content, questionId } = req.body;
    const answer = new Answer({ content, questionId, userId: req.user.id });
    try {
        await answer.save();
        res.status(201).json(answer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAnswers = async (req, res) => {
    const { questionId } = req.params;
    try {
        const answers = await Answer.find({ questionId }).populate('userId', 'username');
        res.json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.approveAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        await Answer.findByIdAndUpdate(id, { isApproved: true });
        res.json({ message: 'Answer approved successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deactivateAnswer = async (req, res) => {
    const { id } = req.params;
    try {
        await Answer.findByIdAndUpdate(id, { isActive: false });
        res.json({ message: 'Answer deactivated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

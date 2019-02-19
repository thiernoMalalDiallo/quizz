"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const QuizModel_1 = require("../models/QuizModel");
const Utils_1 = require("./Utils");
const Quiz = mongoose.model('Quiz', QuizModel_1.QuizSchema);
class QuizController {
    // create a new quiz
    addNewQuiz(req, res) {
        let newQuiz = new Quiz(req.body);
        newQuiz.save((err, quiz) => {
            if (err) {
                res.status(400).json(res);
            }
            res.status(200).json(quiz);
        });
    }
    // get all guizs
    getQuizs(req, res) {
        Quiz.find({}, (err, quizs) => {
            if (err) {
                res.status(404).json(err);
            }
            res.status(200).json(quizs);
        });
    }
    // get a quiz by it id
    getQuizWithID(req, res) {
        Quiz.findById(req.params.quizId).exec((err, quiz) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quiz);
        });
    }
    // update a quiz
    updateQuiz(req, res) {
        Quiz.findOneAndUpdate({ _id: req.params.quizId }, req.body, { new: true }, (err, quiz) => {
            if (err) {
                res.send(err);
            }
            res.json(quiz);
        });
    }
    // delete a quiz
    deleteQuiz(req, res) {
        Quiz.remove({ _id: req.params.quizId }, (err) => {
            if (err) {
                res.status(400).json(err);
            }
            res.status(200).json({ message: 'Successfully deleted contact!' });
        });
    }
    // get a random quiz in a specifc difficulty 
    randomQuiz(req, res) {
        Quiz.find({ level: req.params.quizzLevel }, (err, quizs) => {
            if (err) {
                res.status(404).json(err);
            }
            let random = Utils_1.Util.getRandom(0, quizs.length - 2);
            res.status(200).json(quizs[random]);
        });
    }
    // get a list of quiz by diffculty 
    getQuizsByDifficulty(req, res) {
        Quiz.find({}).where('Level').equals(req.params.level).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        });
    }
    // get a list of most played quiz by diffculty 
    getHotQuizsByDifficulty(req, res) {
        Quiz.find({}).sort('played').where('Level').equals(req.params.level).limit(8).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        });
    }
    // get a list of most played quiz by diffculty 
    getNewQuizsByDifficulty(req, res) {
        Quiz.find({}).sort('played').where('Level').equals(req.params.level).limit(8).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        });
    }
}
exports.QuizController = QuizController;
//# sourceMappingURL=QuizController.js.map
import * as mongoose from 'mongoose';
import { QuizSchema } from '../mongooseModels/QuizModel';
import express from 'express';
import { Util } from './Utils';
const path = require("path");

const Quiz = mongoose.model('Quiz', QuizSchema);

export class QuizController {
    // create a new quiz
    public addNewQuiz(req: express.Request, res: express.Response) {
        req.body['image'] = "D:/nodeJs/quizz/src/assets/" + req.body['theme'] + ".png";
        let newQuiz = new Quiz(req.body);
        newQuiz.save((err, quiz) => {
            if (err) {
                res.status(400).json(res);
            }
            res.status(200).json(quiz);
        });
    }
    // get all guizs
    public getQuizs(req: express.Request, res: express.Response) {
        console.log(require('path').dirname('./../mongooseModels/QuizModel'))
        Quiz.find({}, (err, quizs) => {
            if (err) {
                res.status(404).json(err);
            }
            res.status(200).json(quizs);
        })

    }
    // get a quiz by it id
    public getQuizWithID(req: express.Request, res: express.Response) {
        Quiz.findById(req.params.quizId).exec((err, quiz) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quiz);
        })
    }
    // update a quiz
    public updateQuiz(req: express.Request, res: express.Response) {
        Quiz.findOneAndUpdate({ _id: req.params.quizId }, req.body, { new: true }, (err, quiz) => {
            if (err) {
                res.send(err);
            }
            res.json(quiz);
        });
    }
    // delete a quiz
    public deleteQuiz(req: express.Request, res: express.Response) {
        Quiz.remove({ _id: req.params.quizId }, (err) => {
            if (err) {
                res.status(400).json(err);
            }
            res.status(200).json({ message: 'Successfully deleted contact!' });
        });
    }
    // get a random quiz in a specifc difficulty 
    public randomQuiz(req: express.Request, res: express.Response) {
        Quiz.find({ level: req.params.level }, (err, quizs) => {
            if (err) {
                res.status(404).json(err);
            }
            let random = Util.getRandom(quizs.length);
            res.status(200).json(quizs[random]);
        })
    }
    // get a list of quiz by diffculty 
    public getQuizsByDifficulty(req: express.Request, res: express.Response) {
        Quiz.find({}).where('level').equals(req.params.level).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        })
    }
    // get a list of most played quiz
    public getHotQuizs(req: express.Request, res: express.Response) {
        Quiz.find({}).sort({'played': -1}).limit(5).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        })
    }
    // get a list of new quiz
    public getNewQuizs(req: express.Request, res: express.Response) {
        Quiz.find({}).sort('creationDate').limit(5).exec((err, quizs) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(quizs);
        })
    }

    // ce n'es pas sa palce, il vaut mieux créer un controller que pour les images je pense...
    public getImage(req: express.Request, res: express.Response){
        res.sendFile(path.join(__dirname, "../assets/"+req.params.image+".png"));
    }
}


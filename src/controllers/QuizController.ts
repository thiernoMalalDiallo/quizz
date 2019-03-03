
import * as mongoose from 'mongoose';
import { QuizSchema } from '../mongooseModels/QuizModel';
import express from 'express';
import { Util } from './Utils';
import { UserSchema } from './../mongooseModels/UserModel';
import moment from 'moment';
const path = require("path");
const Quiz = mongoose.model('Quiz', QuizSchema);
const User = mongoose.model('User', UserSchema);

export class QuizController {
    public utility: Util = new Util();
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
        var tab: Array<any> = [];
        var date: String = moment().subtract(5, 'days').format('YYYY-MM-DD').toString() + "";
        User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
            if (err) {

                res.status(500).json({ message: err })
            }
            else {
                if (score_quiz == null || score_quiz.length == 0)
                    tab = [];
                else {
                    var fields = score_quiz["scores"]["score_quiz"];
                    for (let i = 0; i < fields.length; i++) {
                        if (new Date(new Date().setDate(new Date().getDate() - 5)) < fields[i]['last_played']) {
                            tab.push(fields[i]['quizId']);
                        }
                    }

                }


                Quiz.find({}).where("_id").nin(tab).where("level").equals(req.query.level).exec((err, quizs) => {
                    if (err) {
                        res.status(500).json({ message: err });
                    }
                    if (quizs.length == 0 || quizs == null)
                        res.status(404).json({ message: "resource not found" })
                    let random = Util.getRandom(quizs.length);
                    res.status(200).json(quizs[random]);
                });
            }

        });

    }
    // get a list of quiz by diffculty 
    public getQuizsByDifficulty(req: express.Request, res: express.Response) {
        var tab: Array<any> = [];
        var date: String = moment().subtract(5, 'days').format('YYYY-MM-DD').toString() + "";
        User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
            if (err) {

                res.status(500).json({ message: err })
            }
            else {
                if (score_quiz == null || score_quiz.length == 0)
                    tab = [];
                else {
                    var fields = score_quiz["scores"]["score_quiz"];
                    for (let i = 0; i < fields.length; i++) {
                        if (new Date(new Date().setDate(new Date().getDate() - 5)) < fields[i]['last_played']) {
                            tab.push(fields[i]['quizId']);
                        }
                    }

                }

                Quiz.find({}).where('level').equals(req.query.level).where("_id").nin(tab)
                    .limit(+req.query.quantity).select('quizName image theme').exec((err, quizs) => {
                        if (err) {
                            res.status(500).json({ message: err });
                        }
                        if (quizs.length == 0 || quizs == null)
                            res.status(404).json({ message: "resource not found" });
                        else
                            res.status(200).json(quizs);
                    });
            }

        });
    }
    // get a list of most played quiz
    public getHotQuizs(req: express.Request, res: express.Response) {
        var tab: Array<any> = [];
        var date: String = moment().subtract(5, 'days').format('YYYY-MM-DD').toString() + "";
        User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
            if (err) {

                res.status(500).json({ message: err })
            }
            else {
                if (score_quiz == null || score_quiz.length == 0)
                    tab = [];
                else {
                    var fields = score_quiz["scores"]["score_quiz"];
                    for (let i = 0; i < fields.length; i++) {
                        if (new Date(new Date().setDate(new Date().getDate() - 5)) < fields[i]['last_played']) {
                            tab.push(fields[i]['quizId']);
                        }
                    }

                }


                Quiz.find({}).where("_id").nin(tab).sort({ 'played': -1 })
                    .limit(+req.query.quantity).select('quizName image theme').exec((err, quizs) => {
                        if (err) {
                            res.status(500).json({ message: err });
                        }
                        if (quizs.length == 0 || quizs == null)
                            res.status(404).json({ message: "resource not found" });
                        res.status(200).json(quizs);
                    })
            }

        });
    }
    // get a list of recommended quiz
    public getRecommendedQuizs(req: express.Request, res: express.Response) {
        var tab: Array<any> = [];
        var date: String = moment().subtract(5, 'days').format('YYYY-MM-DD').toString() + "";
        User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_theme').exec((err, score_quiz) => {
            if (err) {

                res.status(500).json({ message: err })
            }
            else {
                if (score_quiz == null || score_quiz.length == 0)
                    tab = [];
                else {
                    var fields = score_quiz["scores"]["score_theme"];
                    for (let i = 0; i < fields.length; i++) {
                            tab.push(fields[i]['theme']);
                    }
                    console.log(tab)
                }
                Quiz.find().where("theme").in(tab).limit(+req.query.quantity).select('quizName image theme')
                .exec((err,quiz)=>{
                    if (err){
                        res.status(500).json({message:err.toString()});
                    }
                    else{
                        res.status(201).json(quiz);
                    }
                });
            }

        });
    }
    // get a list of new quiz
    public getNewQuizs(req: express.Request, res: express.Response) {
        var tab: Array<any> = [];
        var date: String = moment().subtract(5, 'days').format('YYYY-MM-DD').toString() + "";
        User.findOne({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
            if (err) {

                res.status(500).json({ message: err })
            }
            else {
                if (score_quiz == null || score_quiz.length == 0)
                    tab = [];
                else {
                    var fields = score_quiz["scores"]["score_quiz"];
                    for (let i = 0; i < fields.length; i++) {
                        if (new Date(new Date().setDate(new Date().getDate() - 5)) < fields[i]['last_played']) {
                            tab.push(fields[i]['quizId']);
                        }
                    }

                }
                Quiz.find({}).where("_id").nin(tab).sort('creationDate').limit(+req.query.quantity).select('quizName image theme')
                    .exec((err, quizs) => {
                        if (err) {
                            res.status(500).json({ message: err });
                        }
                        if (quizs.length == 0 || quizs == null)
                            res.status(404).json({ message: "resource not found" });
                        res.status(200).json(quizs);
                    })
            }

        });
    }

    // ce n'es pas sa palce, il vaut mieux créer un controller que pour les images je pense...
    public getImage(req: express.Request, res: express.Response) {
        res.sendFile(path.join(__dirname, "../assets/" + req.params.image + ".png"));
    }
}


import * as express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
import moment from 'moment';
import { UserClass } from 'models/UserClass';
import { ScoreClass } from 'models/ScoresClass';
import { QuizSchema } from './../mongooseModels/QuizModel';
import { json } from 'body-parser';
const User = mongoose.model('User', UserSchema);
const Quiz = mongoose.model('Quiz', QuizSchema);
export class ScoresController {
    // get all the scores of user by id
    public getScores(req: express.Request, res: express.Response): any {
        User.find({}).where('_id').equals(req.params.userId).select('scores').exec((err, score) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(score);
        })
    }
    // update Global_score by user's id
    public updateGlobal_Score(req: express.Request, res: express.Response): any {
        User.findByIdAndUpdate(req.params.userId, { $set: { 'scores.score_global': req.body.score_global } }).exec((err, globalScore) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json();
        })
    }
    // get global_score by user's id
    public getGlobal_Score(req: express.Request, res: express.Response): any {
        User.find({}).where("_id").equals(req.params.userId).select('scores.score_global').exec((err, globalScore) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(globalScore);
        })
    }
    // update score_quiz by user's id
    public updateScore_quiz(req: express.Request, res: express.Response): any {
        req.body.last_played = moment().format('YYYY-MM-DD').toString() + "";
        User.findByIdAndUpdate(req.params.userId, { $push: { 'scores.score_quiz': req.body } }).exec((err, score_quiz) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(req.body);
        })
    }
    // get global_quiz by user's id
    public getScore_quiz(req: express.Request, res: express.Response): any {
        User.find({}).where("_id").equals(req.params.userId).select('scores.score_quiz').exec((err, score_quiz) => {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(score_quiz);
        })
    }

    public getTopScore(req: express.Request, res: express.Response) {
        User.find({}).sort([['scores.score_global', -1]]).limit(5).exec((err, users: Array<UserClass>) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(users);
            }
        });
    }
    public getTopScoreByTheme(req: express.Request, res: express.Response) {
        User.find({}).sort({ 'scores.score_theme.score': 1 }).where("scores.score_theme.theme").equals(req.params.theme).limit(5)
            .exec((err, users) => {
                if (err) {
                    res.json(err)
                }
                else {
                    for (let i = 0; i < users.length; i++) {
                        let tab = [];
                        for (let j = 0; j < users[i]['scores']['score_theme'].length; j++) {
                            if (users[i]['scores']['score_theme'][j]['theme'] === req.params.theme) {
                                tab.push(users[i]['scores']['score_theme'][j]);
                            }
                        }
                        users[i]['scores']['score_theme'] = tab;
                    }
                    users = users.sort((user1, user2) => {
                        if (+user1['scores']['score_theme'][0]['score'] > +user2['scores']['score_theme'][0]['score'])
                            return -1;
                        else if (+user1['scores']['score_theme'][0]['score'] < +user2['scores']['score_theme'][0]['score'])
                            return 1;
                        else
                            return 0;
                    })
                    res.json(users);
                }
            });
    }

    public getTopScoreByEveryTheme(req: express.Request, res: express.Response) {
        let response: Array<{
            theme: String,
            user: Array<{score:any,detailUser:any}>
        }> = [];
        Quiz.find().distinct('theme', (err, quizs) => {
            quizs.forEach(element => {
                response.push({ theme: element, user: [] });
            });
            User.find({}).exec((err, users) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                else {
                    if (users.length == 0 || users == null)
                        res.status(404).json({ message: "ressource not found" });
                    else {
                        users.forEach(user => {
                            for (let j = 0; j < user['scores']['score_theme'].length; j++) {
                                response.forEach(response => {
                                    if (response.theme === user['scores']['score_theme'][j]['theme']) {
                                        
                                        response.user.push({score:user['scores']['score_theme'][j]['score'],detailUser:user});
                                    }
                                });
                            }
                        });
                        response.forEach(element => {
                            element.user=element.user.sort((user1, user2) => {
                                if (+user1.score > +user2.score)
                                    return -1;
                                else if (+user1.score< +user2.score)
                                    return 1;
                                else
                                    return 0;
                            });
                        });
                        res.status(200).json(response);
                    }
                }
            });

        });
    }
}
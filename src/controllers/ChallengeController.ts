
import express from 'express';
import * as mongoose from 'mongoose';
import { UserSchema } from './../mongooseModels/UserModel';
import { ChallengeSchema } from "./../mongooseModels/ChallengeModel";
import { ChallPlayerSchema } from "./../mongooseModels/ChallPlayer"
import { QuizSchema } from './../mongooseModels/QuizModel';
import { json } from 'body-parser';
const User = mongoose.model('User', UserSchema);
const Challenge = mongoose.model('Challenge', ChallengeSchema);
const ChallPlayer = mongoose.model("ChallPlayer", ChallPlayerSchema);
const Quiz = mongoose.model("Quiz", QuizSchema);
export class ChallengeController {
    public getHistoricUser(req:express.Request,res:express.Response){
        ChallPlayer.find({}).where("challengedId").equals(req.params.userId).exec((err,result)=>{
            if(err){
                res.status(500).json({message:err});
            }
            else{
                if(result==null || result.length==0){
                    res.status(404).json({message:"ressource not found"});
                }
                else {
                    res.status(200).json(result);
                }
            }
        });
    }
    public challengeAfriend(req: express.Request, res: express.Response) {
        ChallPlayer.findOne({}).where("challengedId").equals(req.body.challengedId).where("challengerId").equals(req.body.challengerId)
            .where("result").nin(["won", "lost"]).exec((err, challenged) => {

                if (err) {
                    res.json(err);
                }
                else
                    if (challenged == null) {
                        req.body.result = "in Progress";
                        let challenge = new ChallPlayer(req.body);
                        challenge.save((err, result) => {
                            if (err)
                                res.status(500).json(err);
                            else {
                                ChallPlayer.findOne({}).where("challengerId").equals(req.body.challengedId).where("challengedId").equals(req.body.challengerId)
                                    .where("result").nin(["won", "lost"]).exec((err, challenged2) => {
                                        if (err)
                                            res.status(500).json(err);
                                        else {
                                            if (challenged2 == null) {

                                                res.status(202).json({ message: "request accepted" });
                                            }
                                            else {
                                                if (+challenged2["score"] < +req.body.score) {
                                                    ChallPlayer.findOneAndUpdate({
                                                        challengedId: req.body.challengedId,
                                                        challengerId: req.body.challengerId,
                                                        quizId: req.body.quizId,
                                                        result: "in Progress"
                                                    }, { result: "won" }, (err, res1) => {
                                                        if (err) {
                                                            res.status(500).json(err);
                                                        }
                                                        else {
                                                            ChallPlayer.findOneAndUpdate({
                                                                challengedId: req.body.challengerId,
                                                                challengerId: req.body.challengedId,
                                                                quizId: req.body.quizId,
                                                                result: "in Progress"
                                                            }, { result: "lose" }, (err, res1) => {
                                                                if (err)
                                                                    res.status(500).json({ message: err });
                                                                else {

                                                                    User.findOneAndUpdate({ _id: req.body.challengedId }, { $inc: { "scores.score_global": 10 } }).exec((err, result) => {
                                                                        if (err) {
                                                                            res.status(500).json({ message: err });
                                                                        }
                                                                        else
                                                                            res.status(201).json({ message: "result updated" });
                                                                    });
                                                                }

                                                            });
                                                        }
                                                    });
                                                }
                                                else if (+challenged2["score"] > +req.body.score) {
                                                    ChallPlayer.findOneAndUpdate({
                                                        challengedId: req.body.challengerId,
                                                        challengerId: req.body.challengedId,
                                                        quizId: req.body.quizId,
                                                        result: "in Progress"
                                                    }, { result: "won" }, (err, res1) => {
                                                        if (err) {
                                                            res.status(500).json(err);
                                                        }
                                                        else {
                                                            ChallPlayer.findOneAndUpdate({
                                                                challengedId: req.body.challengedId,
                                                                challengerId: req.body.challengerId,
                                                                quizId: req.body.quizId,
                                                                result: "in Progress"
                                                            }, { result: "lose" }, (err, res1) => {
                                                                if (err)
                                                                    res.status(500).json({ message: err });
                                                                else
                                                                    User.findOneAndUpdate({ _id: req.body.challengerId }, { $inc: { "scores.score_global": 10 } }).exec((err, result) => {
                                                                        if (err) {
                                                                            res.status(500).json({ message: err });
                                                                        }
                                                                        else
                                                                            res.status(201).json({ message: "result updated" });
                                                                    });
                                                            });
                                                        }
                                                    });
                                                }
                                                else {
                                                    ChallPlayer.findOneAndUpdate({
                                                        challengedId: req.body.challengerId,
                                                        challengerId: req.body.challengedId,
                                                        quizId: req.body.quizId,
                                                        result: "in Progress"
                                                    }, { result: "lose" }, (err, res1) => {
                                                        if (err) {
                                                            res.status(500).json(err);
                                                        }
                                                        else {
                                                            ChallPlayer.findOneAndUpdate({
                                                                challengedId: req.body.challengedId,
                                                                challengerId: req.body.challengerId,
                                                                quizId: req.body.quizId,
                                                                result: "in Progress"
                                                            }, { result: "lose" }, (err, res1) => {
                                                                if (err)
                                                                    res.status(500).json({ message: err });
                                                                else
                                                                    res.status(201).json({ message: "result updated" });
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        }

                                    });
                            }
                        });
                    }
                    else {
                        res.status(202).json({ message: "request accepted" });
                    }
            }
            );
    }
    public addDailyQuiz(req: express.Request, res: express.Response) {
        let challenge = new Challenge(req.body);
        challenge.save((err, result) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            else
                res.status(201).json({ message: "daily quiz added" });
        });
    }
    public getChallenges(req: express.Request, res: express.Response) {
        Challenge.find({}).where("challengeType").equals(req.params.type).exec((err, quizsList) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            else {
                let tab: Array<any> = [];
                quizsList.forEach(element => {
                    tab.push(element["quizId"]);
                });
                Quiz.find({}).where("_id").in(tab).exec((err, quizs) => {
                    if (err)
                        res.status(500).json({ message: err });
                    else
                        if (quizs.length == 0 || quizs == null)
                            res.status(404).json({ message: "resource not found" });
                        else
                            res.status(200).json(quizs);
                });

            }
        });
    }

}
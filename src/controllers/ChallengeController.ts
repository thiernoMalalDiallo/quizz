
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
    public getHistoricUser(req: express.Request, res: express.Response) {
        let response: Array<{
            userId: String, userName: String, userIdVersus: String, userNameVersus: String,
            quizId: String, scoreUser: Number, scoreVersus: number, result: String
        }> = [];
        let challengerUserName: String = "", challengedUserName: string = "";
        ChallPlayer.find({}).or([{ challengedId: req.params.userId }, { challengerId: req.params.userId }]).exec((err, results) => {
            if (err) {
                res.status(500).json({ message: err });
            }
            else {
                if (results == null || results.length == 0) {
                    res.status(404).json({ message: "ressource not found" });
                }
                else {
                    results.forEach(element => {
                        User.findOne({}).where("_id").equals(element["challengerId"]).exec((err, challengerName) => {
                            if (err) {
                                res.status(500).json({ message: err });
                            }
                            else
                                if (challengerName == null)
                                    res.status(404).json({ message: "resource not found" });

                                else {
                                    challengerUserName = challengerName['username'];
                                    User.findOne({}).where("_id").equals(element["challengedId"]).exec((err, challengedName) => {
                                        if (err) {
                                            res.status(500).json({ message: err });
                                        }
                                        else
                                            if (challengedName == null)
                                                res.status(404).json({ message: "resource not found" });
                                            else {
                                                if (element["challengerId"] == req.params.userId) {
                                                    response.push({
                                                        userId: element["challengerId"], userName: challengerUserName,
                                                        userIdVersus: element["challengedId"], userNameVersus: challengedUserName,
                                                        quizId: element["quizId"],
                                                        scoreUser: element["scoreChallenger"], scoreVersus: element["scoreChallenged"]
                                                        , result: element["resultChallenger"]
                                                    })
                                                }
                                                else {

                                                    response.push({
                                                        userId: element["challengedId"], userName: challengedUserName,
                                                        quizId: element["quizId"]
                                                        ,
                                                        userIdVersus: element["challengerId"], userNameVersus: challengerUserName,
                                                        scoreUser: element["scoreChallenged"], scoreVersus: element["scoreChallenged"]
                                                        , result: element["resultChallenged"]
                                                    })
                                                }
                                            }
                                    });

                                }
                        })
                    }); 
                    var delay = ( function() {
                        var timer:any = 0;
                        return function(_callback:any, ms:any) {
                            clearTimeout (timer);
                            timer = setTimeout(_callback, ms);
                        };
                    })();
                    delay(function(){
                        
                    res.status(200).json(response);
                    }, 1000 ); // end delay
                }
            }
        });
    }
    
    public challengeAfriend(req: express.Request, res: express.Response) {
        if (req.params.action === "launchAChallenge") {
            req.body.resultChallengedId = "In Progess";
            req.body.resultChallengerId = "In Progess";
            let challfriend = new ChallPlayer(req.body);
            challfriend.save((err, result) => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                else
                    res.status(201).json(result);
            });
        }
        else {
            ChallPlayer.findOne({}).where("_id").equals(req.body._id).exec((err, challplayer) => {
                if (err) {
                    res.status(500).json({ message: err })
                }
                else
                    if (challplayer == null) {
                        res.status(404).json({ message: "ressource not found" });
                    }
                    else {
                        if (+challplayer["scoreChallenger"] > +req.body.scoreChallenged) {
                            ChallPlayer.findOneAndUpdate({ _id: challplayer["_id"] },
                                { resultChallenger: "Won", resultChallenged: "Lost", scoreChallenged: req.body.scoreChallenged })
                                .exec((err, results) => {
                                    if (err)
                                        res.status(500).json({ message: err });
                                    else
                                        res.status(201).json(results);
                                });
                        }
                        else if (+challplayer["scoreChallenger"] < +req.body.scoreChallenged) {
                            ChallPlayer.findOneAndUpdate({ _id: challplayer["_id"] },
                                { resultChallenger: "Lost", resultChallenged: "Won", scoreChallenged: req.body.scoreChallenged })
                                .exec((err, results) => {
                                    if (err)
                                        res.status(500).json({ message: err });
                                    else
                                        res.status(201).json(results);
                                });
                        }
                        else {
                            ChallPlayer.findOneAndUpdate({ _id: challplayer["_id"] },
                                { resultChallenger: "Draw", resultChallenged: "Draw", scoreChallenged: req.body.scoreChallenged })
                                .exec((err, results) => {
                                    if (err)
                                        res.status(500).json({ message: err });
                                    else
                                        res.status(201).json(results);
                                });
                        }
                    }
            })
        }
    }
    public addDaily_WeeklyQuiz(req: express.Request, res: express.Response) {
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
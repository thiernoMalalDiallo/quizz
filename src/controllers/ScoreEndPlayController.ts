import * as mongoose from 'mongoose';
import { UserSchema } from '../mongooseModels/UserModel';
import {QuizSchema} from '../mongooseModels/QuizModel'
import {Util} from './Utils';
import express from 'express';
import moment from 'moment';
const Quiz= mongoose.model("Quiz",QuizSchema);
const User = mongoose.model('User',UserSchema);

export class ScoreEndPlayController {

    public saveScorePlay(req: express.Request, res: express.Response) {
        req.body.last_played = moment().format('YYYY-MM-DD').toString() + "";
        // ENREGISTREMENT DU SCORE DU QUIZ
        Quiz.findOneAndUpdate({_id:req.body.quizId},{$inc:{played:1}}).exec(err=>{
            if(err)
                res.status(500).json({message:err})
        })
        User.findByIdAndUpdate(req.params.userId,{$push:{'scores.score_quiz':req.body}}).exec((err,score_quiz)=>{
            if(err){
                res.status(500).json(err);
            }
            if(score_quiz != null){
                //RECUPERATION DU SCORE GLOBAL
                User.find({}).where("_id").equals(req.params.userId).select('scores.score_global').exec((err,globalScore)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    else{
                        //MISE A JOUR DU SCORE GLOBAL
                        let global_score = globalScore[globalScore.length-1].scores.score_global + req.body.score;
                        User.findByIdAndUpdate(req.params.userId,{$set:{'scores.score_global':global_score}}).exec((err,globalScore)=>{
                            if(err){
                                res.status(500).json(err);
                            }
                            else{
                                //RECUPERATION DES USERS
                                User.find({}, (err, users) => {
                                    if(err){
                                        res.send(err);
                                    }
                                    //MISE A JOUR DU RANKING
                                    if(users != null){
                                        let usrs = Util.updateRanking(users);
                                        let i:any;
                                        for(i = 0; i < usrs.length; i++){
                                            User.findByIdAndUpdate(usrs[i]._id,{$set:{'username':usrs[i].username, 'password':usrs[i].password, 'picture':usrs[i].picture, 'ranking': usrs[i].ranking, 'scores': usrs[i].scores, 'friendsList': usrs[i].friendsList}}).exec((err,user)=>{
                                                if(err){
                                                    res.status(500).json(err);
                                                }
                                                else{
                                                    //res.status(200).json(user);
                                                    
                                                }
                                            });
                                        } 
                                        //MISE A JOUR DU SCORE DU THEME ET DU NOMBRE DE TROPHES
                                        User.findOne({}).where('_id').equals(req.params.userId).select('scores.score_theme').exec((err,scoreTheme)=>{
                                            if(err){
                                                res.json(err);
                                            }
                                            if(scoreTheme != null){
                                                let scoresTheme = Util.updateScoreThemeAndAchievement(scoreTheme.scores.score_theme,req.body.theme,req.body.score);
                                                let i:any;
                                                User.findByIdAndUpdate(req.params.userId,{$set:{'scores.score_theme':scoresTheme}}).exec((err,scoreTheme)=>{
                                                    if(err){
                                                        res.status(500).json(err);
                                                    }
                                                    else{
                                                        
                                                    }
                                                });
                                            }
                                        });
                                        res.status(200).json({message:"ScoreQuiz, GlobalScore, ScoreTheme and Achievement had been update. "});
                                    }

                                });
                            }
                        });
                    }
                }); 
            }
        });
        
    }
}

import * as mongoose from 'mongoose';
import { UserSchema } from '../mongooseModels/UserModel';
import express from 'express';
import moment from 'moment';

const User = mongoose.model('User',UserSchema);

export class ScoreEndPlayController {

    public saveScorePlay(req: express.Request, res: express.Response) {
        req.body.last_played= moment().format('YYYY-MM-DD').toString() + "";
        // ENREGISTREMENT DU SCORE DU QUIZ
        User.findByIdAndUpdate(req.params.userId,{$push:{'scores.score_quiz':req.body}}).exec((err,score_quiz)=>{
            if(err){
                res.status(500).json(err);
            }
            if(score_quiz != null){
                //RECUPERATION DU SCORE GLOBAL
                let scoreQuiz = score_quiz.score;
                User.find({}).where("_id").equals(req.params.userId).select('scores.score_global').exec((err,globalScore)=>{
                    if(err){
                        res.status(500).json(err);
                    }
                    else{
                        //MISE A JOUR DU SCORE GLOBAL
                        globalScore = globalScore + scoreQuiz;
                        User.findByIdAndUpdate(req.params.userId,{$set:{'scores.score_global':globalScore}}).exec((err,globalScore)=>{
                            if(err){
                                res.status(500).json(err);
                            }
                            else{
                                //MISE A JOUR DU RANKING
                            }
                        });
                    }
                }); 
            }
        });
        
    }
}

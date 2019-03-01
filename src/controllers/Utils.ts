import * as express from 'express';
import * as mongoose from 'mongoose';
import moment from 'moment';
import {UserSchema} from './../mongooseModels/UserModel';
import { UserClass } from 'models/UserClass';
import { json } from 'body-parser';
const User=mongoose.model('User',UserSchema);
export class Utility{
    constructor(){

    }
// send a random number to be used
    public static getRandom(length:any):any {
        // valeur attendu : [0, length[
        return Math.trunc(Math.random() * Math.trunc(length));
    }
    public static getexcludedQuizId(req:express.Request,res:express.Response):any{
        User.findOne({}).where("_id").equals(req.query.userId).where("scores.score_quiz.last_played").gt(
            new Date().setDate(new Date().getDate()-5)
        ).select('scores.score_quiz').exec((err,score_quiz)=>{
            if(err){
                res.status(500).json({message:err});
            } 
            else{
            if(score_quiz==null || score_quiz.length==0)
                return [];
            else 
                var fields = score_quiz[0]["score_quiz"];
                let tab=[]
                for(let i=0;i<fields.length;i++){
                    tab.push(fields[i]);
                }
                return tab;
            }
        });
    }
    
    public static getMostPlayedQuizThemeForUser(req:express.Request,res:express.Response):any{
        User.findOne({}).where("_id").equals(req.query.userId).select('scores.score_quiz').exec((err,score_quiz)=>{
            if(err){
                res.status(500).json({message:err});
            } 
            else{
            if(score_quiz==null || score_quiz.length==0)
                return [""];
            else 
                var fields = score_quiz[0]["score_quiz"];
                let tab=[]
                for(let i=0;i<fields.length;i++){
                    tab.push(fields[i]);
                }
                return tab;
            }
        })
    }
}
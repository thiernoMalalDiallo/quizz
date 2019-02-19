import * as mongoose from 'mongoose';
import {QuizSchema} from '../models/QuizModel';
import express from 'express';
import { Util } from './Utils';

const Quiz = mongoose.model('Quiz', QuizSchema); 

export class QuizController{
        public addNewQuiz (req: express.Request, res: express.Response) {    
            let  newQuiz = new Quiz(req.body);
            newQuiz.save((err,quiz)=>{
                if(err){
                    res.status(400).json(res);
                }
                res.status(200).json(quiz);
            });
        }

        public getQuizs (req: express.Request, res: express.Response) {   
            Quiz.find({},(err,quizs)=>{
                if(err){
                    res.status(404).json(err);
                }
                res.status(200).json(quizs);
            })        
            
        }

        public getQuizWithID (req: express.Request, res: express.Response) {  
            Quiz.findById(req.params.quizId)
        }

        public updateQuiz(req: express.Request, res: express.Response) {           
            Quiz.findOneAndUpdate({ _id: req.params.quizId }, req.body, { new: true }, (err, quiz) => {
                if(err){
                    res.send(err);
                }
                res.json(quiz);
            });
        }

        public deleteQuiz(req: express.Request, res: express.Response) {           
            Quiz.remove({ _id: req.params.quizId }, (err) => {
                if(err){
                    res.status(400).json(err);
                }
                res.status(200).json({ message: 'Successfully deleted contact!'});
            });           
        }

        public randomQuiz(req: express.Request, res: express.Response) {           
            Quiz.find({ level: req.params.quizzLevel }, (err,quizs) => {
                if(err){
                    res.status(404).json(err);
                }
                let random = Util.getRandom(0,quizs.length-2);
                res.status(200).json(quizs[random]);
            })
        }
        
    }
    

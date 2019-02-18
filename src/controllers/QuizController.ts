import * as mongoose from 'mongoose';
import {QuizSchema} from '../models/QuizModel';
import express from 'express';

const Quizz = mongoose.model('Quiz', QuizSchema); 

export class QuizController{

        public addNewQuizz (req: express.Request, res: express.Response) {    
            let  newQuizz = new Quizz(req.body);
            newQuizz.save((err,quizz)=>{
                if(err){
                    res.status(400).json(res);
                }
                res.status(200).json(quizz);
            });
        }

        public getQuizzs (req: express.Request, res: express.Response) {   
            Quizz.find({},(err,quizzs)=>{
                if(err){
                    res.status(404).json(err);
                }
                res.status(200).json(quizzs);
            })        
            
        }

        public getQuizWithID (req: express.Request, res: express.Response) {  

            
        }

        public updateQuiz(req: express.Request, res: express.Response) {           
            Quizz.findOneAndUpdate({ _id: req.params.quizzId }, req.body, { new: true }, (err, quizz) => {
                if(err){
                    res.send(err);
                }
                res.json(quizz);
            });
        }

        public deleteQuiz(req: express.Request, res: express.Response) {           
            Quizz.remove({ _id: req.params.quizzId }, (err) => {
                if(err){
                    res.status(400).json(err);
                }
                res.status(200).json({ message: 'Successfully deleted contact!'});
            });           
        }

        public randomQuiz(req: express.Request, res: express.Response) {           
            
        }
        
    }
    

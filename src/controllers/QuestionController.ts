import * as mongoose from 'mongoose';
import {QuestionSchema} from '../models/QuizModel';
import express from 'express';

const Question = mongoose.model('Question', QuestionSchema); 

export class QuestionController{

        public addNewQuestion(req: express.Request, res: express.Response) {              
            let newQuestion = new Question(req.body);
            newQuestion.save((err, question) => {
                if(err){
                    res.send(err);
                }    
                res.json(question);
            });
        }

        public getAllQuestion(req: express.Request, res: express.Response) {           
            Question.find({},(err, questions) => {
                if(err){
                    res.send(err);
                }
                res.send(questions);
            })
        }

        public getQuestionWithID(req: express.Request, res: express.Response) {  
            Question.findById(req.params.questionId,(err, question) => {
                if(err){
                    res.send(err);
                }
                res.send(question);
            })
        }

        public updateQuestion(req: express.Request, res: express.Response) {           
            
        }

        public deleteQuestion(req: express.Request, res: express.Response) {           
            
        }
        

    }
    

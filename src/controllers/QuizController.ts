import * as mongoose from 'mongoose';
import {QuizSchema} from '../models/QuizModel';
import {QuestionController} from './QuestionController';
import {AnswerController} from './AnswerController';
import express from 'express';

const Quiz = mongoose.model('Quiz', QuizSchema); 

export class QuizController{

        public addNewQuiz (req: express.Request, res: express.Response) {              
            
        }

        public getAllQuiz (req: express.Request, res: express.Response) {           
            
        }

        public getQuizWithID (req: express.Request, res: express.Response) {  
            
        }

        public updateQuiz(req: express.Request, res: express.Response) {           
            
        }

        public deleteQuiz(req: express.Request, res: express.Response) {           
            
        }

        public randomQuiz(req: express.Request, res: express.Response) {           
            
        }
        
    }
    

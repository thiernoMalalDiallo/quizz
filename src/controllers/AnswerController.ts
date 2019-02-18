import * as mongoose from 'mongoose';
import {AnswerSchema} from '../models/QuizModel';
import express from 'express';

const Answer = mongoose.model('Answer', AnswerSchema); 

export class AnswerController{

        public addNewAnswer(req: express.Request, res: express.Response) {              
            
        }

        public getAllAnswer(req: express.Request, res: express.Response) {           
            
        }

        public getAnswerWithID(req: express.Request, res: express.Response) {  
            
        }

        public updateAnswer(req: express.Request, res: express.Response) {           
            
        }

        public deleteAnswer(req: express.Request, res: express.Response) {           
            
        }
        
    }
    

import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class RoutesQuizz {
    
    
    public quizController:QuizController= new QuizController();
    public userController:UserController= new UserController();
    
    public routes(app:any){
               /*==================== ROUTES FOR QUIZ ========================*/
                //manipulate quizz by id
                app.route('/quiz/:quizzId')
                .get(this.quizController.getQuizWithID) 
                .put(this.quizController.updateQuiz)
                .delete(this.quizController.deleteQuiz);
                //add delete user
                app.route('/quizz') 
                .get(this.quizController.getAllQuiz)        
                .post(this.quizController.addNewQuiz);

        
    }
}
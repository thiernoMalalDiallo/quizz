import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class RoutesQuizz {
    
    
    public quizController:QuizController= new QuizController();
    public userController:UserController= new UserController();
    
    public routes(app:any){
               /*==================== ROUTES FOR QUIZ ========================*/

                app.route('/quiz/:quizId')
                .get(this.quizController.getQuizWithID) 
                .put(this.quizController.updateQuiz)
                .delete(this.quizController.deleteQuiz)
 
                app.route('/quiz') 
                .get(this.quizController.getAllQuiz)        
                .post(this.quizController.addNewQuiz)

        
    }
}
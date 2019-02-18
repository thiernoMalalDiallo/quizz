import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class RoutesQuiz {
    public quizController:QuizController= new QuizController();
    public userController:UserController= new UserController();
    public routes(app:any){
               /*==================== ROUTES FOR QUIZ ========================*/
                //manipulate quizz by id
                app.route('/quiz/:quizId')
                .get(this.quizController.getQuizWithID) 
                .put(this.quizController.updateQuiz)
                .delete(this.quizController.deleteQuiz);
                //add delete user
                app.route('/quiz') 
                .get(this.quizController.getQuizs)        
                .post(this.quizController.addNewQuiz); 
                //choose a quiz randomly
                app.route('/quiz/dificulty/:level')
                .get(this.quizController.randomQuiz)
    }
}
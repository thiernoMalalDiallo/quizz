import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class RoutesQuiz {
    public quizController:QuizController= new QuizController();
    public routes(app:any){
               /*==================== ROUTES FOR QUIZ ========================*/
               
                //add delete user
                app.route('/quizs') 
                .get(this.quizController.getQuizs)        
                .post(this.quizController.addNewQuiz); 
                //manipulate quizz by id
                app.route('/quizs/:quizId')
                .get(this.quizController.getQuizWithID) 
                .put(this.quizController.updateQuiz)
                .delete(this.quizController.deleteQuiz);
                //choose a quiz randomly
                app.route('/quizs/difficulty/getQuiz/:level')
                .get(this.quizController.randomQuiz)
                // get a list of quizs by difficulty
                app.route('/quizs/difficulty/:level').
                get(this.quizController.getQuizsByDifficulty)
                // get a list of quizs by difficulty
                app.route('/quizs/difficulty/:level/mostPlayed').
                get(this.quizController.getHotQuizsByDifficulty)

    }
}
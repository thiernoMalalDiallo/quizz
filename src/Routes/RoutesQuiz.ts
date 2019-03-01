import express from "express";
import { QuizController } from '../controllers/QuizController';
import { UserController } from '../controllers/UserController';

export class RoutesQuiz {
    public quizController: QuizController = new QuizController();
    public routes(app: any) {
        /*==================== ROUTES FOR QUIZ ========================*/

        //add get quiz
        app.route('/quizs')
            .get(this.quizController.getQuizs)
            .post(this.quizController.addNewQuiz);
        //choose a quiz randomly
        app.route('/quizs/random/:userId')
            .get(this.quizController.randomQuiz)
        //manipulate quizz by id
        app.route('/quizs/:quizId')
            .get(this.quizController.getQuizWithID)
            .put(this.quizController.updateQuiz)
            .delete(this.quizController.deleteQuiz);
        // get a list of quizs by difficulty
        app.route('/quizs/difficulty/:userId')
            .get(this.quizController.getQuizsByDifficulty)
        // get a list of quizs by most played 
        app.route('/quizs/mostPlayed/:userId')
            .get(this.quizController.getHotQuizs)
        // get a list of new quiz
        app.route('/quizs/new/:userId')
            .get(this.quizController.getNewQuizs)
        // get a list of recommended quizs for a user  
        app.route('/quizs/recommended/:userId')
            .get(this.quizController.getRecommendedQuizs)
        // ce n'es pas sa palce, il vaut mieux créer des routes que pour les images je pense...
        app.route('/logo/:image').
            get(this.quizController.getImage)

    }
}
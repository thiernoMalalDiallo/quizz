import {QuizController} from '../controllers/QuizController';

export class RoutesQuiz {
    public quizController:QuizController= new QuizController();
    public routes(app:any){
               /*==================== ROUTES FOR QUIZ ========================*/
               
                //add get quiz
                app.route('/quizs') 
                .get(this.quizController.getQuizs)        
                .post(this.quizController.addNewQuiz); 
               
               
               
                //manipulate quizz by id
                app.route('/quizs/:quizId')
                .get(this.quizController.getQuizWithID) 
                .put(this.quizController.updateQuiz)
                .delete(this.quizController.deleteQuiz);
                //choose a quiz randomly
                app.route('/quizs/difficulty/random/:level')
                .get(this.quizController.randomQuiz)
                // get a list of quizs by difficulty
                app.route('/quizs/difficulty/:level')
                .get(this.quizController.getQuizsByDifficulty)
                // get a list of quizs by most played 
                app.route('/quizs/mostPlayed/topFive')
                .get(this.quizController.getHotQuizs)
                // get a list of new quiz
                app.route('/quizs/new/fiveLast')
                .get(this.quizController.getNewQuizs)

                // ce n'es pas sa palce, il vaut mieux créer des routes que pour les images je pense...
                app.route('/logo/:image').
                get(this.quizController.getImage)

    }
}
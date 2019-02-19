"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuizController_1 = require("../controllers/QuizController");
const UserController_1 = require("../controllers/UserController");
class RoutesQuiz {
    constructor() {
        this.quizController = new QuizController_1.QuizController();
        this.userController = new UserController_1.UserController();
    }
    routes(app) {
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
            .get(this.quizController.randomQuiz);
        // get a list of quizs by difficulty
        app.route('/quizs/difficulty/:level').
            get(this.quizController.getQuizsByDifficulty);
        // get a list of quizs by difficulty
        app.route('/quizs/difficulty/:level/mostPlayed').
            get(this.quizController.getHotQuizsByDifficulty);
    }
}
exports.RoutesQuiz = RoutesQuiz;
//# sourceMappingURL=RoutesQuiz.js.map
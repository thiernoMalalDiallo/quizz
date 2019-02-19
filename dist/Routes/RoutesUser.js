"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuizController_1 = require("../controllers/QuizController");
const UserController_1 = require("../controllers/UserController");
class RoutesUser {
    constructor() {
        this.quizController = new QuizController_1.QuizController();
        this.userController = new UserController_1.UserController();
    }
    routes(app) {
        /*=========================== ROUTES FOR USER =====================*/
        // User Authentification
        app.route('/users/Authentification')
            .get(this.userController.Authentification);
        // manipulate user by his id
        app.route('/users/:userId')
            .get(this.userController.getUserWithID)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
        // add get a user 
        app.route('/users')
            .get(this.userController.getUsers)
            .post(this.userController.addNewUser);
        app.route('/aaa/:userId')
            .get(this.userController.getRanking);
    }
}
exports.RoutesUser = RoutesUser;
//# sourceMappingURL=RoutesUser.js.map
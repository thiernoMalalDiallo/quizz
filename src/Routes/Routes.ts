import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class Routes {
    
    
    public quizController:QuizController= new QuizController();
    public userController:UserController= new UserController();
    
    public routes(app:any){
        app.route('/').
        get((req:express.Request,res:express.Response)=>{
            res.status(200).send({
                message:200
            });
        })
                /*=========================== ROUTES FOR USER =====================*/

                // Contact detail
                app.route('/users/Authentification')
                // get specific contact
                .get(this.userController.Authentification) 
                // Contact detail
                app.route('/users/:userId')
                // get specific contact
                .get(this.userController.getUserWithID) 
                .put(this.userController.updateUser)
                .delete(this.userController.deleteUser)

                
                // Contact 
                app.route('/users') 
                // GET endpoint 
                .get(this.userController.getUsers)        
                // POST endpoint
                .post(this.userController.addNewUser)

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
import express from "express";
import {QuizController} from '../controllers/QuizController';
import {UserController} from '../controllers/UserController';
export class RoutesUser {
    
    
    public quizController:QuizController= new QuizController();
    public userController:UserController= new UserController();
    
    public routes(app:any){
        
                /*=========================== ROUTES FOR USER =====================*/

                // User detail
                app.route('/users/Authentification')
                // get specific contact
                .get(this.userController.Authentification) 
                // Contact detail
                app.route('/users/:userId')
                .get(this.userController.getUserWithID) 
                .put(this.userController.updateUser)
                .delete(this.userController.deleteUser)

                
                // Contact 
                app.route('/users') 
                // GET endpoint 
                .get(this.userController.getUsers)        
                // POST endpoint
                .post(this.userController.addNewUser)
    }
}
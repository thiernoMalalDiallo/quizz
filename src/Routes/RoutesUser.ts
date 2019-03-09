import express from "express";
import {UserController} from '../controllers/UserController';
export class RoutesUser {
    public userController:UserController= new UserController();
    public routes(app:any){
        
                /*=========================== ROUTES FOR USER =====================*/

                // User Authentification
                app.route('/users/authentication')
                .post(this.userController.authentication) 
                // manipulate user by his id
                app.route('/users/:userId')
                .get(this.userController.getUserWithID) 
                .put(this.userController.updateUser)
                .delete(this.userController.deleteUser)
                // add get a user 
                app.route('/users') 
                .get(this.userController.getUsers)      
                .post(this.userController.addNewUser);
                // Delete all users
                app.route('/users')
                .delete(this.userController.deleteAllUser);
                /*app.route('/aaa/:userId')
                .get(this.userController.getRanking) */
    }
}
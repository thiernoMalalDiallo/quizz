import * as express from 'express';
import {ScoresController} from './../controllers/ScoresController'
export class RoutesScore{
    public  scoresController:ScoresController= new ScoresController();
    public routes(app:express.Application){
        app.route('/scores/:userId')
        .get(this.scoresController.getGlobal_Score);
    }
}
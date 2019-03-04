import * as express from 'express';
import {ScoresController} from './../controllers/ScoresController'
export class RoutesScore{
    public  scoresController:ScoresController= new ScoresController();
    public routes(app:express.Application){



        app.route('/scores/:userId')
        
        // get a user's  score document by his id
        .get(this.scoresController.getScores);
        app.route('/scores/globalScore/:userId')
        .get(this.scoresController.getGlobal_Score)
        .post(this.scoresController.updateGlobal_Score);
        
        app.route('/scores/score_quiz/:userId')
        .get(this.scoresController.getScore_quiz)
        .put(this.scoresController.updateScore_quiz);
    }
}
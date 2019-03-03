import express from "express";
import {ChallengeController} from './../controllers/ChallengeController'
export class RoutesChallenge {
    public challengeController: ChallengeController = new ChallengeController();
    public routes(app: any) {
        /*==================== ROUTES FOR Challenge ========================*/
        app.route("/challenges/challengeAfriend/:userId").
        post(this.challengeController.challengeAfriend);

 
    }
}
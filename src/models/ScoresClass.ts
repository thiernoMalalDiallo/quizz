export class ScoreClass {
    private _score_global!: Number;
    public get score_global(): Number {
        return this._score_global;
    }
    public set score_global(value: Number) {
        this._score_global = value;
    }
    private _score_theme!: [{
        theme: String;
        score: Number;
    }];
    public get score_theme(): [{
        theme: String;
        score: Number;
    }] {
        return this._score_theme;
    }
    public set score_theme(value: [{
        theme: String;
        score: Number;
    }]) {
        this._score_theme = value;
    }
    private _score_quiz!: [{
        id_quizz: String;
        score: Number;
    }];
    public get score_quiz(): [{
        id_quizz: String;
        score: Number;
    }] {
        return this._score_quiz;
    }
    public set score_quiz(value: [{
        id_quizz: String;
        score: Number;
    }]) {
        this._score_quiz = value;
    }
    private _score_challlenge!: [{
        id_challenger: String;
        result: String;
    }];
    public get score_challlenge(): [{
        id_challenger: String;
        result: String;
    }] {
        return this._score_challlenge;
    }
    public set score_challlenge(value: [{
        id_challenger: String;
        result: String;
    }]) {
        this._score_challlenge = value;
    }
    
}
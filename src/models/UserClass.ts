import { ScoreClass } from "./ScoresClass";

export class UserClass {
    public _username!: string;
    public  get userName(): string {
        return this._username;
    }
    public set userName(value: string) {
        this._username = value;
    }
    private _password!: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    private _picture!: string;
    public get picture(): string {
        return this._picture;
    }
    public set picture(value: string) {
        this._picture = value;
    }
    private _ranking!: number;
    public get ranking(): number {
        return this._ranking;
    }
    public set ranking(value: number) {
        this._ranking = value;
    }
    private _scores!: ScoreClass;
    public get scores():ScoreClass {
        return this._scores;
    }
    public set scores(value: ScoreClass) {
        this._scores = value;
    }
   
    private _friendsList!: [];
    public get friendsList(): [] {
        return this._friendsList;
    }
    public set friendsList(value: []) {
        this._friendsList = value;
    }


}
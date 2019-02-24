import { ScoreClass } from "./ScoresClass";

export class UserClass {
    private _UserName!: string;
    public get UserName(): string {
        return this._UserName;
    }
    public set UserName(value: string) {
        this._UserName = value;
    }
    private _Password!: string;
    public get Password(): string {
        return this._Password;
    }
    public set Password(value: string) {
        this._Password = value;
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
    public get scores(): ScoreClass {
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
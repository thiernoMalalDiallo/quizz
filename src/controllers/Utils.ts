export class Util{
// send a random number to be used
    public static getRandom(min:any, max:any):any {
        return Math.trunc(Math.random() * (max - min) + min);
    }

}
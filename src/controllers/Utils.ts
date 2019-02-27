export class Util{
// send a random number to be used
    public static getRandom(length:any):any {
        // valeur attendu : [0, length[
        return Math.trunc(Math.random() * Math.trunc(length));
    }

}
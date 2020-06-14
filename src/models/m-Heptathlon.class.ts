import {MHeptathlonInterface} from "./m-heptathlon.interface";

export class MHeptathlonClass implements MHeptathlonInterface {

    constructor() { }

    sixty="";
    lj="";
    sp="";
    hj="";
    hurdles="";
    pv="";
    thousand="";
    dayOneScore="";
    dayTwoScore="";
    totalScore="";
    title="";
    id="";

    eventScore(event: string, score: any): number {
        let a: number= 0;
        let b: number= 0;
        let c: number= 0;
        let cm: number= 0;
        let seconds: number= 0;
        switch(event){
            case "sixty":
                a = 58.0150;
                b = 11.5;
                c = 1.81;
                return this.calculateRunning(score,a,b,c)
            case "lj":
                a = 0.14354;
                b = 220;
                c = 1.40;
                cm = score*100;
                return this.calculateField(cm,a,b,c);
            case "sp":
                a = 51.39;
                b = 1.5;
                c = 1.05;
                return this.calculateField(score,a,b,c);
            case "hj":
                a = 0.8465;
                b = 75;
                c = 1.42;
                cm = score*100;
                return this.calculateField(cm,a,b,c);
            case "hurdles":
                a = 20.5173;
                b = 15.5;
                c = 1.92;
                return this.calculateRunning(score,a,b,c);
            case "pv":
                a = 0.2797;
                b = 100;
                c = 1.35;
                cm = score*100;
                return this.calculateField(cm,a,b,c);
            case "thousand":
                a = 0.08713;
                b = 305.5;
                c = 1.85;
                seconds = this.getSeconds(score);
                return this.calculateRunning(seconds,a,b,c);
        }
    }

    getSeconds(score): number {

        if(score) {
            if (score.length > 1) {
                let one = score.toString().split(':');
                let min = Number(one[0]);
                let sec = Number(one[1]);
                return min * 60 + sec;
            }
        }

    }

    calculateRunning(score,a,b,c) {
        return Math.floor(a*Math.pow(b-score, c));
    }

    calculateField(score,a,b,c) {
        return Math.floor(a*Math.pow(score-b,c));
    }


}
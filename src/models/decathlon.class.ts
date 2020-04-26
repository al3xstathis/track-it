import {IDecathlon} from "./decathlon.interface";

export class DecathlonClass implements IDecathlon{

  constructor() { }

  hundred="";
  lj="";
  sp="";
  hj="";
  four="";
  hurdles="";
  dt="";
  pv="";
  jt="";
  fifteen="";
  dayOneScore="";
  dayTwoScore="";
  totalScore="";


  eventScore(event: string, score: any): number {
    let a: number= 0;
    let b: number= 0;
    let c: number= 0;
    let cm: number= 0;
    let seconds: number= 0;
    switch(event){
            case "hundred":
                a = 25.4347;
                b = 18;
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
            case "four":
                a = 1.53775;
                b = 82;
                c = 1.81;
                return this.calculateRunning(score,a,b,c);
            case "hurdles":
                a = 5.74352;
                b = 28.5;
                c = 1.92;
                return this.calculateRunning(score,a,b,c);
            case "dt":
                a = 12.91;
                b = 4;
                c = 1.10;
                return this.calculateField(score,a,b,c);
            case "pv":
                a = 0.2797;
                b = 100;
                c = 1.35;
                cm = score*100;
                return this.calculateField(cm,a,b,c);
            case "jt":
                a = 10.14;
                b = 7;
                c = 1.08;
                return this.calculateField(score,a,b,c);
            case "fifteen":
                a = 0.03768;
                b = 480;
                c = 1.85;
                seconds = this.getSeconds(score);
                return this.calculateRunning(seconds,a,b,c);
            }
        }



      getSeconds(score): number {
          if (score.length >= 1) {
          let one = score.toString().split(':');
          let min = Number(one[0]);
          let sec = Number(one[1]);
          console.log(min * 60 + sec);
          return min * 60 + sec;
      }
      }

      calculateRunning(score,a,b,c) {
              return Math.floor(a*Math.pow(b-score, c));
          }

      calculateField(score,a,b,c) {
              return Math.floor(a*Math.pow(score-b,c));
      }


}
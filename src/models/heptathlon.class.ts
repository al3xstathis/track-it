import {IHeptathlon} from './heptathlon.interface';

export class HeptathlonClass implements IHeptathlon {

    constructor() {
    }

    hurdles = '';
    hj = '';
    sp = '';
    two = '';
    lj = '';
    jt = '';
    eight = '';
    dayOneScore = '';
    dayTwoScore = '';
    totalScore = '';
    title = '';
    id = '';

    eventScore(event: string, score: any): number {
        let a = 0;
        let b = 0;
        let c = 0;
        let cm = 0;
        let seconds = 0;
        switch (event) {
            case 'lj':
                a = 0.188807;
                b = 210;
                c = 1.41;
                cm = score * 100;
                return this.calculateField(cm, a, b, c);
            case 'sp':
                a = 56.0211;
                b = 1.5;
                c = 1.05;
                return this.calculateField(score, a, b, c);
            case 'hj':
                a = 1.84523;
                b = 75;
                c = 1.348;
                cm = score * 100;
                return this.calculateField(cm, a, b, c);
            case 'two':
                a = 4.99087;
                b = 42.5;
                c = 1.81;
                return this.calculateRunning(score, a, b, c);
            case 'hurdles':
                a = 9.23076;
                b = 26.7;
                c = 1.835;
                return this.calculateRunning(score, a, b, c);
            case 'jt':
                a = 15.9803;
                b = 3.8;
                c = 1.04;
                return this.calculateField(score, a, b, c);
            case 'eight':
                a = 0.11193;
                b = 254;
                c = 1.88;
                seconds = this.getSeconds(score);
                return this.calculateRunning(seconds, a, b, c);
        }
    }

    getSeconds(score): number {
        if (score) {
            if (score.length >= 1) {
                const one = score.toString().split(':');
                const min = Number(one[0]);
                const sec = Number(one[1]);
                return min * 60 + sec;
            }
        }
    }

    calculateRunning(score, a, b, c) {
        return Math.floor(a * Math.pow(b - score, c));
    }

    calculateField(score, a, b, c) {
        return Math.floor(a * Math.pow(score - b, c));
    }
}

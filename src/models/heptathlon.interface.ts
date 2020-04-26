export interface IHeptathlon {
    hurdles: string;
    hj: string;
    sp: string;
    two: string;
    lj: string;
    jt: string;
    eight: string;
    dayOneScore: string;
    dayTwoScore: string;
    totalScore: string;


    calculateRunning(score,a,b,c);
    calculateField(score,a,b,c);
    eventScore(event,score);
    getSeconds: (number) =>number;
}
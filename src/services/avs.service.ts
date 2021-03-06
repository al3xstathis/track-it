import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Platform} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';

@Injectable({
    providedIn: 'root'
})
export class AvsService {

    constructor(private http: HttpClient,
                private plt: Platform,
                private httpNative: HTTP) {

    }

    public static postReturnSplit: string[] = [];

    url = 'https://avs-sport.com/scoring/getIAAFScoreRequest.php';
    public postReturn = '';

    async getScore(sexe: string, season: string, perf: string, event: string, type: string,
                   compare: string, age: string) {


        const form = new FormData();
        form.append('event', event);
        form.append('sexe', sexe);
        form.append('perf', perf);
        form.append('season', season);
        form.append('type', type);
        form.append('compare', compare);
        form.append('age', age);

        if (this.plt.is('cordova')) {
            console.log('native get');
            await this.httpNative.post(this.url,
                {event, sexe: sexe, perf: perf, season: season, type: type, compare: compare, age: age},
                {responseType: 'text'})
                .then(res => {
                    this.postReturn = res.data;
                    AvsService.postReturnSplit = this.postReturn.split(';');
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
        } else {
            console.log('web/PWA get');
            await this.http.post(this.url, form, {responseType: 'text'}).subscribe(res => {
                this.postReturn = res;
                AvsService.postReturnSplit = this.postReturn.split(';');
            });
        }
    }

    async compareScore(sexe: string, season: string, perf: string, event: string, type: string,
                       compare: string, points: string, age: string) {


        const form = new FormData();
        form.append('event', event);
        form.append('sexe', sexe);
        form.append('perf', perf);
        form.append('season', season);
        form.append('type', type);
        form.append('compare', compare);
        form.append('points', points);
        form.append('age', age);
        console.log(form);

        if (this.plt.is('cordova')) {
            console.log('native compare');
            this.httpNative.setDataSerializer('urlencoded');
            await this.httpNative.post(this.url,
                {
                    event: event,
                    sexe: sexe,
                    perf: perf,
                    season: season,
                    type: type,
                    compare: compare,
                    points: points,
                    age: age
                },
                {responseType: 'text'})
                .then(res => {
                    this.postReturn = res.data;
                    AvsService.postReturnSplit = this.postReturn.split(';');
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                });
        } else {
            console.log('web/PWA compare');
            await this.http.post(this.url, form, {responseType: 'text'}).subscribe(res => {
                this.postReturn = res;
                AvsService.postReturnSplit = this.postReturn.split(';');
            });
        }
    }
}

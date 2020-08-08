import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AvsService {

  url= 'https://avs-sport.com/scoring/getIAAFScoreRequest.php';
  public postReturn: string = "";
  public static postReturnSplit: string[] = [];

  constructor(private http: HttpClient) {

  }

  async getScore(sexe: string, season:string, perf: string, event: string, type: string, compare: string) {


    const form = new FormData;
    form.append('event',event);
    form.append('sexe', sexe);
    form.append('perf', perf);
    form.append('season', season);
    form.append('type', type);
    form.append('compare', compare);

    await this.http.post(this.url, form, {responseType: "text"}).subscribe(res => {
      this.postReturn = res;
      AvsService.postReturnSplit = this.postReturn.split(';');
    })

  }

  async compareScore(sexe: string, season:string, perf: string, event: string, type: string, compare: string, points: string) {


    const form = new FormData;
    form.append('event',event);
    form.append('sexe', sexe);
    form.append('perf', perf);
    form.append('season', season);
    form.append('type', type);
    form.append('compare', compare);
    form.append('points', points)

    await this.http.post(this.url, form, {responseType: "text"}).subscribe(res => {
      this.postReturn = res;
      AvsService.postReturnSplit = this.postReturn.split(';');
    })
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  static mDecValues: any;
  static fHepValues: any;
  static mHepValues: any;
  static fPentValues: any;

  constructor() { }

  static setDecContent(value) {
    ContentService.mDecValues = value;
  }
  static setHepContent(value) {
    ContentService.fHepValues = value;
  }
  static setMHepContent(value) {
    ContentService.mHepValues = value;
  }
  static setFPentContent(value) {
    ContentService.fPentValues = value;
  }

}

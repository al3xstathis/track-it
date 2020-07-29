import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-iaaf',
  templateUrl: './iaaf.page.html',
  styleUrls: ['./iaaf.page.scss'],
})
export class IaafPage implements OnInit {

  //default
  public sexe : number = 2;
  //default
  public season : string = 'outdoor';
  public numbers: number[];
  public selectedEvent: string;
  public result: string;
  public menEventsOutdoor: any = [
    {
      name: "100m",
      value: "100m"
    },
    {
      name: "110mh",
      value: "110mh"
    },
    {
      name: "200m",
      value: "200m"
    },
    {
      name: "300m",
      value: "300m"
    },
    {
      name: "4x100m Relay",
      value: "4x100m"
    },
    {
      name: "400m",
      value: "400m"
    },
    {
      name: "400mh",
      value: "400m"
    },
    {
      name: "600m",
      value: "600m"
    },
    {
      name: "800m",
      value: "800m"
    },
    {
      name: "1000m",
      value: "1000m"
    },
    {
      name: "1500m",
      value: "1500m"
    },
    {
      name: "4x400m Relay",
      value: "4x400m"
    },
    {
      name: "Mile",
      value: "mile"
    },
    {
      name: "2000m",
      value: "2000m"
    },
    {
      name: "2000m SC",
      value: "2000m sc"
    },
    {
      name: "3000m",
      value: "3000m"
    },
    {
      name: "3000m RW",
      value: "3000m rw"
    },
    {
      name: "3000m SC",
      value: "3000sc"
    },
    {
      name: "5000m",
      value: "5000m"
    },
    {
      name: "5000m RW",
      value: "5000m rw"
    },
    {
      name: "10000m",
      value: "10000m"
    },
    {
      name: "10000m RW",
      value: "10000m rw"
    },
    {
      name: "10km Road",
      value: "10km road"
    },
    {
      name: "15km Road",
      value: "15km road"
    },
    {
      name: "20km Walk",
      value: "20km walk"
    },
    {
      name: "20km Road",
      value: "20km road"
    },
    {
      name: "Half Marathon",
      value: "halfMarathon"
    },
    {
      name: "Marathon",
      value: "marathon"
    },
    {
      name: "50km Walk",
      value: "50km walk"
    },
    {
      name: "Long Jump",
      value: "lj"
    },
    {
      name: "High Jump",
      value: "hj"
    },
    {
      name: "Triple Jump",
      value: "tj"
    },
    {
      name: "Pole Vault",
      value: "pv"
    },
    {
      name: "Shot Put",
      value: "sp"
    },
    {
      name: "Discus Throw",
      value: "dt"
    },
    {
      name: "Javelin Throw",
      value: "jt"
    },
    {
      name: "Hammer Throw",
      value: "ht"
    },
    {
      name: "Decathlon",
      value: "dec"
    }
  ]
  public menEventsIndoor: any = [
    {
      name: "60m",
      value: "60m"
    },
    {
      name: "200m",
      value: "200m"
    },
    {
      name: "300m",
      value: "300m"
    },
    {
      name: "400m",
      value: "400m"
    },
    {
      name: "500m",
      value: "500m"
    },
    {
      name: "600m",
      value: "600m"
    },
    {
      name: "4x200m Relay",
      value: "4x200m"
    },
    {
      name: "800m",
      value: "800m"
    },
    {
      name: "1000m",
      value: "1000m"
    },
    {
      name: "1500m",
      value: "1500m"
    },
    {
      name: "4x400m Relay",
      value: "4x400m"
    },
    {
      name: "Mile",
      value: "mile"
    },
    {
      name: "2000m",
      value: "2000m"
    },
    {
      name: "3000m",
      value: "3000m"
    },
    {
      name: "5000m",
      value: "5000m"
    },
    {
      name: "60mh",
      value: "60mh"
    },
    {
      name: "Long Jump",
      value: "lj"
    },
    {
      name: "High Jump",
      value: "hj"
    },
    {
      name: "Triple Jump",
      value: "tj"
    },
    {
      name: "Pole Vault",
      value: "pv"
    },
    {
      name: "Shot Put",
      value: "sp"
    },
    {
      name: "Heptathlon",
      value: "hep"
    }
  ]
  public womenEventsOutdoor: any = [
    {
      name: "100m",
      value: "100m"
    },
    {
      name: "100mh",
      value: "100mh"
    },
    {
      name: "200m",
      value: "200m"
    },
    {
      name: "300m",
      value: "300m"
    },
    {
      name: "4x100m Relay",
      value: "4x100m"
    },
    {
      name: "400m",
      value: "400m"
    },
    {
      name: "400mh",
      value: "400m"
    },
    {
      name: "600m",
      value: "600m"
    },
    {
      name: "800m",
      value: "800m"
    },
    {
      name: "1000m",
      value: "1000m"
    },
    {
      name: "1500m",
      value: "1500m"
    },
    {
      name: "4x400m Relay",
      value: "4x400m"
    },
    {
      name: "Mile",
      value: "mile"
    },
    {
      name: "2000m",
      value: "2000m"
    },
    {
      name: "2000m SC",
      value: "2000m sc"
    },
    {
      name: "3000m",
      value: "3000m"
    },
    {
      name: "3000m RW",
      value: "3000m rw"
    },
    {
      name: "3000m SC",
      value: "3000sc"
    },
    {
      name: "5000m",
      value: "5000m"
    },
    {
      name: "5000m RW",
      value: "5000m rw"
    },
    {
      name: "10000m",
      value: "10000m"
    },
    {
      name: "10000m RW",
      value: "10000m rw"
    },
    {
      name: "10km Road",
      value: "10km road"
    },
    {
      name: "15km Road",
      value: "15km road"
    },
    {
      name: "20km Walk",
      value: "20km walk"
    },
    {
      name: "20km Road",
      value: "20km road"
    },
    {
      name: "Half Marathon",
      value: "halfMarathon"
    },
    {
      name: "Marathon",
      value: "marathon"
    },
    {
      name: "50km Walk",
      value: "50km walk"
    },
    {
      name: "Long Jump",
      value: "lj"
    },
    {
      name: "High Jump",
      value: "hj"
    },
    {
      name: "Triple Jump",
      value: "tj"
    },
    {
      name: "Pole Vault",
      value: "pv"
    },
    {
      name: "Shot Put",
      value: "sp"
    },
    {
      name: "Discus Throw",
      value: "dt"
    },
    {
      name: "Javelin Throw",
      value: "jt"
    },
    {
      name: "Hammer Throw",
      value: "ht"
    },
    {
      name: "Heptathlon",
      value: "hep"
    }
  ]
  public womenEventsIndoor: any = [
    {
      name: "60m",
      value: "60m"
    },
    {
      name: "200m",
      value: "200m"
    },
    {
      name: "300m",
      value: "300m"
    },
    {
      name: "400m",
      value: "400m"
    },
    {
      name: "500m",
      value: "500m"
    },
    {
      name: "600m",
      value: "600m"
    },
    {
      name: "4x200m Relay",
      value: "4x200m"
    },
    {
      name: "800m",
      value: "800m"
    },
    {
      name: "1000m",
      value: "1000m"
    },
    {
      name: "1500m",
      value: "1500m"
    },
    {
      name: "4x400m Relay",
      value: "4x400m"
    },
    {
      name: "Mile",
      value: "mile"
    },
    {
      name: "2000m",
      value: "2000m"
    },
    {
      name: "3000m",
      value: "3000m"
    },
    {
      name: "5000m",
      value: "5000m"
    },
    {
      name: "60mh",
      value: "60mh"
    },
    {
      name: "Long Jump",
      value: "lj"
    },
    {
      name: "High Jump",
      value: "hj"
    },
    {
      name: "Triple Jump",
      value: "tj"
    },
    {
      name: "Pole Vault",
      value: "pv"
    },
    {
      name: "Shot Put",
      value: "sp"
    },
    {
      name: "Pentathlon",
      value: "pent"
    }
  ]

  customAlertOptions: any = {
    header: 'Choose an event:',
    cssClass: 'alert'
  }

  constructor(private http: HttpClient) {
    this.numbers = [1];
  }


  addEvent() {
    this.numbers.push(this.numbers[this.numbers.length-1]+1);
    console.log(this.numbers.length);
  }

  compare() {

  }
  calculate() {
    console.log(this.sexe, this.season, this.selectedEvent, 1)
  }
  ngOnInit() {
  }

}

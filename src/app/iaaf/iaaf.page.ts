import { Component, OnInit } from '@angular/core';
import {AvsService} from "../../services/avs.service";


@Component({
  selector: 'app-iaaf',
  templateUrl: './iaaf.page.html',
  styleUrls: ['./iaaf.page.scss'],
})
export class IaafPage implements OnInit {

  //default men
  public sexe : number = 2;
  //default outdoor
  public season : string = 'Outdoor';
  public numbers: number[];
  public selectedEvent: number = 0;
  public perf: string = "";
  public score: string = "";

  public menEventsOutdoor: any = [
    {
      name: "100m",
      value: 7
    },
    {
      name: "110mh",
      value: 18
    },
    {
      name: "200m",
      value: 9
    },
    {
      name: "300m",
      value: 10
    },
    {
      name: "4x100m Relay",
      value: 64
    },
    {
      name: "400m",
      value: 11
    },
    {
      name: "400mh",
      value: 22
    },
    {
      name: "600m",
      value: 23
    },
    {
      name: "800m",
      value: 24
    },
    {
      name: "1000m",
      value: 25
    },
    {
      name: "1500m",
      value: 27
    },
    {
      name: "4x400m Relay",
      value: 66
    },
    {
      name: "Mile",
      value: 28
    },
    {
      name: "2000m",
      value: 29
    },
    {
      name: "2000m SC",
      value: 37
    },
    {
      name: "3000m",
      value: 30
    },
    {
      name: "3000m RW",
      value: 56
    },
    {
      name: "3000m SC",
      value: 38
    },
    {
      name: "5000m",
      value: 39
    },
    {
      name: "5000m RW",
      value: 57
    },
    {
      name: "10000m",
      value: 40
    },
    {
      name: "10000m RW",
      value: 121
    },
    {
      name: "10km Road",
      value: 45
    },
    {
      name: "15km Road",
      value: 47
    },
    {
      name: "20km Walk",
      value: 59
    },
    {
      name: "20km Road",
      value: 48
    },
    {
      name: "Half Marathon",
      value: 49
    },
    {
      name: "Marathon",
      value: 50
    },
    {
      name: "50km Walk",
      value: 60
    },
    {
      name: "Long Jump",
      value: 77
    },
    {
      name: "High Jump",
      value: 78
    },
    {
      name: "Triple Jump",
      value: 79
    },
    {
      name: "Pole Vault",
      value: 80
    },
    {
      name: "Shot Put",
      value: 81
    },
    {
      name: "Discus Throw",
      value: 82
    },
    {
      name: "Javelin Throw",
      value: 83
    },
    {
      name: "Hammer Throw",
      value: 84
    },
    {
      name: "Decathlon",
      value: 94
    }
  ]
  public menEventsIndoor: any = [
    {
      name: "60m",
      value: 5
    },
    {
      name: "200m",
      value: 9
    },
    {
      name: "300m",
      value: 10
    },
    {
      name: "400m",
      value: 11
    },
    {
      name: "500m",
      value: 119
    },
    {
      name: "600m",
      value: 23
    },
    {
      name: "4x200m Relay",
      value: 65
    },
    {
      name: "800m",
      value: 24
    },
    {
      name: "1000m",
      value: 25
    },
    {
      name: "1500m",
      value: 27
    },
    {
      name: "4x400m Relay",
      value: 66
    },
    {
      name: "Mile",
      value: 28
    },
    {
      name: "2000m",
      value: 29
    },
    {
      name: "3000m",
      value: 30
    },
    {
      name: "5000m",
      value: 39
    },
    {
      name: "60mh",
      value: 15
    },
    {
      name: "Long Jump",
      value: 77
    },
    {
      name: "High Jump",
      value: 78
    },
    {
      name: "Triple Jump",
      value: 79
    },
    {
      name: "Pole Vault",
      value: 80
    },
    {
      name: "Shot Put",
      value: 81
    },
    {
      name: "Heptathlon",
      value: 92
    }
  ]
  public womenEventsOutdoor: any = [
    {
      name: "100m",
      value: 7
    },
    {
      name: "100mh",
      value: 17
    },
    {
      name: "200m",
      value: 9
    },
    {
      name: "300m",
      value: 10
    },
    {
      name: "4x100m Relay",
      value: 64
    },
    {
      name: "400m",
      value: 11
    },
    {
      name: "400mh",
      value: 22
    },
    {
      name: "600m",
      value: 23
    },
    {
      name: "800m",
      value: 24
    },
    {
      name: "1000m",
      value: 25
    },
    {
      name: "1500m",
      value: 27
    },
    {
      name: "4x400m Relay",
      value: 66
    },
    {
      name: "Mile",
      value: 28
    },
    {
      name: "2000m",
      value: 29
    },
    {
      name: "2000m SC",
      value: 37
    },
    {
      name: "3000m",
      value: 30
    },
    {
      name: "3000m RW",
      value: 56
    },
    {
      name: "3000m SC",
      value: 38
    },
    {
      name: "5000m",
      value: 39
    },
    {
      name: "5000m RW",
      value: 57
    },
    {
      name: "10000m",
      value: 40
    },
    {
      name: "10000m RW",
      value: 121
    },
    {
      name: "10km Road",
      value: 45
    },
    {
      name: "15km Road",
      value: 47
    },
    {
      name: "20km Walk",
      value: 59
    },
    {
      name: "20km Road",
      value: 48
    },
    {
      name: "Half Marathon",
      value: 49
    },
    {
      name: "Marathon",
      value: 50
    },
    {
      name: "50km Walk",
      value: 60
    },
    {
      name: "Long Jump",
      value: 77
    },
    {
      name: "High Jump",
      value: 78
    },
    {
      name: "Triple Jump",
      value: 79
    },
    {
      name: "Pole Vault",
      value: 80
    },
    {
      name: "Shot Put",
      value: 81
    },
    {
      name: "Discus Throw",
      value: 82
    },
    {
      name: "Javelin Throw",
      value: 83
    },
    {
      name: "Hammer Throw",
      value: 84
    },
    {
      name: "Heptathlon",
      value: 92
    }
  ]
  public womenEventsIndoor: any = [
    {
      name: "60m",
      value: 5
    },
    {
      name: "200m",
      value: 9
    },
    {
      name: "300m",
      value: 10
    },
    {
      name: "400m",
      value: 11
    },
    {
      name: "500m",
      value: 119
    },
    {
      name: "600m",
      value: 23
    },
    {
      name: "4x200m Relay",
      value: 65
    },
    {
      name: "800m",
      value: 24
    },
    {
      name: "1000m",
      value: 25
    },
    {
      name: "1500m",
      value: 27
    },
    {
      name: "4x400m Relay",
      value: 66
    },
    {
      name: "Mile",
      value: 28
    },
    {
      name: "2000m",
      value: 29
    },
    {
      name: "3000m",
      value: 30
    },
    {
      name: "5000m",
      value: 39
    },
    {
      name: "60mh",
      value: 15
    },
    {
      name: "Long Jump",
      value: 77
    },
    {
      name: "High Jump",
      value: 78
    },
    {
      name: "Triple Jump",
      value: 79
    },
    {
      name: "Pole Vault",
      value: 80
    },
    {
      name: "Shot Put",
      value: 81
    },
    {
      name: "Pentathlon",
      value: 90
    }
  ]
  public return: string[];


  customAlertOptions: any = {
    header: 'Choose an event:',
    cssClass: 'alert'
  }

  constructor(private avs: AvsService) {
    this.numbers = [1];

  }




  addEvent() {
    this.numbers.push(this.numbers[this.numbers.length-1]+1);
  }

  compare() {

  }
  async getScore(type:number) {
    await this.avs.getScore(this.sexe.toString(),this.season,this.perf,this.selectedEvent.toString(), type.toString(), '1-64-1-Outdoor');

    setTimeout(a => {
      this.parseScore();
    }, 500);

  }
  parseScore() {
    for (let i = 0; i < AvsService.postReturnSplit.length; i++) {
      this.score = AvsService.postReturnSplit[0];
      console.log(AvsService.postReturnSplit[i]);
    }
  }

  ngOnInit() {
  }

}

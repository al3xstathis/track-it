import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iaaf',
  templateUrl: './iaaf.page.html',
  styleUrls: ['./iaaf.page.scss'],
})
export class IaafPage implements OnInit {

  men : boolean;
  total: number;
  public selectedEvents: any[];
  public menEvents: any = [
    {
      name: "60m (i)"
    },
    {
      name: "100m"
    },
    {
      name: "200m"
    },
    {
      name: "400m"
    },
    {
      name: "800m"
    },
    {
      name: "1000m (i)"
    },
    {
      name: "1500m"
    },
    {
      name: "Mile"
    },
    {
      name: "3000m"
    },
    {
      name: "5000m"
    },
    {
      name: "10000m"
    },
    {
      name: "60mh (i)"
    },
    {
      name: "110mh"
    },
    {
      name: "400mh"
    },
    {
      name: "3000m SC"
    },
    {
      name: "Long Jump"
    },
    {
      name: "High Jump"
    },
    {
      name: "Triple Jump"
    },
    {
      name: "Pole Vault"
    },
    {
      name: "Shot Put"
    },
    {
      name: "Discus Throw"
    },
    {
      name: "Javelin Throw"
    },
    {
      name: "Hammer Throw"
    },
    {
      name: "Heptathlon (i)"
    },
    {
      name: "Decathlon"
    }
  ]
  customAlertOptions: any = {
    header: 'Choose an event:',
    cssClass: 'alert'
  }

  constructor() { }


  addEvent() {

  }

  ngOnInit() {
  }

}

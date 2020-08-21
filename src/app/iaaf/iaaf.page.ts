import {Component, OnInit} from '@angular/core';
import {AvsService} from '../../services/avs.service';
import {AlertController} from '@ionic/angular';


@Component({
    selector: 'app-iaaf',
    templateUrl: './iaaf.page.html',
    styleUrls: ['./iaaf.page.scss'],
})
export class IaafPage implements OnInit {

    // default men
    public sexe = 2;
    // default outdoor
    public season = 'Outdoor';
    public numbers: number[];
    public selectedEvent = 0;
    public perf = '';
    public score = '';

    public menEventsOutdoor: any = [
        {
            name: '100m',
            value: 7
        },
        {
            name: '110mh',
            value: 18
        },
        {
            name: '200m',
            value: 9
        },
        {
            name: '300m',
            value: 10
        },
        {
            name: '4x100m Relay',
            value: 64
        },
        {
            name: '400m',
            value: 11
        },
        {
            name: '400mh',
            value: 22
        },
        {
            name: '600m',
            value: 23
        },
        {
            name: '800m',
            value: 24
        },
        {
            name: '1000m',
            value: 25
        },
        {
            name: '1500m',
            value: 27
        },
        {
            name: '4x400m Relay',
            value: 66
        },
        {
            name: 'Mile',
            value: 28
        },
        {
            name: '2000m',
            value: 29
        },
        {
            name: '2000m SC',
            value: 37
        },
        {
            name: '3000m',
            value: 30
        },
        {
            name: '3000m RW',
            value: 56
        },
        {
            name: '3000m SC',
            value: 38
        },
        {
            name: '5000m',
            value: 39
        },
        {
            name: '5000m RW',
            value: 57
        },
        {
            name: '10000m',
            value: 40
        },
        {
            name: '10000m RW',
            value: 121
        },
        {
            name: '10km Road',
            value: 45
        },
        {
            name: '15km Road',
            value: 47
        },
        {
            name: '20km Walk',
            value: 59
        },
        {
            name: '20km Road',
            value: 48
        },
        {
            name: 'Half Marathon',
            value: 49
        },
        {
            name: 'Marathon',
            value: 50
        },
        {
            name: '50km Walk',
            value: 60
        },
        {
            name: 'Long Jump',
            value: 77
        },
        {
            name: 'High Jump',
            value: 78
        },
        {
            name: 'Triple Jump',
            value: 79
        },
        {
            name: 'Pole Vault',
            value: 80
        },
        {
            name: 'Shot Put',
            value: 81
        },
        {
            name: 'Discus Throw',
            value: 82
        },
        {
            name: 'Javelin Throw',
            value: 83
        },
        {
            name: 'Hammer Throw',
            value: 84
        },
        {
            name: 'Decathlon',
            value: 94
        }
    ];
    public menEventsIndoor: any = [
        {
            name: '60m',
            value: 5
        },
        {
            name: '200m',
            value: 9
        },
        {
            name: '300m',
            value: 10
        },
        {
            name: '400m',
            value: 11
        },
        {
            name: '500m',
            value: 119
        },
        {
            name: '600m',
            value: 23
        },
        {
            name: '4x200m Relay',
            value: 65
        },
        {
            name: '800m',
            value: 24
        },
        {
            name: '1000m',
            value: 25
        },
        {
            name: '1500m',
            value: 27
        },
        {
            name: '4x400m Relay',
            value: 66
        },
        {
            name: 'Mile',
            value: 28
        },
        {
            name: '2000m',
            value: 29
        },
        {
            name: '3000m',
            value: 30
        },
        {
            name: '5000m',
            value: 39
        },
        {
            name: '60mh',
            value: 15
        },
        {
            name: 'Long Jump',
            value: 77
        },
        {
            name: 'High Jump',
            value: 78
        },
        {
            name: 'Triple Jump',
            value: 79
        },
        {
            name: 'Pole Vault',
            value: 80
        },
        {
            name: 'Shot Put',
            value: 81
        },
        {
            name: 'Heptathlon',
            value: 92
        }
    ];
    public womenEventsOutdoor: any = [
        {
            name: '100m',
            value: 7
        },
        {
            name: '100mh',
            value: 17
        },
        {
            name: '200m',
            value: 9
        },
        {
            name: '300m',
            value: 10
        },
        {
            name: '4x100m Relay',
            value: 64
        },
        {
            name: '400m',
            value: 11
        },
        {
            name: '400mh',
            value: 22
        },
        {
            name: '600m',
            value: 23
        },
        {
            name: '800m',
            value: 24
        },
        {
            name: '1000m',
            value: 25
        },
        {
            name: '1500m',
            value: 27
        },
        {
            name: '4x400m Relay',
            value: 66
        },
        {
            name: 'Mile',
            value: 28
        },
        {
            name: '2000m',
            value: 29
        },
        {
            name: '2000m SC',
            value: 37
        },
        {
            name: '3000m',
            value: 30
        },
        {
            name: '3000m RW',
            value: 56
        },
        {
            name: '3000m SC',
            value: 38
        },
        {
            name: '5000m',
            value: 39
        },
        {
            name: '5000m RW',
            value: 57
        },
        {
            name: '10000m',
            value: 40
        },
        {
            name: '10000m RW',
            value: 121
        },
        {
            name: '10km Road',
            value: 45
        },
        {
            name: '15km Road',
            value: 47
        },
        {
            name: '20km Walk',
            value: 59
        },
        {
            name: '20km Road',
            value: 48
        },
        {
            name: 'Half Marathon',
            value: 49
        },
        {
            name: 'Marathon',
            value: 50
        },
        {
            name: '50km Walk',
            value: 60
        },
        {
            name: 'Long Jump',
            value: 77
        },
        {
            name: 'High Jump',
            value: 78
        },
        {
            name: 'Triple Jump',
            value: 79
        },
        {
            name: 'Pole Vault',
            value: 80
        },
        {
            name: 'Shot Put',
            value: 81
        },
        {
            name: 'Discus Throw',
            value: 82
        },
        {
            name: 'Javelin Throw',
            value: 83
        },
        {
            name: 'Hammer Throw',
            value: 84
        },
        {
            name: 'Heptathlon',
            value: 92
        }
    ];
    public womenEventsIndoor: any = [
        {
            name: '60m',
            value: 5
        },
        {
            name: '200m',
            value: 9
        },
        {
            name: '300m',
            value: 10
        },
        {
            name: '400m',
            value: 11
        },
        {
            name: '500m',
            value: 119
        },
        {
            name: '600m',
            value: 23
        },
        {
            name: '4x200m Relay',
            value: 65
        },
        {
            name: '800m',
            value: 24
        },
        {
            name: '1000m',
            value: 25
        },
        {
            name: '1500m',
            value: 27
        },
        {
            name: '4x400m Relay',
            value: 66
        },
        {
            name: 'Mile',
            value: 28
        },
        {
            name: '2000m',
            value: 29
        },
        {
            name: '3000m',
            value: 30
        },
        {
            name: '5000m',
            value: 39
        },
        {
            name: '60mh',
            value: 15
        },
        {
            name: 'Long Jump',
            value: 77
        },
        {
            name: 'High Jump',
            value: 78
        },
        {
            name: 'Triple Jump',
            value: 79
        },
        {
            name: 'Pole Vault',
            value: 80
        },
        {
            name: 'Shot Put',
            value: 81
        },
        {
            name: 'Pentathlon',
            value: 90
        }
    ];
    public return: string[];
    public comparedEvents: { sexe: number, season: string, event: number, perf: string }[] = [
        {sexe: 2, season: 'Outdoor', event: 0, perf: ''},
        {sexe: 2, season: 'Outdoor', event: 0, perf: ''},
        {sexe: 2, season: 'Outdoor', event: 0, perf: ''}
    ];

    customAlertOptions: any = {
        header: 'Choose an event:',
        cssClass: 'alert'
    };

    constructor(private avs: AvsService,
                private alertCtrl: AlertController) {
        this.numbers = [1];

    }

    comparedToString(): string {
        return ('1-' + this.comparedEvents[0].event + '-' + this.comparedEvents[0].sexe + '-' + this.comparedEvents[0].season + ';' +
            '2-' + this.comparedEvents[1].event + '-' + this.comparedEvents[1].sexe + '-' + this.comparedEvents[1].season + ';' +
            '3-' + this.comparedEvents[2].event + '-' + this.comparedEvents[2].sexe + '-' + this.comparedEvents[2].season).toString();
    }

    async presentPrompt() {
        const alert = await this.alertCtrl.create({
            header: 'Information about IAAF Calculator',
            message: 'This is a calculator that uses the IAAF scoring tables to compare events.<br>' +
                'Select a sex, season, the event in question, input ' +
                'your performance and click Calculate to obtain an IAAF score.<br>' +
                'After this, choose up to 3 different events you would like to compare this performance ' +
                'to and hit Compare to see an equivalent performance in those events.<br>',
            cssClass: 'alert',

            buttons: [
                {
                    text: 'Close',
                    role: 'cancel'
                }],
        });

        await alert.present();
    }


    async getScore(type: number) {
        if (type === 1) {
            await this.avs.getScore(this.sexe.toString(), this.season, this.perf, this.selectedEvent.toString(),
                type.toString(), this.comparedToString());
            setTimeout(a => {
                this.parseScore();
            }, 500);
        }
        if (type === 2) {
            await this.avs.compareScore(this.sexe.toString(), this.season, this.perf, this.selectedEvent.toString(),
                type.toString(), this.comparedToString(), this.score);
            setTimeout(a => {
                this.parseCompare();
            }, 500);
        }


    }

    parseScore() {
        for (let i = 0; i < AvsService.postReturnSplit.length; i++) {
            this.score = AvsService.postReturnSplit[0];
            console.log(AvsService.postReturnSplit[i]);
        }
    }

    parseCompare() {
        for (let i = 0; i < AvsService.postReturnSplit.length - 1; i++) {
            const split = AvsService.postReturnSplit[i + 1].split('-');
            if (split[1] !== 'N/A') {
                this.comparedEvents[i].perf = split[1];
            }
            console.log(split);
        }
    }

    ngOnInit() {
    }

}

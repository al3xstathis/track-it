import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MHeptathlonPage } from './m-heptathlon.page';

describe('MHeptathlonPage', () => {
  let component: MHeptathlonPage;
  let fixture: ComponentFixture<MHeptathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MHeptathlonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MHeptathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

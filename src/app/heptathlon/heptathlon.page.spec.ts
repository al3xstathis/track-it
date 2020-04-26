import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeptathlonPage } from './heptathlon.page';

describe('HeptathlonPage', () => {
  let component: HeptathlonPage;
  let fixture: ComponentFixture<HeptathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeptathlonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeptathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

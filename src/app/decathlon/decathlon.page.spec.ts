import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecathlonPage } from './decathlon.page';

describe('DecathlonPage', () => {
  let component: DecathlonPage;
  let fixture: ComponentFixture<DecathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecathlonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DecathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

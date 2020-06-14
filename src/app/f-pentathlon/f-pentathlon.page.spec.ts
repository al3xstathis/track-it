import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FPentathlonPage } from './f-pentathlon.page';

describe('FPentathlonPage', () => {
  let component: FPentathlonPage;
  let fixture: ComponentFixture<FPentathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FPentathlonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FPentathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

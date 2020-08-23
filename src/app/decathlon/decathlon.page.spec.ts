import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DecathlonPage } from './decathlon.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('DecathlonPage', () => {
  let component: DecathlonPage;
  let fixture: ComponentFixture<DecathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecathlonPage ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DecathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

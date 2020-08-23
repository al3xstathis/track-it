import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeptathlonPage } from './heptathlon.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('HeptathlonPage', () => {
  let component: HeptathlonPage;
  let fixture: ComponentFixture<HeptathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeptathlonPage ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeptathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

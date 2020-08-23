import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MHeptathlonPage } from './m-heptathlon.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('MHeptathlonPage', () => {
  let component: MHeptathlonPage;
  let fixture: ComponentFixture<MHeptathlonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MHeptathlonPage ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(MHeptathlonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

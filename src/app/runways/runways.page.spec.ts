import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RunwaysPage } from './runways.page';

describe('RunwaysPage', () => {
  let component: RunwaysPage;
  let fixture: ComponentFixture<RunwaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunwaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RunwaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

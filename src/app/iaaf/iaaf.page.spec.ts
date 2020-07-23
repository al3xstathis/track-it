import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IaafPage } from './iaaf.page';

describe('IaafPage', () => {
  let component: IaafPage;
  let fixture: ComponentFixture<IaafPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaafPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IaafPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

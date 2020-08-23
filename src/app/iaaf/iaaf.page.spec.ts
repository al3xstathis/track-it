import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';


import { IaafPage } from './iaaf.page';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HTTP} from '@ionic-native/http';

describe('IaafPage', () => {
  let component: IaafPage;
  let fixture: ComponentFixture<IaafPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IaafPage ],
      imports: [
          IonicModule.forRoot(),
          HttpClientModule,
          HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
          HttpClient,
          HTTP
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IaafPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

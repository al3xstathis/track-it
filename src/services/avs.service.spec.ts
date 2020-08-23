import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { AvsService } from './avs.service';
import {HTTP} from '@ionic-native/http';

describe('AvsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [AvsService, HTTP]
  }));

  it('should be created', () => {
    const service: AvsService = TestBed.get(AvsService);
    expect(service).toBeTruthy();
  });
});

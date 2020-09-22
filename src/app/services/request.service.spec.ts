import { TestBed } from '@angular/core/testing';
import { RequestService } from './request.service';

// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('RequestService', () => {
  let service: RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
  const testData = {
    'name': 'lebron',
    'email': 'lebron@airwallex.com'
  }
  const testResponse = 'registered';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  /// Tests begin ///
  it('can test HttpClient.post', ()=>{
    //Make an Http POST request
    httpClient.post(testUrl, testData).subscribe(message=>expect(message).toEqual(testResponse));

    const req  = httpTestingController.expectOne('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth');

    expect(req.request.method).toEqual('POST');
    req.flush(testResponse);
    httpTestingController.verify();
  });
});

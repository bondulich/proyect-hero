import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { NotificationService } from './notification.service';
import { Hero } from '../interfaces/hero';
import { environment } from '../../environments/environment';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, NotificationService]
    });
    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get heroes from API', () => {
    const mockHeroes: Hero[] = [{ id: 1, name: 'Hero 1' }, { id: 2, name: 'Hero 2' }];

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

});

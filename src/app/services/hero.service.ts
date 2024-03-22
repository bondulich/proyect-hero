import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { NotificationService } from './notification.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  updateHero(hero: Hero): Observable<unknown> {
    this.notificationService.showSnackBar('Updated hero', 'Accept');
    return this.http.put(this.heroesUrl, hero, this.httpOptions);
  }

  addHero(hero: Hero): Observable<Hero> {
    this.notificationService.showSnackBar('Added hero', 'Accept');
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
  }

  deleteHero(id: number): Observable<Hero> {
    this.notificationService.showSnackBar('Deleted hero', 'Accept');
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, {...this.httpOptions})
  }

  searchHeroes(text: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${text}`).pipe(
      tap(x => x.length ?
         console.log(`found heroes matching "${text}"`) :
         console.log(`no heroes matching "${text}"`))
    );
  }
}

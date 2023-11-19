import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ObrasResponse } from '../interface/obras.interface';
import { AuthorResponse } from '../interface/autores.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private apiUrl = 'https://poetrydb.org';
  private favoriteWorks: ObrasResponse[] = [];
  private favoriteWorksSubject: BehaviorSubject<ObrasResponse[]> =
    new BehaviorSubject<ObrasResponse[]>([]);

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<AuthorResponse> {
    const endpoint = `${this.apiUrl}/author`;
    return this.http.get<AuthorResponse>(endpoint);
  }

  getWorksByAuthor(author: string): Observable<ObrasResponse[]> {
    const endpoint = `${this.apiUrl}/author/${author}`;
    return this.http.get<ObrasResponse[]>(endpoint);
  }

  getRandomWorks(): Observable<ObrasResponse[]> {
    const endpoint = `${this.apiUrl}/random/10/author,title.json`;
    return this.http.get<ObrasResponse[]>(endpoint);
  }

  getFavoriteWorks(): ObrasResponse[] {
    return this.favoriteWorks;
  }

  /**
   * La función "addFavoriteWork" agrega una obra a la lista de obras favoritas y notifica a los
   * suscriptores del cambio.
   */
  addFavoriteWork(obra: ObrasResponse): void {
    this.favoriteWorks.push(obra);
    this.favoriteWorksSubject.next(this.favoriteWorks);
  }

  /**
   * La función elimina una obra de la lista de obras favoritas.
   */
  removeFavoriteWork(obra: ObrasResponse): void {
    this.favoriteWorks = this.favoriteWorks.filter((fav) => fav !== obra);
    this.favoriteWorksSubject.next(this.favoriteWorks);
  }

  /**
   * La función devuelve un Observable que emite una matriz de objetos ObrasResponse que representan
   * obras favoritas.
   */
  getFavoriteWorksObservable(): Observable<ObrasResponse[]> {
    return this.favoriteWorksSubject.asObservable();
  }
}

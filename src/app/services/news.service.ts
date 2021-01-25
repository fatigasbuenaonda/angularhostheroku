import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class NewsService {

  id: number;
  url = 'http://localhost:3000/';
  head: any;




  constructor(private http: HttpClient, private authService: AuthService) {

  }


  getHttpOptions(): any {
    const TOKEN: string = this.authService.getToken();
    return{
      headers: new HttpHeaders({
        'access-token': TOKEN,
        'content-type': 'application/json'
      })
    };
  }


  getHttpOptImage(): any {
    const TOKEN: string = this.authService.getToken();
    return{
      headers: new HttpHeaders({
        'access-token': TOKEN,
        responseType: 'blob'
      })
    };
  }



  /* NEWS */

  getNews(): Promise<any> {
    return this.http.get<any[]>( this.url + 'news', this.getHttpOptions()).toPromise();
  }

  getNew(id: number): Promise<any> {
    return this.http.get<any[]>( this.url + 'news/' + id, this.getHttpOptions()).toPromise();
  }

  postNews(news): Promise<any> {
    return this.http.post(this.url + 'news', news, this.getHttpOptions()).toPromise();
  }

  putNews(id, news): Promise<any> {
    return this.http.put(this.url + 'news/' + id, news, this.getHttpOptions()).toPromise();
  }

  deleteNews(id: number): Promise<any> {
    return this.http.delete<any>(this.url + 'news/' + id, this.getHttpOptions()).toPromise();
  }

  /* INTERVIEWS */

  getInterviews(): Promise<any> {
    return this.http.get<any[]>( this.url + 'interviews', this.getHttpOptions()).toPromise();
  }

  getInterview(id: number): Promise<any> {
    return this.http.get<any[]>( this.url + 'interviews/' + id, this.getHttpOptions()).toPromise();
  }

  postInterviews(interviews): Promise<any> {
    return this.http.post(this.url + 'interviews', interviews, this.getHttpOptions()).toPromise();
  }

  putInterviews(id: number, interviews): Promise<any> {
    return this.http.put(this.url + 'interviews/' + id, interviews, this.getHttpOptions()).toPromise();
  }

  deleteInterviews(id: number): Promise<any> {
    return this.http.delete<any>(this.url + 'interviews/' + id, this.getHttpOptions()).toPromise();
  }

  /* USERS */

  getUsers(): Promise<any> {
    return this.http.get<any[]>( this.url + 'users', this.getHttpOptions()).toPromise();
  }

//// imagen

  postIm(im, tipo: number): Promise<any> {
    return this.http.post('http://localhost:3000/upload/' + tipo, im, this.getHttpOptImage()).toPromise();
  }


/*
  getInterviews(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/interviews');
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/users');
  }
 */

// FUNCION DE LUCAS PARA MAPEAR :-)
/*   public mapper(object: any[]): any[] {
    return object.map((element: any) => {
      return {
        id: element.id,
        inicio: element.horarioArranque,
        fin: element.horarioFinalizacion,
        intervalo: element.duracion.toString(),
        virtual: virtual,
        presencial: presencial
      };
    });
  } */

}

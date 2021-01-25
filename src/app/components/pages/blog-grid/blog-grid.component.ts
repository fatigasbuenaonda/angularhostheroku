import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import { Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.css']
})
export class BlogGridComponent implements OnInit {

  public news: any;
  public interviews: any;
  // public ubicacionImagenesNews = 'C:/Proyectos/SN para todos/Frontend/SN_Front/Angular Template/src/assets/img/news/';
  // public ubicacionImagenesInterviews = 'C:/Proyectos/SN para todos/Frontend/SN_Front/Angular Template/src/assets/img/interviews/';
  // public linkFotoNews = 'assets/img/blog/gatito.jpg';
  public linkFotoNews = 'assets/img/news/';
  public linkFotoInterviews = 'assets/img/interviews/';
  public tipoNews = 0;
  public tipoInterviews = 1;




  constructor(private newsService: NewsService, private _sanitizer: DomSanitizer) { }

  public async ngOnInit(): Promise<void> {
    await this.getAllNews();
    await this.getAllInterviews();
    console.log('Acá imprimo las NEWS desde Blog grid component! :-):', this.news);
    console.log('Acá imprimo las INTERVIEWS desde Blog grid component! :-):', this.interviews);
  }


private async getAllNews(): Promise<any> {
  this.news = await this.newsService.getNews().catch((error) => {
    console.log('Error al buscar las NEWS!!!!!', error);
  });
}

private async getAllInterviews(): Promise<any> {
  this.interviews = await this.newsService.getInterviews().catch((error) => {
    console.log('Error al buscar las INTERVIEWS!', error);
  });
}


getVideoIframe(url) {
  var video, results;

  if (url === null) {
      return '';
  }
  results = url.match('[\\?&]v=([^&#]*)');
  video   = (results === null) ? url : results[1];

  return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
}


}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../../services/news.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  titulo: any = 'Hola Inspired Design Decisions With Herb Typography Can Be As Exciting As Illustration & Photo';
  texto: any = 'Pepe but I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it but who has any right to find fault with a man who chooses'
  foto: any = "assets/img/blog/12.jpg";
  parametros: any;

  id: any = 2;
  tipo: any = 0;

  IfnotiEntre: any = 0;

  public linkFotoNews = 'assets/img/news/';
  public linkFotoInterviews = 'assets/img/interviews/';

  public new: any = {
    title: 'Titulo New',
    text: 'Texto'
  };
  public interview: any = {
    title: 'Titulo Interview',
    text: 'Texto'
  };

  constructor(private newsService: NewsService, private route: ActivatedRoute, private _sanitizer: DomSanitizer) { }


  public async ngOnInit(): Promise<void> {
    await this.getID();
    console.log(this.parametros);
    console.log(this.id);
    console.log(this.tipo);

    if (this.tipo === '0'){
      this.IfnotiEntre = 0;
      await this.getNew(this.id);
      console.log('NEW detail', this.new);
    }
    if (this.tipo === '1'){
      this.IfnotiEntre = 1;
      await this.getInterview(this.id);
      console.log('INTERVIEW detail', this.interview);
    }
  }


  private async getNew(id: number): Promise<any> {
    this.new = await this.newsService.getNew(id).catch((error) => {
      console.log('Error al buscar la NEW!!!!!', error);
    });
  }

  private async getInterview(id: number): Promise<any> {
    this.interview = await this.newsService.getInterview(id).catch((error) => {
      console.log('Error al buscar la INTERVIEW!!!!', error);
    });
  }

  private async getID(): Promise<any> {
    this.route.queryParams.subscribe(
      params => {
        this.tipo =  params.type;
        this.id = params.id;
        this.parametros = params;
      }
    );
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

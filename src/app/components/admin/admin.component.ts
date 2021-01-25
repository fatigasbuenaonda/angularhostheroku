import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { from } from 'rxjs';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public news: any;
  public new: any;
  public interviews: any;
  public interview: any;
  public users: any;
  public image: any;
  public f: FormGroup;
  public selectedFile: File;
  public FormData: any;
  public linkFotoNews = 'assets/img/news/';
  public linkFotoInterviews = 'assets/img/interviews/';

  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  constructor(private newsService: NewsService,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private cd: ChangeDetectorRef,
              private _sanitizer: DomSanitizer) {

    this.f = fb.group({
      id: [''],
      // id: ['', Validators.compose([
      //   Validators.required
      // ])],
      picture: [''],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(2000)
      ])],
      text: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100000)
      ])]
    });
     }


  public async ngOnInit(): Promise<void> {
    await this.getAllNews();
    await this.getAllInterviews();
    await this.getAllUsers();
    console.log('Acá imprimo las NEWS:', this.news);
    console.log('Acá imprimo las INTERVIEWS:', this.interviews);
    console.log('Acá imprimo los USERS:', this.users);
  }

  private async getAllUsers(): Promise<any> {
    this.users = await this.newsService.getUsers().catch((error) => {
      console.log('Error al buscar los USERS!', error);
    });
  }

  private async getAllNews(): Promise<any> {
    this.news = await this.newsService.getNews().catch((error) => {
      console.log('Error al buscar las NEWS!!!!!', error);
    });
  }

  private async postNews(news): Promise<any> {
    this.new = await this.newsService.postNews(news).catch((error) => {
      console.log('Error al postear la NEWS!', error);
    });
  }

  private async delNews(id): Promise<any> {
    this.new = await this.newsService.deleteNews(id).catch((error) => {
      console.log('Error al borrar la NEWS!', error);
    });
  }

  private async getAllInterviews(): Promise<any> {
    this.interviews = await this.newsService.getInterviews().catch((error) => {
      console.log('Error al buscar las INTERVIEWS!', error);
    });
  }

  private async postInterviews(interviews): Promise<any> {
    this.interview = await this.newsService.postInterviews(interviews).catch((error) => {
      console.log('Error al postear la INTERVIEW!', error);
    });
  }

  private async delInterviews(id): Promise<any> {
    this.interview = await this.newsService.deleteInterviews(id).catch((error) => {
      console.log('Error al borrar la INTERVIEWS!', error);
    });
  }


  private async postImage(im, tipo): Promise<any> {
    this.image = await this.newsService.postIm(im, tipo).catch((error) => {
      console.log('Error al postear IMAGEN!', error);
    });
  }

  ///////////////////////////////////////////////////////////////////////////


  public async enviarNews(){
    const tipo = 0;
    const nombrePic = this.f.value.picture.split('\\');
    this.f.value.picture = nombrePic[nombrePic.length - 1];
    // this.f.value.picture = temp.split('.')[0];
    console.log(this.f.value);
    console.log('A');
    await this.postNews(this.f.value);
    console.log('B');
    await this.postImage(this.FormData, tipo);
    console.log('C');
    this.f.reset();
  }

  public async enviarInterviews(){
    // console.log(this.f.value);
    // await this.postInterviews(this.f.value);
    // this.f.reset();
    const tipo = 1;
    const nombrePic = this.f.value.picture.split('\\');
    this.f.value.picture = nombrePic[nombrePic.length - 1];
    console.log(this.f.value);
    console.log('A');
    await this.postInterviews(this.f.value);
    console.log('B');
    await this.postImage(this.FormData, tipo);
    console.log('C');
    this.f.reset();
  }

  public async borrarNews(){
    console.log(this.f.value.id);
    await this.delNews(this.f.value.id);
    this.f.reset();
  }

  public async borrarNewsIcono(id: number){
    const index: number = this.news.findIndex(x => x.id === id);
    await this.delNews(id);
    this.news.splice(index, 1);
    console.log('Borrando news', id);
    this.cd.detectChanges();
  }

  public async borrarInterviews(){
    console.log(this.f.value.id);
    await this.delInterviews(this.f.value.id);
    this.f.reset();
  }

  public async borrarInterviewsIcono(id: number){
    const index: number = this.interviews.findIndex(x => x.id === id);
    await this.delInterviews(id);
    this.interviews.splice(index, 1);
    console.log('Borrando interview', id);
    this.cd.detectChanges();
  }

  public async onLogout(){
    this.authService.logout();
    console.log('Hacemos el Log out!');
    this.router.navigateByUrl('/login');
  }

  public async onFileSelected(event: any) {
    let formData = new FormData();
    this.selectedFile = event.target.files[0];
    console.log('a ver:', this.selectedFile);
    formData.append('picture', this.selectedFile, this.selectedFile.name);
    this.FormData = formData;
    console.log('Guardamos nueva imagen para subir ...');
    //await this.postImage(formData);
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

 /////////////////////////////////////////////////////////////////////////////



//  fileChangeEvent(event: any): void {
//      this.imageChangedEvent = event;
//  }
//  imageCropped(event: ImageCroppedEvent) {
//      this.croppedImage = event.base64;
//  }
//  imageLoaded(image: HTMLImageElement) {
//      // show cropper
//  }
//  cropperReady() {
//      // cropper ready
//  }
//  loadImageFailed() {
//      // show message
//  }

 //////////////////////////////////////////////////////////////////////////////////


}


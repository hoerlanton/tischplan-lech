import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.css']
})
export class UploadComponent implements OnInit {
  filesToUpload: Array<File> = [];

  constructor(private http: Http, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  upload(){
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;

    formData.append('uploads[]', files[0], files[0]['name']);

    this.http.post('/upload', formData)
      .map(files => files.json()).map(res =>
      // 1st parameter is a flash message text
      // 2nd parameter is optional. You can pass object with options.
      this._flashMessagesService.show('Erfolgreich CSV Datei hochgeladen', {cssClass: 'alert-success', timeout: 10000}))
      .subscribe(files => console.log('files', files));

  }

}
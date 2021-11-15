import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { AzureBlobStorageService } from '../services/azure-blob-storage.service';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit {
  picturesList: any;
  constructor(private blobService: AzureBlobStorageService) { }

  ngOnInit(): void {
    this.reloadImageList()
  }

  async imageSelected(event: any) {
    console.log(event.target.files)
    let fileList = event.target.files;
    for (let file of fileList) {
      await this.blobService.uploadImage(file, file.name, () => {
        this.reloadImageList();
      })
    }
    // this.blobService.uploadImage(event.target.files[0], event.target.files[0].name, () => {
    //   this.reloadImageList();
    // })
    console.log("File Upload Complete")
  }

  deleteImage(name: string) {
    this.blobService.deleteImage(name, () => {
      this.reloadImageList()
    })
  }

  reloadImageList() {
    this.blobService.listImages().then(list => {
      this.picturesList = list;
      console.log("Images::", this.picturesList)
    })
  }

  downloadImage(name: string) {
    this.blobService.downloadImage(name, blob => {
      let url = window.URL.createObjectURL(blob);
      window.open(url)
    })
  }
}

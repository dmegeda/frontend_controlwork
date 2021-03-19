import { Picture } from './../../interfaces/picture';
import { galleries } from './../../constants/galleries';
import { Component, OnInit } from '@angular/core';
import { ArtGallery } from '../../interfaces/art_gallery';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  selectedGallery = {} as ArtGallery;
  galleries: ArtGallery[];
  selectedPictureToEdit = {} as Picture;
  isGallerySelected: boolean;
  isEditing: boolean;
  editFormModel: FormGroup;

  constructor() {
    this.isGallerySelected = false;
    this.galleries = galleries;
    this.isEditing = false;
    this.editFormModel = new FormGroup({
      pic_id: new FormControl(this.selectedPictureToEdit.id, [Validators.required,
        Validators.minLength(5), Validators.maxLength(100)]),
      picName: new FormControl(this.selectedPictureToEdit.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]),
      creationDate: new FormControl(this.selectedPictureToEdit.creationDate, Validators.required),
      authorName: new FormControl(this.selectedPictureToEdit.authorName, [Validators.required,
        Validators.minLength(5), Validators.maxLength(100)])
    });
  }

  ngOnInit(): void {

  }

  get pictureName() { return this.editFormModel.get('picName'); }
  get authorName() { return this.editFormModel.get('authorName'); }
  get creationDate() { return this.editFormModel.get('creationDate'); }

  selectGallery(artGallery: ArtGallery): void {
    this.selectedGallery = artGallery;
    this.isGallerySelected = true;
  }

  selectPictureToEdit(picture: Picture): void {
    this.selectedPictureToEdit = picture;
    this.editFormModel.get('picName')?.setValue(this.selectedPictureToEdit.name);
    this.editFormModel.get('authorName')?.setValue(this.selectedPictureToEdit.authorName);
    this.editFormModel.get('creationDate')?.setValue(this.selectedPictureToEdit.creationDate);
    this.isEditing = true;
  }

  submitEditing(): void {
    this.selectedPictureToEdit.name = this.pictureName?.value;
    this.selectedPictureToEdit.authorName = this.authorName?.value;
    this.selectedPictureToEdit.creationDate = this.creationDate?.value;

    for (let i = 0; i < this.selectedGallery.pictures.length; i++) {
      if (this.selectedGallery.pictures[i].id === this.selectedPictureToEdit.id) {
        this.selectedGallery.pictures[i] = this.selectedPictureToEdit;
        break;
      }
    }

    this.isEditing = false;
  }
}

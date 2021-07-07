import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  newImageForm: FormGroup

    fileUploaded: boolean = false;
    imageBuffer!: string
    errorMessage: string = '';
    reader = new FileReader();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private imageService: ImageService,
  ) {
    this.imageService.initializeService()
    this.newImageForm = this.formBuilder.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        desc: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        date: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        img: ['']
      },
    );
  }

  ngOnInit(): void {
  }

  onChange(event: any) {
    var file = event.target.files[0];
    if (
      file.type === 'image/jpeg' ||
      file.type === 'image/png'
    ) {
      this.newImageForm.get('img')?.setValue(file)
      // // LOCAL CHECKING OF TYPES
      // this.reader.readAsDataURL(this.file);
      // this.reader.onload = () => {
      //   if (this.reader.result) {
      //     var image = new Image();
      //     image.src = <string>this.reader.result;
      //     image.onload = () => {
      //       console.log('loaded image')
      //     };
      //   } else {
      //     this.fileUploaded = false;
      //     this.errorMessage = 'Failed to read image data.';
      //   }
      // };
    } else {
      this.fileUploaded = false;
      this.errorMessage = 'Unsupported image filetype.';
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.newImageForm.get('img')?.value);
    this.imageService.postImageData(formData).subscribe((res:any)=>{
      this.router.navigate(['profile'])
    })
  }

}

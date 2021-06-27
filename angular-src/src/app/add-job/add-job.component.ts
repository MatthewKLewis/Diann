import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { JobService } from '../services/job.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {

  newJobForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jobService: JobService,
  ) {
    this.jobService.initializeService()
    this.newJobForm = this.formBuilder.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        date: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
      },
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.newJobForm.value)
    this.jobService.postJob(this.newJobForm.value).subscribe((res:any)=>{
      this.router.navigate(['profile'])
    })
  }

}

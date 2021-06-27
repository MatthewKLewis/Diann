import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any
  jobs: any

  constructor(private userService: UserService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.initializeService();

    this.userService.getProfile().subscribe((res:any)=>{
      this.user = res.user
      this.jobs = res.user.jobs
      this.jobService.getJobsByUser(1).subscribe((res)=>{
        this.jobs = res
      })
    }, (err)=>{
      console.log('ERROR!')
      console.log(err)
    })
  }
}

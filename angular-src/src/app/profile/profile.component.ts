import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any
  jobs!: Array<any>

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((res:any)=>{
      this.user = res.user
      this.jobs = res.user.jobs
      console.log(this.user)
    }, (err)=>{
      console.log('ERROR!')
      console.log(err)
    })
  }
}

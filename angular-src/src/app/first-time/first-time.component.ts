import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.scss']
})
export class FirstTimeComponent implements OnInit {

  step: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  finalize() {
    this.router.navigate(['profile'])
  }

  incrementStep() {this.step++;}

}

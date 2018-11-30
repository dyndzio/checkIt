import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit{
  showRegistration: boolean;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {

  }
}

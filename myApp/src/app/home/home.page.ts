import { Component } from '@angular/core';
import { AuthService } from "../core/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor(public auth: AuthService) { }
}

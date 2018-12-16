import { Component, OnInit } from '@angular/core';
import { AuthService } from "../core/auth.service";
import {FormControl, Validators} from '@angular/forms'
import { AngularFireAuth } from "@angular/fire/auth";
import { Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit{
    showRegistration: boolean;
    errorSignIn: any;
    showResetPassword: any;
    resetEmail: string;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(8)]);
  constructor(public auth: AuthService, public afAuth: AngularFireAuth, private router: Router) {
      this.afAuth.authState.subscribe(user => {
          if (user) {
              this.router.navigate(['user', user.uid]);
          }
      });
    this.auth.getSignInError().subscribe(data => {
      this.errorSignIn = data;
      setTimeout(() => {
          this.errorSignIn = false;
      }, 10000);
    });
  }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a value' :
            this.password.hasError('minLength') ? 'not enough characters' :
                '';
    }

    resetPassword(email: string) {
        this.auth.resetPassword(email)
    }

  ngOnInit(): void {
    }
}

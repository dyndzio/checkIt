import { Injectable } from '@angular/core';
import { Router} from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import {Subscription} from "rxjs";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;


    constructor( private authFireBase: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

    this.user = this.authFireBase.authState.pipe(switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return  of(null);
          }
        })
    );
  }
    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
      return this.authFireBase.auth.signInWithPopup(provider)
          .then((credential) => {
            this.updateUserData(credential.user)
          })
    }

    private updateUserData(user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)

      const data: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
      }

      return userRef.set(data)
    }
}

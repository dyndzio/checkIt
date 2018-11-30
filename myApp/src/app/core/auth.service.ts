import { Injectable } from '@angular/core';
import { Router} from "@angular/router";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

interface authManually {
    email: string;
    password: any;
}

interface authManuallyLogin {
    email: string;
    password: any;
}

@Injectable()
export class AuthService {
    user: Observable<User>;
    authManually = {
        email: '',
        password: ''
    };
    authManuallyLogin = {
        email: '',
        password: ''
    };
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

    registerUser(email: string, password: string) {
        return this.authFireBase.auth.createUserWithEmailAndPassword(email, password).then((user) => {
            return this.setUserDoc(user);
        }).catch(function(error) {
            console.log(error);
        });

    }

    signIn(email: string, password: string) {
        return this.authFireBase.auth.signInAndRetrieveDataWithEmailAndPassword(email, password).then((user) => {
            return this.setUserDoc(user);
        }).catch(function(error) {
            console.log(error);
        });

    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }

    facebookLogin() {
        const provider = new firebase.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    }

    logOut() {
        return this.authFireBase.auth.signOut();
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

    private setUserDoc(user) {
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.user.uid}`);

        const data: User = {
            uid: user.user.uid,
            email: user.user.email
        }

        return userRef.set(data);
    }



}

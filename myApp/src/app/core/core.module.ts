import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule} from "@angular/fire/auth";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthService} from "./auth.service";
import {MatIconModule} from "@angular/material";
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatFormFieldModule
  ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule, MatCardModule, MatInputModule, MatIconModule, MatFormFieldModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [AuthService]
})
export class CoreModule { }

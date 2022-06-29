import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user";
import {Validators,FormControl} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

  user: User;
  avatars = ['svg-1','svg-2','svg-3','svg-4'];

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
      return this.name.hasError('required') ? 'Please enter a name':'';
    }

  constructor(private dialogRef: MatDialogRef<NewContactDialogComponent>,
              private userservice: UserService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  save() {
    this.userservice.addUser(this.user).then(user => {
      this.dialogRef.close(user);
    });

  }

  dismiss() {
    this.dialogRef.close(null);
  }

}

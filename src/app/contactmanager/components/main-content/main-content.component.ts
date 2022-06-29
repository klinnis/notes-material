import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Note} from "../../models/note";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: any;


  constructor(private route: ActivatedRoute, private userservice: UserService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.userservice.users.subscribe(users => {
        if(users.length == 0) return;
        this.user = this.userservice.userById(id);
        this.userservice.singleUser.next(this.user.notes);

      });
    });
  }


}

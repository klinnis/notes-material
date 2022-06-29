import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject,Observable} from 'rxjs';
import {Note} from "../models/note";
import {Subject} from "rxjs";
import {resolve} from "@angular/compiler-cli";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  singleUser = new Subject<Note[]>();

  private users_: BehaviorSubject<User[]>;

    datastore: {
      users: User[]
    };

  constructor(private  http: HttpClient) {
    this.datastore = {users: []};
    this.users_ = new BehaviorSubject<User[]>([]);
  }

  get users(): Observable<User[]> {
    return this.users_.asObservable();
  }

  loadAll() {
    const usersUrl = 'https://angular-material-api.azurewebsites.net/users';
    return this.http.get<User[]>(usersUrl).subscribe(data => {
      this.datastore.users = data;
      this.users_.next(Object.assign({}, this.datastore).users);
    }, error => {console.log(error)});
  }

  userById(id: number) {
    const result =  this.datastore.users.find(x => x.id == id);
    return result;
  }

  addUser(user: User): Promise<User> {
     return new Promise((resolver,reject)=> {
       user.id = this.datastore.users.length + 1;
       this.datastore.users.push(user);
       this.users_.next(Object.assign({}, this.datastore).users);
       resolver(user)
     })
  }
}

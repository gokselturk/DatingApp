import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/Alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users!: User[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  
  /*loadUsers(){  
  
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
   
  } */

}

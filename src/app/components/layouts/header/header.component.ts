import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isDropdownOpen = false;
    role!: string;
   firstName!: string;
   email!: string ;
   UserName!: string ;
  constructor(@Inject(DOCUMENT) private document: Document, private elementRef: ElementRef, public _router: Router, private api: ApiService, private auth: AuthService, private userStore: UserStoreService) { }


  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    const token=localStorage.getItem('token');
    // console.log(token);
    this.api.getUserDetails(token)
    .subscribe(res => {
      this.firstName = res[0].firstname;
      this.role=res[0].role;
      this.email=res[0].email;
      this.UserName=res[0].username;
      //console.log(this.users);
    });
  }

  logout() {
    this.auth.signOut();
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  reloadPage() {
    this._router.navigate(['/profile']);
}
}

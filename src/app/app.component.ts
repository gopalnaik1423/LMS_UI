import { Component ,ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressBarBehaviourSubject } from './services/ProgressBarBehaviourSubject.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Leave Management System';
  pgbarstatus=false;

  emailToken!:string;
  emailToReset!:string;
  constructor(private elementRef: ElementRef,  public  _router: Router,private pgbar:ProgressBarBehaviourSubject,private activedRoute:ActivatedRoute) { }

  ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.pgbar.ProgressBarSubject.subscribe((k:boolean)=>{
      this.pgbarstatus= k;
    });

    this.activedRoute.queryParams.subscribe(val=>{
      this.emailToReset=val['email'];
      this.emailToken=val['code'];
    });
  }
  
}

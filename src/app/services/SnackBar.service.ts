import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Toast} from 'bootstrap'
import { stringify } from 'uuid';
declare var $:any;

@Injectable({
  providedIn:'root'
})
export class SnackBarService{

  constructor(private router:Router){

  }
  SendSnackBarMsgSuccess(msg:any){
    this.ShowAlert(msg,"success")
  }
  SendSnackBarMsgDanger(msg:any){
   // console.log();

    if(msg instanceof Object){
      if(msg['status']==401){
        this.router.navigate(['auth/login'])
        this.ShowAlert("Session expired","danger")
      }
      else{
        this.ShowAlert(msg['title'],"danger")
      }


    }
    else if(typeof(msg) == "string"){
      this.ShowAlert(msg.toString(),"danger")
    }
    else{
      this.ShowAlert("Something went wrong","danger")
    }


  }


  SendSnackBarMsgWarning(msg:any){
    this.ShowAlert(msg,"warning")
  }

  SendSnackBarMsgInfo(msg:any){
   this.ShowAlert(msg,"primary")
  }
  ShowAlert(msg:string,type:string){
    var toastcontainer = document.getElementById('toastcontainer');
   if(toastcontainer){
    var toastLiveExample = document.getElementById('liveToast');
    if(toastLiveExample){
      toastcontainer.removeChild(toastLiveExample);
    }

    toastcontainer.insertAdjacentHTML("beforeend",` <div id="liveToast" class="toast align-items-center text-white bg-${type} border-0  position-fixed top-0 end-0" role="alert" data-bs-delay="2000" aria-live="assertive" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body" id="toastBody">
        ${msg}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  </div>`)
  toastLiveExample = document.getElementById('liveToast');
    var toast = new Toast(toastLiveExample!);

    toast.show()
   // $('#myAlert').append(`<div class='toast align-items-center text-white bg-${type} border-0' role='alert' aria-live='assertive' ariaatomic='true'><div class='d-flex'><div class='toast-body;>${msg} </div><button type='button' class='btn-close btn-close-white me-2 m-auto' data-bs-dismiss='toast' aria-label='Close'></button></div></div>`);
  }
   }
}

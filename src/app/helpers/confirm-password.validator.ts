import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName:string, matchControlName:string){
    return (FormGroup:FormGroup) =>{
        const passwordControl=FormGroup.controls[controlName];
        const confirmPasswordControl=FormGroup.controls[matchControlName];
        if(confirmPasswordControl.errors && confirmPasswordControl.errors['confirmPasswordValidator'])
        {
            return;
        }
        if(passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({ConfirmPasswordValidator:true})
        }
        else{
            confirmPasswordControl.setErrors(null)
        }
    }
}
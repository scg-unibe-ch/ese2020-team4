import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import {UserLoginComponent} from "../user-login/user-login.component";
import {DeleteDialogComponent} from "../admin-overview/user-list/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogSuccessfulComponent} from "./dialog-successful/dialog-successful.component";
import {DialogErrorComponent} from "./dialog-error/dialog-error.component";
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private httpClient: HttpClient) {
    
  }
  secureEndpointResponse = 'response';
  hide = true;
  private loginComponent: UserLoginComponent;
  matcher = new MyErrorStateMatcher();


  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',
        [Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{7,}$')]],
      confirmPassword: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      street: [''],
      zipCode: [''],
      city: [''],
      country: [''],
      tNumber: [''],
      gender: ['']
    }, { validator: this.checkPassword })
  }

  checkPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  register(): void {
    this.httpClient.post(environment.endpointURL + 'user/register', this.userForm.value).subscribe((res: any) => {
      this.loginComponent = new UserLoginComponent(this.httpClient, this.dialog);
      this.loginComponent.setUserName(this.userForm.value.userName);
      this.loginComponent.setPassword(this.userForm.value.password);
      this.loginComponent.login();
      this.moveToSelectedTab('Overview');
      this.openDialogSuccessful();

    }, (err: any) => {

      this.openDialogError(err.error.message.message);

    });

  }

  moveToSelectedTab(tabName: string) {
    for (let i =0; i < document.querySelectorAll('.mat-tab-label').length; i++) {
      if ((<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).innerText === tabName) {
        (<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }



    validForm(): boolean {
    // checks if form is valid
    if (this.userForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  private openDialogSuccessful() {
    this.dialog.open(DialogSuccessfulComponent, {
      width: '250px',
    });

  }


  private openDialogError(message) {
    this.dialog.open(DialogErrorComponent, {
      width: '250px',
      data: message
    });
  }

}

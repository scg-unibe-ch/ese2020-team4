import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserLoginComponent } from '../../app/user-login/user-login.component';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private httpClient: HttpClient) { }
  secureEndpointResponse = 'response';
  hide = true;
  private loginComponent: UserLoginComponent;




  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['',
        [Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{7,}$')]],
      confirmPassword: ['', [Validators.required]],
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
    console.log(this.userForm.value);
    this.httpClient.post(environment.endpointURL + 'user/register', this.userForm.value).subscribe((res: any) => {


      this.loginComponent = new UserLoginComponent(this.httpClient);
      this.loginComponent.setUserName(this.userForm.value.userName);
      this.loginComponent.setPassword(this.userForm.value.password);
      this.loginComponent.login();
      this.moveToSelectedTab('Overview');
      this.openDialog();

    }, (err: any) => {


      //console.log(err.error.message.message);
      this.secureEndpointResponse = err.error.message.message; // not able to access message "field" of error

    });
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

  moveToSelectedTab(tabName: string) {
    for (let i =0; i < document.querySelectorAll('.mat-tab-label').length; i++) {
      if ((<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).innerText === tabName) {
        (<HTMLElement> document.querySelectorAll('.mat-tab-label')[i]).click();
      }
    }
  }

  openDialog(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Angular for beginners'
    };

    this.dialog.open(DialogComponent, dialogConfig);
  }


}

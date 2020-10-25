import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  userForm: FormGroup;
  secureEndpointResponse = 'response';
  hide = true;
  private token: string;
  response: any;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private router: Router) { }




  ngOnInit() {
    this.userForm = this.formBuilder.group({
      password: ['',
        [Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*#?&])(?=.*\\d)[A-Za-z\\d!$%@#£€*?&]{7,}$')]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPassword })
  }

  checkPassword(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
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

  reset(): void {
    console.log(this.userForm.value);
    console.log(this.token);
    console.log(this.userForm.value.password);
    this.token = (location.pathname + location.search).substr(7);
    this.httpClient.post(environment.endpointURL + 'user/resetPassword', {token: this.token,
      password: this.userForm.value.password})
      .subscribe((res: any) => {

          this.response = res.message;

          setTimeout(() => {
            this.router.navigate(['main']);
          }, 5000); //redirect after 5 seconds


        }
        , (err: any) => {
          this.response = err.error.message;

        });


  }

}

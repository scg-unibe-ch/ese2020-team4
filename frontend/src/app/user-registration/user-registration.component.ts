import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  secureEndpointResponse = '';
  hide = true;



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
    console.log(this.userForm.value)
    this.httpClient.post(environment.endpointURL + 'user/register', this.userForm.value).subscribe((res: any) => { });
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

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { INT_TYPE } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit  {
  registerForm: FormGroup;

    signin: FormGroup = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    tNumber: new FormControl(''),
    address: new FormControl('')

  });
  
  ngOnInit(): void{}

  hide = false;

  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }

  constructor(private httpClient: HttpClient) { }
  secureEndpointResponse = '';

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  register(): void {
    console.log(this.signin.value)
    this.httpClient.post(environment.endpointURL + 'user/register', {
      signin: this.signin.value
      
    }).subscribe((res: any) => {

    });
  }

}


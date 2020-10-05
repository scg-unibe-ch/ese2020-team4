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
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  secureEndpointResponse = '';
  hide = false;

  ngOnInit(){
    this.userForm = this.formBuilder.group({
      userName: [''],
      email: ['', [Validators.email, Validators.required ]],
      password: ['', [Validators.required, Validators.min(3) ]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      tNumber: [''],
      address: [''],
      gender: ['']
    })
  }

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  register(): void {
    console.log(this.userForm.value)
    this.httpClient.post(environment.endpointURL + 'user/register', this.userForm.value).subscribe((res: any) => {});
  }

}


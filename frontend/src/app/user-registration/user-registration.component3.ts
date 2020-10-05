// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { FormGroup, FormControl, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-user-registration',
//   templateUrl: './user-registration.component.html',
//   styleUrls: ['./user-registration.component.css']
// })
// export class UserRegistrationComponent   {
//     signin: FormGroup = new FormGroup({
//     email: new FormControl('', [Validators.email, Validators.required ]),
//     password: new FormControl('', [Validators.required, Validators.min(3) ])
//   });
//   hide = false;

//   get emailInput() { return this.signin.get('email'); }
//   get passwordInput() { return this.signin.get('password');
//   }

//   constructor(private httpClient: HttpClient) { }
//   secureEndpointResponse = '';
//   /**
//    * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
//    */
//   register(): void {
//     this.httpClient.post(environment.endpointURL + 'user/register', {
//       signin: this.signin,

//     }).subscribe((res: any) => {

//     });
//   }

// }


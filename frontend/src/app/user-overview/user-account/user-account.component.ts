import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  editInfo: FormGroup;
  userName = '';
  password = '';
  first: string;
  last: string;
  street: string;
  zipCode: number;
  city: string;
  country: string;
  tNumber: number;
  blocked = true;
  editing = false;


  userToken: string;
  loggedIn = false;

  secureEndpointResponse = '';

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private router: Router) { }




  getUserName() {
    return this.userName;
  }

  getToken() {
    return this.userToken;
  }
  
  ngOnInit(): void {
    this.editInfo = this.formBuilder.group({
      userName: [{value: this.userName, disabled: this.blocked}],
      firstName: [{value: this.first, disabled: this.blocked}],
      lastName: [{value: this.last, disabled: this.blocked}],
      street: [{value: this.street, disabled: this.blocked}],
      zipCode: [{value: this.zipCode, disabled: this.blocked}],
      city: [{value: this.city, disabled: this.blocked}],
      country: [{value: this.country, disabled: this.blocked}],
      tNumber: [{value: this.tNumber, disabled: this.blocked}]
    })
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    

    this.httpClient.get(environment.endpointURL + 'user/getSpecific/' + localStorage.getItem('userId'), {}).subscribe((res: any) =>{
      this.userName = res.userName;
      this.first = res.firstName;
      this.last = res.lastName;
      this.street = res.street;
      this.zipCode= res.zipCode;
      this.city = res.city;
      this.country = res.country;
      this.tNumber = res.tNumber;
      localStorage.setItem('userName', res.userName);

      this.editInfo.patchValue({
        userName : (this.userName),
        firstName : (this.first),
        lastName : (this.last),
        street : (this.street),
        zipCode : (this.zipCode),
        city : (this.city),
        country : (this.country),
        tNumber : (this.tNumber)
        })
    });
    
    this.userName = localStorage.getItem('userName');
    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);

      this.checkUserStatus();
    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');

    this.checkUserStatus();
  }

  submit():void{
    this.httpClient.put(environment.endpointURL + 'user/edit/'+ localStorage.getItem('userId'), 
    {
      "userName" : this.editInfo.get('userName').value!=null ? this.editInfo.get('userName').value : this.userName,
      "firstName": this.editInfo.get('firstName').value!=null ? this.editInfo.get('firstName').value : this.first,
      "lastName": this.editInfo.get('lastName').value!=null ? this.editInfo.get('lastName').value : this.last,
      "street": this.editInfo.get('street').value!=null ? this.editInfo.get('street').value : this.street,
      "zipCode": this.editInfo.get('zipCode').value!=null ? this.editInfo.get('zipCode').value : this.zipCode,
      "city": this.editInfo.get('city').value!=null ? this.editInfo.get('city').value : this.city,
      "country": this.editInfo.get('country').value!=null ? this.editInfo.get('country').value : this.country,
      "tNumber": this.editInfo.get('tNumber').value!=null ? this.editInfo.get('tNumber').value : this.tNumber

    }).subscribe((res:any) =>{
      
    })
    this.checkUserStatus();
    this.router.navigateByUrl('/main/available-products');
  }
  

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }

  deblock(){
    this.blocked = false;
    this.editing = true;
    this.editInfo.enable();
    this.checkUserStatus();
  }

}

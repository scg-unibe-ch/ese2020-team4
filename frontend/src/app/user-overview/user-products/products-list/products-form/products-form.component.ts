import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Directive, Input, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgControl, FormControl} from '@angular/forms';
import { environment } from '../../../../../environments/environment';

/**
 * Products form component
 */

@Component({
  selector: 'products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
  itemForm: FormGroup;
  private imageAsBase64: string = "";
  constructor(public dialogRef: MatDialogRef<ProductsFormComponent>, private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  secureEndpointResponse = '';
  hide = true;
  flags: boolean[] = [false, false];
  typeFlag = false;
  sellLendFlag = false;


  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      userId: [localStorage.getItem('userId').toString()],
      title: ['',[Validators.required]],
      productType: ['',[Validators.required]],
      transactionType: ['',[Validators.required]],
      pictureId: [''],
      location: ['',[Validators.required]],
      delivery: ['',[Validators.required]],
      description: ['',[Validators.required]],
      price: ['',[Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]],
      priceModel: ['']

    })
    this.itemForm.patchValue({
      productType: 'Product',
      transactionType: 'Sell',
      priceModel: 'Fixed',
      delivery: '0'

    })
  }

  post(): void {
    this.httpClient.post(environment.endpointURL + 'item/post', this.itemForm.value).subscribe((res: any) => { });
  }

  close(): void{
    this.dialogRef.close()
  }

  validForm(): boolean {
    // checks if form is valid
    if (this.itemForm.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  typeChange = (type, param) => {
    if (type == 0) {
      this.flags[param] = true;
    }
    else {
      this.flags[param] = false;
    }
    }

  flagCheck(param): boolean {
    return this.flags[param]
  }

  selectImage(event) {
    if (event.target.files.length > 0) {

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      // @ts-ignore
      this.imageAsBase64 = reader.result.split(',')[1];
      // this.itemForm.patchValue({
      //   encodedPicture : this.imageAsBase64
      // })

      this.itemForm.addControl('encodedPicture', new FormControl(this.imageAsBase64));


    };


    }
    else{
      // this.imageAsBase64 = '';
      // this.itemForm.patchValue({
      //   encodedPicture : this.imageAsBase64
      // })
      // this.itemForm.addControl('encodedPicture', new FormControl(this.imageAsBase64));
      this.itemForm.removeControl('encodedPicture');
    }
  }




}

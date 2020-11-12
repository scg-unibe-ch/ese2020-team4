import { ItemData } from './../products-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgControl } from '@angular/forms';
import { environment } from '../../../../../environments/environment';



@Component({
  selector: 'edit-products-form',
  templateUrl: './edit-products-form.component.html',
  styleUrls: ['./edit-products-form.component.css']
})
export class EditProductsFormComponent implements OnInit {
  itemForm: FormGroup;
  public constructor(public dialogRef: MatDialogRef<EditProductsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ItemData, private formBuilder: FormBuilder, private httpClient: HttpClient) { 
  }
  secureEndpointResponse = '';
  hide = true;
  flags: boolean[] = [false, false];
  typeFlag = false;
  sellLendFlag = false;
  deliverys = "0";
  
  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      itemId: [''],
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
    this.itemForm.patchValue(this.data)
    this.itemForm.patchValue({delivery : (+this.data['delivery']).toString()})
  }

  edit(): void {
    this.httpClient.put(environment.endpointURL + 'item/'+this.itemForm.get('itemId').value, this.itemForm.value).subscribe((res: any) => { });
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
}

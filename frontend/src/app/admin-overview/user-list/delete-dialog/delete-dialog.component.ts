import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ItemData} from "../../../catalogue/catalogue-product-list/catalogue-products-list.component";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent  {
  itemForm: FormGroup;
  public constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }



  delete(): void {
    console.log(this.data)
    this.httpClient.delete(environment.endpointURL + 'user/delete/' + this.data).subscribe((res: any) => { });
    this.dialogRef.close()
  }
  close(): void{
    this.dialogRef.close()
  }
}

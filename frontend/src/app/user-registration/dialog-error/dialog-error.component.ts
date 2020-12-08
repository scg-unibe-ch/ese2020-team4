import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";


/**
 * A dialog component that will come up when a new registration was not successful.
 */

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent  {
  message: any;

  public constructor(public dialogRef: MatDialogRef<DialogErrorComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
    this.message = this.data;
  }


  close(): void{
    this.dialogRef.close()
  }

}

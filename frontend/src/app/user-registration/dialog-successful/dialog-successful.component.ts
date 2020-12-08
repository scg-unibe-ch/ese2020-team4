import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

/**
 * A dialog component that will come up when a new registration was successful.
 */

@Component({
  selector: 'app-dialog-successful',
  templateUrl: './dialog-successful.component.html',
  styleUrls: ['./dialog-successful.component.css']
})
export class DialogSuccessfulComponent  {

  public constructor(public dialogRef: MatDialogRef<DialogSuccessfulComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }


  close(): void{
    this.dialogRef.close()
  }

}

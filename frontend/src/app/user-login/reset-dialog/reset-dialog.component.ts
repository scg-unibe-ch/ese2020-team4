import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent {

  // itemForm: FormGroup;
  email: string;
  response = '';
  public constructor(public dialogRef: MatDialogRef<ResetDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  reset(): void {
    this.httpClient.post(environment.endpointURL + 'user/resetRequest', {
      email: this.email

    }).subscribe((res: {message: string}) => {
      this.response = res.message;
    }, (err: any) => {

      this.response = err.error.message;

    }
    );
  }
  close(): void{
    this.dialogRef.close()
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";

/**
 * A dialog Component that comes up in case the login process was not successful.
 */


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  message: any;

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
      this.message = this.data;
     }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close()
  }

}

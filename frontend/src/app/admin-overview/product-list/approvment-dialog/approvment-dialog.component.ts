import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-approvment-dialog',
  templateUrl: './approvment-dialog.component.html',
  styleUrls: ['./approvment-dialog.component.css']
})
export class ApprovmentDialogComponent implements OnInit {

  public constructor(public dialogRef: MatDialogRef<ApprovmentDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close()
  }

  save() {
    console.log(this.data)
    this.httpClient.post(environment.endpointURL + 'item/changeFlag/' + this.data,null ).subscribe((res: any) => { });
    this.dialogRef.close()

  }
}

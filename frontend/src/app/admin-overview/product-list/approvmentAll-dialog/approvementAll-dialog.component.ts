import {Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-approvementAll-dialog',
  templateUrl: './approvementAll-dialog.component.html',
  styleUrls: ['./approvementAll-dialog.component.css']
})
export class ApprovmentAllDialogComponent implements OnInit {

  public constructor(public dialogRef: MatDialogRef<ApprovmentAllDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close()
  }

  save() {
    this.httpClient.post(environment.endpointURL + 'item/changeAllFlag/',null ).subscribe((res: any) => { });
    this.dialogRef.close()

  }
}

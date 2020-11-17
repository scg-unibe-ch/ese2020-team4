import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-delete-item-dialog',
  templateUrl: './delete-item-dialog.component.html',
  styleUrls: ['./delete-item-dialog.component.css']
})
export class DeleteItemDialogComponent implements OnInit {

  public constructor(public dialogRef: MatDialogRef<DeleteItemDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {
  }

  ngOnInit(): void {

  }

  close() {
    this.dialogRef.close()
  }

  save() {
    this.httpClient.delete(environment.endpointURL + 'item/delete/' + this.data ).subscribe((res: any) => {
    });
    this.dialogRef.close();

  }
}

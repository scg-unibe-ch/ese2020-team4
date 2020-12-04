import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.css']
})
export class RatingDialogComponent implements OnInit {
  currentRate = 0;
  private review;
  response = '';

  public constructor(public dialogRef: MatDialogRef<RatingDialogComponent>,
                     @Inject(MAT_DIALOG_DATA) public data: number, private httpClient: HttpClient) {

  }

  ngOnInit(): void {
  }

  rate(): void {
    if(this.currentRate === 0){
      this.response = 'please select one of the stars!'
    }
    else{
      this.httpClient.post(environment.endpointURL + 'item/rating/' + this.data , {stars: this.currentRate}).subscribe((res: any) => {
        this.response = 'You rated the product with ' + this.currentRate + ' stars'
    },(err: any) => {});

  }
  }
    close(): void{
    this.dialogRef.close()
  }
}

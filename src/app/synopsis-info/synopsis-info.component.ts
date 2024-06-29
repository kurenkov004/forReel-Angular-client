import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-info',
  templateUrl: './synopsis-info.component.html',
  styleUrl: './synopsis-info.component.scss'
})
export class SynopsisInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SynopsisInfoComponent>,


    @Inject(MAT_DIALOG_DATA) public data: {
      Description: string
    }
  ) {}

  ngOnInit(): void {
    this.data.Description;
  }
}

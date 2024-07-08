import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * @description Component representing the movie synopsis dialog.
 * @selector 'app-synopsis-info'
 * @templateUrl './synopsis-info.component.html'
 * @styleUrls ['./synopsis-info.component.scss']
 */
@Component({
  selector: 'app-synopsis-info',
  templateUrl: './synopsis-info.component.html',
  styleUrl: './synopsis-info.component.scss'
})
export class SynopsisInfoComponent implements OnInit {

    /**
   * @constructor - Constructor for MovieSynopsisComponent. 
   * @param data - Data containing movie discription.
   */
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

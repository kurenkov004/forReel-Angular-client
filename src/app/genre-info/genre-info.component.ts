import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrl: './genre-info.component.scss'
})
export class GenreInfoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef <GenreInfoComponent>,

    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Description: string
    }
  ) {}

  ngOnInit(): void {
    this.data.Name;
    this.data.Description;
  }
}

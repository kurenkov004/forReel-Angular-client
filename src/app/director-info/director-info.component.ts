import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';


/**
 * @description Component representing the director info dialog.
 * @selector 'app-director-info'
 * @templateUrl './director-info.component.html'
 * @styleUrls ['./director-info.component.scss']
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})
export class DirectorInfoComponent implements OnInit {

    /**
 * @constructor - Constructor for DirectorInfoComponent.
 * @param - Data containing director information.
 */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef <DirectorInfoComponent>,

    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Bio: string,
      Birth: string,
    }

  ) {}
  ngOnInit(): void {
    this.data.Name;
    this.data.Bio;
  }

  showDirectorInfo() {
    this.dialogRef.close()
  }

}

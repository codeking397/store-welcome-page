import { DialogComponent } from './dialog/dialog.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Airwallex';
  constructor(private dialog: MatDialog){}


  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    // dialogConfig.hasBackdrop = true;
    dialogConfig.minWidth = '400px';
    this.dialog.open(DialogComponent, dialogConfig);
  }
}

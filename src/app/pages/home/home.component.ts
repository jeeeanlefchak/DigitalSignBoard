import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent, ConfigurationModule } from 'src/app/components/configuration/configuration.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public shared: SharedService) { }

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfigurationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }

@NgModule({
  imports: [
    ConfigurationModule,
    MatDialogModule,
    HomePageRoutingModule
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: [

  ],
})
export class HomeModule { }

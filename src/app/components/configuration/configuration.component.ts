import { Color, MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { Model } from 'src/app/models/mode';
import { SharedService } from 'src/app/services/shared.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigurationComponent implements OnInit {
  text: string = '';
  velocity: number = 0;
  bkgColor: any;
  fColor: any;
  color: ThemePalette = 'primary';
  size: number = 1;
  constructor(private sharedService: SharedService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.sharedService.model) {
      if (this.sharedService.model.backGroundColor) {
        const temp = this.hexToRgb(this.sharedService.model.backGroundColor) as any;
        this.bkgColor = new Color(temp.r, temp.g, temp.b);
      }
      if (this.sharedService.model.fontColor) {
        const temp = this.hexToRgb(this.sharedService.model.fontColor) as any;
        this.fColor = new Color(temp.r, temp.g, temp.b);
      }
      this.velocity = this.sharedService.model.velocity || 0;
      this.text = this.sharedService.model.text || '';
      this.size = this.sharedService.model.size;
    }
  }

  onSubmit() {
    let model = new Model()
    model.backGroundColor = '' + this.bkgColor;
    model.fontColor = '' + this.fColor;
    model.velocity = this.velocity;
    model.text = this.text;
    model.size = this.size;
    this.sharedService.setModel(model);
    this.onCancel();
  }

  onCancel() {
    this.dialog.closeAll();
  }

  hexToRgb(hex?: any) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m?: any, r?: any, g?: any, b?: any) => {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

}
@NgModule({
  imports: [
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    NgxMatColorPickerModule,
    MatSliderModule,
    MatFormFieldModule,
  ],
  exports: [
    ConfigurationComponent
  ],
  declarations: [
    ConfigurationComponent
  ],
  providers: [
    { provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
})
export class ConfigurationModule { }

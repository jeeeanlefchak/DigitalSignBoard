import { AfterViewInit, Injectable } from "@angular/core";
import { Model } from "../models/mode";

@Injectable({
  providedIn: 'root',
})

export class SharedService implements AfterViewInit {
  private strLocalStorangeModel = '_MODEL_';
  model: Model = new Model();

  constructor() {
    let jsonModel = localStorage.getItem(this.strLocalStorangeModel);
    if (jsonModel) this.model = JSON.parse(jsonModel);
  }

  ngAfterViewInit(): void {

  }

  setModel(m: Model) {
    this.model = m;
    localStorage.setItem(this.strLocalStorangeModel, JSON.stringify(m));
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private data = {};

  constructor() { }

  setOption(option, value) {

    this.data[option] = value;

  }

  getOption() {
    return JSON.stringify(this.data) !== '{}' ? this.data : false;
  }

}

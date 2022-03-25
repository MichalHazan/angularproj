import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public _data: DataService) {}

  switchDiv() {
    this._data.Isregister = !this._data.Isregister;
  }
  ngOnInit(): void {
    this._data.ordersNumbers();
    this._data.getproducts()
    
  }
}

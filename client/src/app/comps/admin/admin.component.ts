import { Component, OnInit } from '@angular/core';
import { AdmindataService } from 'src/app/services/admindata.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  // form = {
  //   productName: this._admindata.product.productName,
  //   category_id: this._admindata.product.category_id,
  //   price: this._admindata.product.price,
  //   image: this._admindata.product.image,
  // };
  constructor(public _admindata: AdmindataService, public _data: DataService) {}

  ngOnInit(): void {
    this._data.getcategories();
  }
  tonumber(v) {
    return parseFloat(v);
  }
  
}

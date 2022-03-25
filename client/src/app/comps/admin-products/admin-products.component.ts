import { Component, OnInit } from '@angular/core';
import { AdmindataService } from 'src/app/services/admindata.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  add = false;
  showFiller = false;
  search = '';
  constructor(public _data: DataService, public _adminData: AdmindataService) {}

  ngOnInit(): void {
    this._data.getproducts();
    this._data.getcategories();
  }
  async productClicked(id: number) {
    await this._adminData.getproduct(id);
    this.add = false;
  }
}

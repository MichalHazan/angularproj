import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  showFiller = false;
  search =""
  searchC =""
  constructor(public _data: DataService) {}

  ngOnInit(): void {
    this._data.getproducts();
    this._data.getcategories();
    this._data.getCart();
  }

  getPamount(productID: number) {
    if (this._data.cartArr.length > 0) {
      if (this._data.cartArr.find((p) => p.product_id == productID)) {
        return this._data.cartArr.find((p) => p.product_id == productID).amount;
      }
    }
    return 0;
  }
  addToCart(id: number, amount: number) {
    if (this.getPamount(id) > 0) {
      this._data.plus({ id });
    } else {
      console.log(id + ' ' + amount);
      this._data.addToCart({ id, amount });
    }
  }
  removeFromCart(id: number, amount: number) {
    if (this.getPamount(id) > 1) {
      this._data.minus({ id });
    } else {
      this._data.addToCart({ id, amount });
    }
  }
}

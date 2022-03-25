import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Product from '../models/product.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AdmindataService {
  baseUrl = 'http://localhost:5000/';

  product: Product;

  async getproduct(id: number) {
    const res = await fetch(this.baseUrl + 'products/one/' + id, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Product = await res.json();
    this.product = data[0];

    console.log(this.product);
  }

  async Updateproduct(
    body: {
      productName: string;
      category_id: number;
      price: number;
      image: string;
    },
    id: number
  ) {
    const res = await fetch(this.baseUrl + 'products/update/' + id, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      alert(data.msg);
      this._data.getproducts();
    } else {
      alert(data.err);
    }
  }

  async Addproduct(body: {
    productName: string;
    category_id: number;
    price: number;
    image: string;
  }) {
    const res = await fetch(this.baseUrl + 'products/add', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      alert(data.msg);
      this._data.getproducts();
    } else {
      alert(data.err);
    }
  }

  constructor(public _data: DataService) {}
}

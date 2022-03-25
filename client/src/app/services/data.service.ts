import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Cart from '../models/cart.model';
import Category from '../models/category.model';
import Product from '../models/product.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'http://localhost:5000/';
  productsArr: Product[];
  categoriesArr: Category[];
  cartArr: Cart[];
  sum: number = 0;
  islogin: boolean = false;
  errorMessage = '';
  check = false;
  Isregister: boolean = true;
  mail: string;
  user: User;
  username: string = 'guest';
  isAdmin: boolean = false;

  // Numbers of orders
  Numbers_of_orders: number = 0;
  async ordersNumbers() {
    const res = await fetch(this.baseUrl + 'order/orders_num');
    const data = await res.json();
    if (data.msg) {
      this.Numbers_of_orders = data.msg;
    }
    this.errorMessage = data.err;
  }
  // check if login
  async isUserLogin() {
    const res = await fetch(this.baseUrl + 'users', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.userID) {
      this.user = data;
      this.islogin = true;
      this.username = data.firstName;
      this.errorMessage = '';
      if (this.user.isAdmin) {
        this.username = 'admin';
        this.isAdmin = true;
        this._r.navigateByUrl('/admin');
      }
    }
    this.errorMessage = data.err;
  }
  // ---Register
  async register(body: {
    userID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    city: string;
    street: string;
  }) {
    const res = await fetch(this.baseUrl + 'users/register', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      alert('register succefully, now all you need is to login');
      this.errorMessage = data.msg;
      this.Isregister = true;
      this.username = data.firstName;
    } else {
      console.log(data);
      this.errorMessage = data.err;
    }
  }
  // ---Login
  async login(body: { email: string; password: string }) {
    const res = await fetch(this.baseUrl + 'users/login', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.username = data.firstName;
      this.mail = body.email;
      this.islogin = true;
      this.userInfo();
    } else {
      this.errorMessage = data.err;
    }
  }
  // ---userInfo
  async userInfo() {
    const res = await fetch(this.baseUrl + 'users/user', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.err) {
      this.errorMessage = data.err;
    } else {
      this.user = data[0];
      if (this.user.isAdmin) {
        this.isAdmin = true;
        this._r.navigateByUrl('/admin');
      }
      console.log(this.user.isAdmin);
    }
  }
  cartDate = '';
  async lastCart() {
    const res = await fetch(this.baseUrl + 'cart/shopping_cart/date', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    if (data.err) {
      console.log(data.err);
    } else {
      this.cartDate = data.msg;
    }
  }
  // email valid
  async validEmail(email: string) {
    const res = await fetch(this.baseUrl + 'email/' + email);
    const data = await res.json();
    if (data.msg) {
      this.check = true;
    } else {
      this.errorMessage = data.err;
      this.check = false;
    }
  }
  // ---logout
  async logout() {
    const res = await fetch(this.baseUrl + 'users/logout', {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.msg) {
      this.islogin = false;
      this.isAdmin = false;

      alert(data.msg);
      this._r.navigateByUrl('home');
      this.errorMessage = '';
      this.username = 'guest';
    } else {
      console.log(data);
    }
  }
  //----- show all products-----
  async getproducts() {
    const res = await fetch(this.baseUrl + 'products?proname=', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Product[] = await res.json();
    console.log(data);
    this.productsArr = data;
  }
  async searchproducts(proname: string) {
    const res = await fetch(this.baseUrl + 'products?proname=' + proname, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Product[] = await res.json();
    console.log(data);
    this.productsArr = data;
  }
  //----- Delete product-------
  async delProduct(id: number) {
    const res = await fetch(this.baseUrl + `products/${id}`, {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.msg) {
      this.getproducts();
    }
  }
  //----- show all products by category-------
  async getproductsByCategory(categoryID: number) {
    const res = await fetch(this.baseUrl + `products/${categoryID}`, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Product[] = await res.json();
    console.log(data);
    this.productsArr = data;
  }
  async getcategories() {
    const res = await fetch(this.baseUrl + 'categories');
    const data: Category[] = await res.json();
    console.log(data);
    this.categoriesArr = data;
  }
  // ---Add product----
  async addP(body: {
    productName: string;
    category_id: number;
    price: string;
    image: string;
  }) {
    const res = await fetch(this.baseUrl + 'products/add', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.getproducts();
    } else {
      console.log(data);
    }
  }
  //----- show Cart-------
  async getCart() {
    const res = await fetch(this.baseUrl + 'cart?proname=', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Cart[] = await res.json();
    this.cartArr = data;
    this.sum = this.cartArr.reduce((a, b) => {
      return a + b.amount * b.price;
    }, 0);
  }
  //----- Search on Cart-------
  async searchCart(proname: string) {
    const res = await fetch(this.baseUrl + 'cart?proname=' + proname, {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data: Cart[] = await res.json();
    this.cartArr = data;
    this.sum = this.cartArr.reduce((a, b) => {
      return a + b.amount * b.price;
    }, 0);
  }

  //----- Add\Remove to Cart-------
  async addToCart(body: { id: number; amount: number }) {
    const res = await fetch(this.baseUrl + 'cart', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);

    if (data.msg) {
      this.getCart();
    }
  }
  async plus(body: { id: number }) {
    const res = await fetch(this.baseUrl + 'cart/plus', {
      method: 'Put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.getCart();
    }
  }
  async minus(body: { id: number }) {
    const res = await fetch(this.baseUrl + 'cart/minus', {
      method: 'Put',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.msg) {
      this.getCart();
    }
  }
  // ===Is Cart Open??====
  isCartOpenBol: boolean = false;
  async isCartOpenFuncation() {
    const res = await fetch(this.baseUrl + 'cart/isopencart', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);

    if (data.msg == 'yes') {
      this.isCartOpenBol = true;
    } else {
      this.isCartOpenBol = false;
    }
    if (data.err) {
      console.log(data.err);
    }
  }
  async startshopping() {
    const res = await fetch(this.baseUrl + 'cart/shopping_cart?isopen=1', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.msg) {
      this._r.navigateByUrl('/products');
    }
  }

  // --Order---
  async order(body: {
    sendCity: string;
    sendStreet: string;
    sendDate: string;
    payEnd: String;
  }) {
    console.log(body);

    const res = await fetch(this.baseUrl + 'order', {
      method: 'Post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (data.msg) {
      this.errorMessage = data.msg;
    } else {
      this.errorMessage = data.err;
    }
  }
  async closeShopppingCart() {
    const res = await fetch(this.baseUrl + 'cart/shopping_cart?isopen=0', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    console.log(data);
    if (data.msg) {
      this.errorMessage = 'Buy again any time you want';
    }
    if (data.err) {
      this.errorMessage = data.err;
    }
  }
  // --busy Dates
  busyDates: [
    {
      sendDate: string;
      c: number;
    }
  ];
  async getBusyDates() {
    const res = await fetch(this.baseUrl + 'order/busydate', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    this.busyDates = data;
  }
  async deleteAllPC() {
    const res = await fetch(this.baseUrl + 'cart/deleteall', {
      method: 'delete',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await res.json();
    if (data.err) {
      console.log(data);
    } else {
      this.getCart();
    }
  }
  // ---Receipt
  async createReceipt(body: { content: string }) {
    console.log(body);
    const res = await fetch(this.baseUrl + 'receiptFile', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
  }
  async downloadReceipt() {
    const res = await fetch(this.baseUrl + 'downloadReceip', {
      method: 'get',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    console.log(res);
    if (!res.ok) {
      return alert('מצטערים לא יכולנו להפיק קבלה עבורך כעת אנא צור קשר בהתאם');
    }
    window.open(res.url);
    this.closeShopppingCart();
  }

  constructor(public _r: Router) {
    this.isUserLogin();
  }
}

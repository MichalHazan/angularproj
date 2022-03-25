import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.scss'],
})
export class DialogOrderComponent implements OnInit {
  constructor(public _data: DataService, public router: Router) {}
  receiptContent =
    '\r\n' + ' ' + this._data.user.firstName + "'s " + 'Receipt:' + '\r\n';

  ngOnInit(): void {
    this._data.getCart();
    this._data.cartArr.forEach((product) => {
      this.receiptContent += '\r\n' + '\r\n';
      this.receiptContent += 'Product: ' + product.productName + '   ';
      this.receiptContent += 'Amount: ' + product.amount + '   ';
      this.receiptContent += 'Price: ' + product.price + ' ₪' + '   ';
      this.receiptContent += 'Sum: ' + product.price * product.amount;
    });

    this.receiptContent += '\r\n';
    this.receiptContent += '\r\n';
    this.receiptContent += 'Total: ' + this._data.sum + ' ₪' + '   ';
    this._data.createReceipt({content: this.receiptContent})
  }


}

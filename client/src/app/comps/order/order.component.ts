import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public lastOrderDate;
  public formNotes = '';
  public isNote: boolean = false;
  public city = '';
  public street = '';
  public busyDates;
  public newBusyDates;
  public busyDays;
  public dayFor = '';
  public dateNotes = 'This day is too busy please check another one...';
  public dateProblem: boolean = false;
  minDate = new Date().toISOString().split('T')[0];

  maxDate: Date;
  search =""

  constructor(
    public _data: DataService,
    public _fb: FormBuilder,
    public router: Router,
    public dialog: MatDialog
  ) {}
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 5 && day !== 6;
  };
  openDialog() {
    const dialogRef = this.dialog.open(DialogOrderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit(): void {
    this._data.userInfo();
    this._data.getCart();

    this.orderForm = this._fb.group({
      sendCity: [this.city, Validators.required],
      sendStreet: [this.street, Validators.required],
      sendDate: ['', Validators.required],
      payEnd: ['', [Validators.required]],
    });
    this._data.getBusyDates();



  }

  getuserCityStreet() {
    this.city = this._data.user.city;
    this.street = this._data.user.street;
  }
  public checkDate() {
    for (let day of this._data.busyDates) {
      if (
        Date.parse(day.sendDate) == Date.parse(this.orderForm.value.sendDate) &&
        day.c >= 3
      ) {
        this.dateProblem = true;
      } else {
        this.dateProblem = false;
      }
    }
  }
  public async newOrder() {
   await this._data.getCart();
    if (this.dateProblem) {
      return alert(this.dateNotes);
    }
    if (
      this.orderForm.value.sendCity &&
      this.orderForm.value.sendStreet &&
      this.orderForm.value.sendDate &&
      this.orderForm.value.payEnd
    ) {
      this._data.order(this.orderForm.value);
      this.openDialog()
    } else {
      this.isNote = true;
      this.formNotes = 'You have to fill all the blanks';
    }
  }
}

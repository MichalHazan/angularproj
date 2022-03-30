import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  cities = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Ashdod',
    'Rishon LeZiyyon',
    'Petah Tikva',
    'Bnei Brak',
    'Netanya',
    'Holon',
    'Beersheba',
  ];
  step2 = false;
  msg = '';
  passwordToApproved = '';
  constructor(public _data: DataService) {}
  form = {
    userID: 9,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: 'Jerusalem',
    street: '',
  };

  nextstep() {
    console.log(this.form.userID);

    if (this.form.email == '' || this.form.password == '') {
      this._data.errorMessage = 'please fill all the ditalis';
    } else {
      if (this.form.userID < 10000000) {
        this._data.errorMessage =
          'incorrect ID (id should have at list 9 digits)';
      } else {
        if (this.passwordToApproved != this.form.password) {
          this._data.errorMessage = 'passwords are not match';
        } else {
          this._data.errorMessage = '';
          this._data.validEmail(this.form.email);
        }
      }
    }
  }
  ngOnInit(): void {}
}

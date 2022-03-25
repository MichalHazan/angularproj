import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss'],
})
export class AfterLoginComponent implements OnInit {
  constructor(public _data: DataService) {}
  ngOnInit(): void {
    this._data.isCartOpenFuncation();
    this._data.lastCart()
  }

}

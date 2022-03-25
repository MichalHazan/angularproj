import { Component, OnInit } from '@angular/core';
import Cart from 'src/app/models/cart.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public _data: DataService) { }

  Logout(){
    this._data.logout()
  }
  ngOnInit(): void {
  }

}

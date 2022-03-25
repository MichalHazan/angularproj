import { Component, OnInit } from '@angular/core';
import { AdmindataService } from 'src/app/services/admindata.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-addp',
  templateUrl: './addp.component.html',
  styleUrls: ['./addp.component.scss']
})
export class AddpComponent implements OnInit {
  constructor(public _admindata: AdmindataService, public _data: DataService) {}

  ngOnInit(): void {
    this._data.getcategories();
  }
  tonumber(v) {
    return parseFloat(v);
  }

}

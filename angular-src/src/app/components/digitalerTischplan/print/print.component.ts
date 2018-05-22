import {Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { TischplanComponent } from '../tischplan.component';
import { Table } from '../../../../../Table';

@Component({
  selector: 'app-print',
  templateUrl: 'print.component.html',
  styleUrls: ['../tischplan.component.css']
})

export class PrintComponent {

  @Input('tables') tables: Table[];
  @Input('dateGeneratedListe') dateGeneratedListe: string;
  @Input('showRestaurantBool') showRestaurantBool: string;
  @Input('tablesRestaurant') tablesRestaurant: string;
  @Input('erwRestaurant') erwRestaurant: string;
  @Input('ki1Restaurant') ki1Restaurant: string;
  @Input('ki2Restaurant') ki2Restaurant: string;

  @Output()
  getTablesOccupied:EventEmitter<number> = new EventEmitter();
  @Output()
  getTablesforAzListe:EventEmitter<any> = new EventEmitter();

  tempTablesArray: any[] = [];
  tempTablesArray2:  any[] = [];
  tempTablesArray1: any[] = [];
  tempTablesArray3: any[] = [];
  uniqueTables: any[] = [];
  tablesOccupied: number;
  tableNumbers: any[] = [];
  info: boolean;
  tableTemp: any[] = [];
  object: any;

  ngOnInit() {
  }


  constructor(){
    this.info = false;
  }

  public formatAzListe(tables) {

    this.tables = tables;
    this.tableNumbers = [];
    this.uniqueTables = [];
    this.tableTemp = [];

    console.log("this.tables");
    console.log(this.tables);

    //(<any>Object).assign( this.photos, photos )

    for (let i: number = 0; i < this.tables.length; i++) {
      if (this.tables[i].groups) {
        for (let j: number = 0; j < this.tables[i].groups.length; j++) {

          let tempObject = {
            number: this.tables[i].number,
            department: this.tables[i].department,
            bgColor: this.tables[i].bgColor,
            isBesetzt: this.tables[i].isBesetzt,
            placeholder: this.tables[i].placeholder,
            border: this.tables[i].border,
          };
          this.object = Object.assign(this.tables[i].groups[j], tempObject);
          //console.log("this.object");
          //console.log(this.object);
          this.tableTemp.push(this.object);
        }
      }
    }

    //console.log("this.tableTemp");
    //console.log(this.tableTemp);

    this.tables =  this.tableTemp.sort(function(a, b) {
      let nameA = "";
      let nameB = "";
      if (typeof a.name1Value !== "undefined" && a.name1Value !== null) {
        nameA = a.name1Value.toUpperCase(); // ignore upper and lowercase
      }
      if (typeof b.name1Value !== "undefined" && b.name1Value !== null) {
        nameB = b.name1Value.toUpperCase(); // ignore upper and lowercase
      }
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
      //}
    });

    for (let i: number = 0; i < this.tables.length; i++) {
      //console.log(i);
      if ("name1Value" in this.tables[i]) {
        //console.log("--->" + i);
        this.tableNumbers.push(this.tables[i].number);
      }
    }

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    this.uniqueTables = this.tableNumbers.filter( onlyUnique );
    this.tablesOccupied = this.uniqueTables.length;

    this.getTablesOccupied.emit(this.tablesOccupied);
    this.getTablesforAzListe.emit(this.tables);

    //console.log(this.tableTemp);
    //console.log(this.tables);
    console.log("this.tablesOccupied" + this.tablesOccupied);

    //console.log(tables);

  }

  getStyle(a) {
    //console.log("a");
    //console.log(a);
    if (typeof a === "undefined") {
      return "solid 3px rgb(243, 239, 228)";
    } else {
      for (let b = 0; b < a.length; b++) {
        //console.log("LOOOOOOOOOOOOOOP");
        //console.log(a[b].traceValue);
        if (a[b].pinfo1Value != "" || a[b].pinfo2Value != "" || a[b].pinfo3Value != "" || a[b].pinfo4Value != "" || a[b].newInfoText ) {
          this.info = true;
        }
      }
      if (this.info) {
        this.info = false;
        return "solid 3px red";
      } else {
        return "solid 3px rgb(243, 239, 228)";
      }
    }
  }
}

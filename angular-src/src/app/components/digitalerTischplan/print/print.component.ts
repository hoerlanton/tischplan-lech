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
  sumOfGuests: any[] = [];
  sumErwRestaurant: number;
  sumKi1Restaurant: number;
  sumKi2Restaurant: number;
  sumOfGuestsHP: any[] = [];
  sumOfGuestsF: any[] = [];
  sumErwRestaurantHP: number;
  sumKi1RestaurantHP: number;
  sumKi2RestaurantHP: number;
  sumErwRestaurantF: number;
  sumKi1RestaurantF: number;
  sumKi2RestaurantF: number;

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
    this.sumOfGuests = [0,0,0];
    this.sumErwRestaurant = 0;
    this.sumKi1Restaurant = 0;
    this.sumKi2Restaurant = 0;
    this.sumOfGuestsF = [0,0,0];
    this.sumErwRestaurantF = 0;
    this.sumKi1RestaurantF = 0;
    this.sumKi2RestaurantF = 0;
    this.sumOfGuestsHP = [0,0,0];
    this.sumErwRestaurantHP = 0;
    this.sumKi1RestaurantHP = 0;
    this.sumKi2RestaurantHP = 0;

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

           this.sumOfGuests = this.tables[i].groups[j].personenAnzahlValue.match(/\d+/g);
           if (this.tables[i].groups[j].kategorieValue.indexOf("H") != -1) {
             this.sumOfGuestsHP = this.tables[i].groups[j].personenAnzahlValue.match(/\d+/g);
           } else if (this.tables[i].groups[j].kategorieValue.indexOf("F") != -1) {
             this.sumOfGuestsF = this.tables[i].groups[j].personenAnzahlValue.match(/\d+/g);
           }

          if (this.sumOfGuestsHP != null) {
            //console.log(erwKi);
            this.sumErwRestaurantHP += Number(this.sumOfGuestsHP[0]);
            this.sumKi1RestaurantHP += Number(this.sumOfGuestsHP[1]);
            this.sumKi2RestaurantHP += Number(this.sumOfGuestsHP[2]);

            //console.log("this.object");
            //console.log(this.object);
            this.sumOfGuestsHP = [0,0,0];
          }

          if (this.sumOfGuestsF != null) {
            console.log(this.sumOfGuestsF);
            this.sumErwRestaurantF += Number(this.sumOfGuestsF[0]);
            this.sumKi1RestaurantF += Number(this.sumOfGuestsF[1]);
            this.sumKi2RestaurantF += Number(this.sumOfGuestsF[2]);

            //console.log("this.object");
            //console.log(this.object);
            this.sumOfGuestsF = [0,0,0];
          }

          if (this.sumOfGuests != null) {
            //console.log(erwKi);
            this.sumErwRestaurant += Number(this.sumOfGuests[0]);
            this.sumKi1Restaurant += Number(this.sumOfGuests[1]);
            this.sumKi2Restaurant += Number(this.sumOfGuests[2]);

            //console.log("this.object");
            //console.log(this.object);
          }
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
        if (a[b].pinfo1Value != "" || a[b].pinfo2Value != "" || a[b].pinfo3Value != "" || a[b].newInfoText ) {
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

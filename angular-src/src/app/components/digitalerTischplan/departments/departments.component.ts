import { Component, OnInit, Input, ViewChild, Output, EventEmitter, Injectable, AfterViewInit, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
import { TischplanService } from '../../../services/tischplan.service';
import { Table } from '../../../../../Table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NavService }   from '../../../services/tables.service';
import { TischplanComponent } from '../tischplan.component';
import { DragulaService } from "ng2-dragula";
import { Http, Headers } from '@angular/http';
import {RestaurantComponent} from "./restaurant/restaurant.component";

@Component({
  selector: 'app-departments',
  templateUrl: 'departments.component.html',
  styleUrls: ['../tischplan.component.css']
})

export class DepartmentsComponent {

  @Input('tables') tables: any;
  @Input('tablesRestaurant') tablesRestaurant: Table[];
  @Input('showRestaurantBool') showRestaurantBool: boolean;
  @Input('showAlleBool') showAlleBool: boolean;
  @Input() tablesTempAbreise: any;
  @Input('term') term: string;

  @ViewChild(RestaurantComponent)
  private restaurantComponent: RestaurantComponent;

  @Output()
  dispensedRestaurant:EventEmitter<any> = new EventEmitter();
  @Output()
  updateAzList:EventEmitter<any> = new EventEmitter();
  @Output()
  updateImHausListeElement:EventEmitter<any> = new EventEmitter();
  dateTodayGenerated: any;
  parts: any[] = [];
  date: any[] = [];
  parsedDate: any[] = [];
  a: any;
  b: any;
  tablesChangeBgColorIfAnreise: any;

  constructor( private tischplanService: TischplanService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  occupied(table) {
    console.log("table.j");
    console.log(table.j);
    console.log("table.table");
    console.log(table.table);
    this.occupy(table.table, table.j);
  }

  occupy(table, j) {
    this.tischplanService.dispenseTable(table).subscribe(response => {
      console.log("Dispense Table:");
      console.log("bgColor:" + JSON.stringify(response[0].tables[j].bgColor));
      console.log("isBesetzt:" + JSON.stringify(response[0].tables[j].isBesetzt));
      console.log("isBesetzt:" + JSON.stringify(response[0].tables[j].department));
      if (response === null) {
        return;
      } else {
        response[0].tables.sort(function (a, b) {
          if (Number(a.number) < Number(b.number))
            return -1;
          if (Number(a.number) > Number(b.number))
            return 1;
          return 0;
        });
        if (response[0].tables[j].department === "Restaurant") {
          this.dispensedRestaurant.emit(response[0].tables);
        }
      }
    }, error => console.log("Error: ", error),
        () => {
          console.log(table);
          this.updateAzList.emit();
          if (table.length > 1) {
            for (let i = 0; i < table.length; i++) {
              this.updateImHausListeElement.emit(table[i].table);
            }
          } else {
            console.log("______________________________");
            if (table.constructor === Array) {
              console.log("isarray");
              this.updateImHausListeElement.emit(table[0].table);
            } else {
              this.updateImHausListeElement.emit(table);
            }
          }
    });

    this.tischplanService.addPlaceholder(table).subscribe(response => {
      console.log("Add placeholder!");
      console.log("placeholder:" + JSON.stringify(response[0].tables[j].placeholder));
      //console.log(this.tablesSonnbergZirbn[j].placeholder);
      if (response === null) {
        return;
      } else {
        {
           if (response[0].tables[j].department === "Restaurant") {
            this.tablesRestaurant[j].placeholder = response[0].tables[j].placeholder;
          }
        }
      }
    });
  }

  addInformationToTable(dataString, arrayIndex) {
    console.log("dataString");
    console.log(dataString);
    this.tischplanService.addInformationToTable(dataString)
      .subscribe(response => {
          // let arrayIndex = response[1];
          console.log("RESPONSE addInformationToTable:" + JSON.stringify(response));
          if (response === null) {
            return;
          } else {
             if (response[0].department === "Restaurant") {
              this.dispensedRestaurant.emit(response[0].tables);
            }
          }
        }
        // console.log(this.tablesSonnbergZirbn[arrayIndex]);
      )
  };

  occupyTableOnDrop(dataString, arrayIndex) {
    console.log("Occupy Table!");
    console.log(dataString);
    this.tischplanService.occupyTable(dataString)
      .subscribe(response => {
        //let arrayIndex = response[1];
        //console.log("arrayIndex:" + arrayIndex);
        //console.log("bgColor:" + JSON.stringify(response[0].tables[arrayIndex].bgColor));

        console.log("Response occupyTable:" + JSON.stringify(response));
        if (response === null) {
          return;
        } else {
           if (response.tables[0].department === "Restaurant") {
            this.tablesRestaurant[arrayIndex] = response.tables[0];
          }
        }
        this.updateAzList.emit();
      });
  }

  changeBgColorIfAnreise() {
    setTimeout(() => {
      this.tablesChangeBgColorIfAnreise = this.tablesTempAbreise;
      //console.log('=================================================changeBgColorIfAnreise');
      //console.log(this.tablesChangeBgColorIfAnreise);
      this.dateTodayGenerated = new Date();
      this.parts = [];
      this.parsedDate = [];
      this.date = [];

      for (let a = 0; a < this.tablesChangeBgColorIfAnreise.length; a++) {
        for (let b = 0; b < this.tablesChangeBgColorIfAnreise[a].tables.length; b++) {
          if (this.tablesChangeBgColorIfAnreise[a].tables[b].groups) {
            for (let c = 0; c < this.tablesChangeBgColorIfAnreise[a].tables[b].groups.length; c++) {
              if (this.tablesChangeBgColorIfAnreise[a].tables[b].groups[c].anreiseValue) {
                //console.log('tablesChangeBgColorIfAnreise[a].tables[b].groups[c].anreiseValue: ' + c + " " + this.tablesChangeBgColorIfAnreise[a].tables[b].groups[c].anreiseValue);
                this.parts[0] = this.tablesChangeBgColorIfAnreise[a].tables[b].groups[c].anreiseValue.match(/(\d+)/g);
              } else {
                this.parts[0] = "undefined";
              }
              if (this.parts[0]) {
                this.date[0] = new Date(2018, this.parts[0][1] - 1, this.parts[0][0]);
                this.parsedDate[0] = String(this.date[0]).substring(0, 15);
              }
              // note parts[1]-1
              // console.log('parts[2]' + parts[2] + 'parts[1]' + (parts[1] - 1) + 'parts[0]' + parts[0]);
              // Mon May 31 2010 00:00:00
              // this.tablesRestaurant[j].anreiseValue
              let dateToday = String(this.dateTodayGenerated).substring(0, 15);
              //console.log('Parsed Date --->: ' + this.parsedDate[0]);
              //console.log('this.dateGenerated --->: ' + dateToday);
              if (dateToday.indexOf(this.parsedDate[0]) !== -1) {
                 if (this.tablesChangeBgColorIfAnreise[a].department === "Restaurant") {
                  if (this.tablesRestaurant[b]) {
                    this.tablesRestaurant[b].bgColor = "#0a7a74";
                  }
                }
              }
            }
          }
        }
      }
    }, 1000);
  }

  transform(term) {
        if (this.showRestaurantBool) {
       this.restaurantComponent.transform(this.tablesRestaurant, term);
       }
    }
}

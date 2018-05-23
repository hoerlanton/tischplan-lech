import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Table } from '../../../../../Table';
import { TischplanService } from '../../../services/tischplan.service';
import { NavService }   from '../../../services/tables.service';

@Component({
  selector: 'app-tableplan',
  templateUrl: 'tableplan.component.html',
  styleUrls: ['../tischplan.component.css']
})

export class TableplanComponent implements AfterViewInit {
  @Input('tablesRestaurant') tablesRestaurant: Table[];
  @Input('showRestaurantBool') showRestaurantBool: boolean;
  @Input('showTablePlanBool') showTablePlanBool: boolean;
  @Output()
  movedRestaurant: EventEmitter<any> = new EventEmitter();
  @Output()
  changeBgColorIfAnreise: EventEmitter<any> = new EventEmitter();
  @Output()
  erwRestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  ki1RestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  ki2RestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  ki3RestaurantExport:EventEmitter<any> = new EventEmitter();
  @Output()
  ki4RestaurantExport:EventEmitter<any> = new EventEmitter();

  buttonMoveTable: string;
  buttonInfo: string;
  buttonHinzufuegen: string;
  buttonEntfernen: string;
  Info: boolean;
  erwRestaurant: any[] = [];
  ki1Restaurant: any[] = [];
  ki2Restaurant: any[] = [];
  ki3Restaurant: any[] = [];
  ki4Restaurant: any[] = [];

  constructor(private tischplanService: TischplanService, private _navService: NavService) {
    this.buttonMoveTable = "ff0000";
    this.buttonInfo = "ffffff";
    this.buttonHinzufuegen = "ffffff";
    this.buttonEntfernen = "ffffff";
    this.Info = false;
  }

  ngAfterViewInit() {
  }

  addTable(table, j) {
    console.log("moveTable clicked");
    console.log('table :' + table.number + 'j' + j);
    this.tischplanService.addTable(table).subscribe(response => {

      for (let a = 0; a < response[0].tables.length; a++) {
        response[0].tables.sort(function (a, b) {
          if (a.number < b.number)
            return -1;
          if (a.number > b.number)
            return 1;
          return 0;
        });
      }

      console.log('Response:' + JSON.stringify(response));
      //console.log("topValue:" + JSON.stringify(response[0].tables[0].topValue));
      console.log("topValue:" + JSON.stringify(response[0].tables[j].topValue));
      console.log("leftValue:" + JSON.stringify(response[0].tables[j].leftValue));
      console.log("response[0].tables.department" + response[0].tables[j].department);

      if (response === null) {
        return;
      } else {
         if (response[0].tables[j].department === "Restaurant") {
          this.movedRestaurant.emit(response[0].tables);
          //this.tablesRestaurant = response[0].tables;
        }
      }
      this.changeBgColorIfAnreise.emit();
    });
  }

  removeTable(table, j) {
    console.log("moveTable clicked");
    console.log('table :' + table.number + 'j' + j);
    this.tischplanService.removeTable(table).subscribe(response => {

      for (let a = 0; a < response[0].tables.length; a++) {
        response[0].tables.sort(function (a, b) {
          if (a.number < b.number)
            return -1;
          if (a.number > b.number)
            return 1;
          return 0;
        });
      }

      console.log('Response:' + JSON.stringify(response));
      //console.log("topValue:" + JSON.stringify(response[0].tables[0].topValue));
      console.log("topValue:" + JSON.stringify(response[0].tables[j].topValue));
      console.log("leftValue:" + JSON.stringify(response[0].tables[j].leftValue));
      console.log("response[0].tables.department" + response[0].tables[j].department);
      if (response === null) {
        return;
      } else {
         if (response[0].tables[j].department === "Restaurant") {
          this.movedRestaurant.emit(response[0].tables);
          //this.tablesRestaurant = response[0].tables;
        }
      }
      this.changeBgColorIfAnreise.emit();
    });
  }

  getStyle(a) {
    //console.log("a");
    //console.log(a);
    if (typeof a === "undefined") {
      return "solid 3px rgb(243, 239, 228)";
    } else {
      for (let b = 0; b < a.length; b++) {
        //console.log("LOOOOOOOOOOOOOOP");
        //console.log(a[b].InfoValue);
        if (a[b].pinfo1Value != "" || a[b].pinfo2Value != "" || a[b].pinfo3Value != "" || a[b].newInfoText) {
          this.Info = true;
        }
      }
      if (this.Info) {
        this.Info = false;
        return "solid 3px red";
      } else {
        return "solid 3px rgb(243, 239, 228)";
      }
    }
  }

  none(event) {
    event.stopPropagation();
  }

  mouseEnterMoveTableButton() {
    console.log("mouse enter : ");
    if (this.buttonMoveTable === "ff0000") {
      console.log('mouse enter1 :');
      this.buttonMoveTable = "bc0000";
    }
  }

  mouseLeaveMoveTableButton() {
    if (this.buttonMoveTable === "bc0000") {
      console.log('mouse leave1 :');
      this.buttonMoveTable = "ff0000";
    }
  }

  mouseEnterInfoButton() {
    console.log("mouse enter : ");
    if (this.buttonInfo === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonInfo = "cfcfcf";
    }
  }

  mouseLeaveInfoButton() {
    if (this.buttonInfo === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonInfo = "ffffff";
    }
  }

  mouseEnterHinzufuegenButton() {
    console.log("mouse enter : ");
    if (this.buttonHinzufuegen === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonHinzufuegen = "cfcfcf";
    }
  }

  mouseLeaveHinzufuegenButton() {
    if (this.buttonHinzufuegen === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonHinzufuegen = "ffffff";
    }
  }

  mouseEnterEntfernenButton() {
    console.log("mouse enter : ");
    if (this.buttonEntfernen === "ffffff") {
      console.log('mouse enter1 :');
      this.buttonEntfernen = "cfcfcf";
    }
  }

  mouseLeaveEntfernenButton() {
    if (this.buttonEntfernen === "cfcfcf") {
      console.log('mouse leave1 :');
      this.buttonEntfernen = "ffffff";
    }
  }

  getStyleInfo(j) {
    if (j != "") {
      return "solid 3px red";
    } else {
      return "";
    }
  }

  sumUpPersonenAnzahl(){
    console.log("sumUpPersonenAnzahl called");
    if (this.tablesRestaurant) {
      for (let p = 0; p < this.tablesRestaurant.length; p++) {
        this.erwRestaurant[p] = 0;
        this.ki1Restaurant[p] = 0;
        this.ki2Restaurant[p] = 0;
        if (this.tablesRestaurant[p].groups) {
          for (let g = 0; g < this.tablesRestaurant[p].groups.length; g++) {
            if (this.tablesRestaurant[p].groups[g].personenAnzahlValue) {
              let erwKi = this.tablesRestaurant[p].groups[g].personenAnzahlValue.match(/\d+/g);
              if (erwKi != null) {
                //console.log(erwKi);
                this.erwRestaurant[p] = this.erwRestaurant[p] + Number(erwKi[0]);
                this.ki1Restaurant[p] = this.ki1Restaurant[p] + Number(erwKi[1]);
                this.ki2Restaurant[p] = this.ki2Restaurant[p] + Number(erwKi[2]);
                //console.log(this.erw[p]);
              }
            }
          }
        }
      }
    }
    this.erwRestaurantExport.emit(this.erwRestaurant);
    this.ki1RestaurantExport.emit(this.ki1Restaurant);
    this.ki2RestaurantExport.emit(this.ki2Restaurant);
  }
}

import { Component, ViewChild} from '@angular/core';
import { TischplanService } from '../../services/tischplan.service';
import { DragulaService } from "ng2-dragula";
import { ImHausListe } from '../../../../ImHausListe';
import { Table } from '../../../../Table';
import { PrintComponent }  from './print/print.component';
import { DepartmentmenuComponent }  from './departmentmenu/departmentmenu.component';
import { FormComponent }  from './form/form.component';
import { ImHausListeComponent } from './im-haus-liste/im-haus-liste.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TableplanComponent } from './tableplan/tableplan.component';
import { DepartmentsComponent } from './departments/departments.component';
import { NavService }   from '../../services/tables.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tischplan',
  templateUrl: 'tischplan.component.html',
  styleUrls: ['tischplan.component.css']
})

export class TischplanComponent {
  @ViewChild(PrintComponent)
  private printComponent: PrintComponent;
  @ViewChild(DepartmentmenuComponent)
  private departmentmenuComponent: DepartmentmenuComponent;
  @ViewChild(FormComponent)
  private formComponent: FormComponent;
  @ViewChild(DepartmentsComponent)
  private departmentsComponent: DepartmentsComponent;
  @ViewChild(ImHausListeComponent)
  private imHausListeComponent: ImHausListeComponent;
  @ViewChild(NavigationComponent)
  private navigationComponent: NavigationComponent;
  @ViewChild(TableplanComponent)
  private tableplanComponent: TableplanComponent;

  //item: any;
  subscription: Subscription;
  buttonBgColor1: string;
  buttonBgColor2: string;
  buttonBgColor3: string;
  buttonBgColor4: string;
  buttonBgColor5: string;
  fontColor1: string;
  fontColor2: string;
  fontColor3: string;
  fontColor4: string;
  fontColor5: string;
  buttonBgColorInfoForm: string;
  buttonBgColorNotizForm: string;
  fontColorInfoForm: string;
  fontColorNotizForm: string;
  showInfoshowNotizFormBoolFormBool: boolean;
  showNotizFormBool: boolean;
  showAlleBool: boolean;
  topValues: any[] = [];
  imHausListeElemente: ImHausListe[];
  tablesTemp: any[] = [];
  tempTablesArray: any[] = [];
  tempTablesArray2: any[] = [];
  tempTablesArray1: any[] = [];
  tempTablesArray3: any[] = [];
  tracesListeElemente: any[] = [];
  tables: any[] = [];
  uniqueTables: any[] = [];
  tablesSonnbergZirbn: Table[] = [];
  tablesPanorama: Table[] = [];
  tablesRestaurant: Table[] = [];
  tablesWintergarten: Table[] = [];
  filesToUpload: Array<File> = [];
  isDropped: any[] = [];
  showSonnbergZirbnBool: boolean;
  showPanoramaBool: boolean;
  showRestaurantBool: boolean;
  showWintergartenBool: boolean;
  newInformationElements: any[] = [];
  dateGenerated: any;
  title: string;
  roomNumber: string;
  tableNumber: string;
  employee: string;
  nameTraceInput: string;
  backgroundColor: string;
  dateGeneratedListe: any;
  tablesOccupied: number;
  tableNumbers: any[] = [];
  notizElements: any[] = [];
  term: string;
  dateTodayGenerated: any;
  date: any[] = [];
  parts: any[] = [];
  parsedDate: any[] = [];
  quellTisch: any;
  zielTisch: any;
  tableInformation: any[] = [];
  tablesTempAbreise: any[] = [];
  abreiseTablePlusIndex: any;
  umsetzenInfoVar: any;
  showTablePlanBool: boolean;
  buttonBgColorShowTablePlan: string;
  fontColorShowTablePlan: string;
  newInformationEmployees: any[] = [];
  history: string[] = [];
  erwSonnbergZirbn: any[] = [];
  kiSonnbergZirbn: any[] = [];
  erwPanorama: any[] = [];
  kiPanorama: any[] = [];
  erwRestaurant: any[] = [];
  kiRestaurant: any[] = [];
  erwWintergarten: any[] = [];
  kiWintergarten: any[] = [];

  constructor(private tischplanService: TischplanService, private dragulaService: DragulaService) {

    //this.subscription = this._navService.navItem$
    //  .subscribe(tables => this.tablesPanorama = tables);


    this.buttonBgColorInfoForm = "0a7a74";
    this.buttonBgColorNotizForm = "0a7a74";
    this.buttonBgColorShowTablePlan = "0a7a74";
    this.fontColorInfoForm = "f3efe4";
    this.fontColorNotizForm = "f3efe4";
    this.fontColorShowTablePlan = "f3efe4";
    this.dateGeneratedListe = new Date();
    this.buttonBgColor1 = "0a7a74";
    this.buttonBgColor2 = "0a7a74";
    this.buttonBgColor3 = "0a7a74";
    this.buttonBgColor4 = "0a7a74";
    this.buttonBgColor5 = "0a7a74";
    this.fontColor1 = "f3efe4";
    this.fontColor2 = "f3efe4";
    this.fontColor3 = "f3efe4";
    this.fontColor4 = "f3efe4";
    this.fontColor5 = "f3efe4";
    this.tablesOccupied = 0;
    this.backgroundColor = "ffffff";
    this.showSonnbergZirbnBool = false;
    this.showPanoramaBool = false;
    this.showRestaurantBool = false;
    this.showWintergartenBool = false;
    this.showAlleBool = false;
    this.term = "";

    this.tischplanService.getInformationElements()
      .subscribe(informationElemente => {
        if (informationElemente === null) {
          return;
        } else {
          this.newInformationElements = informationElemente;
          console.log(this.newInformationElements);
        }
      });

    this.tischplanService.getInformationEmployees()
      .subscribe(informationElemente => {
        if (informationElemente === null) {
          return;
        } else {

          informationElemente.sort((a,b) => 0 - (a.numberOfTraces > b.numberOfTraces ? 1 : -1));


          this.newInformationEmployees = informationElemente;
          console.log(this.newInformationEmployees);
        }
      });

    this.tischplanService.getNotizElements()
      .subscribe(informationElemente => {
        if (informationElemente === null) {
          return;
        } else {
          this.notizElements = informationElemente;
          console.log(this.notizElements);
        }
      });

    this.getTables();
    this.reloadLists();
    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private onDrag(args) {
    let [e, el] = args;
  }

  private onDrop(args) {
    let [e, el] = args;
    //console.log("Args = ");
    let information = args[0].innerText;
    //console.log("information: " + information);
    let informationElements = information.split(/\n/);
    //console.log(informationElements);
    let informationElements2 = [];
    for (let s = 0; s < informationElements.length; s++) {
      informationElements2.push(informationElements[s].split(/:(.+)/)[1]);
      if (informationElements2[s] === undefined) {
        informationElements2[s] = informationElements[s]
      }
    }
    //console.log(informationElements2);
    let department = JSON.stringify(args[1].id);
    //console.log("departement" + department);
    let departementSubstring = department.substring(1, department.length - 1);
    //console.log("departementSubstring" + departementSubstring);
    let tableNumber = args[1].innerText;
    let numbers = tableNumber.match(/\d+/g);
    //console.log("numbers: " + numbers);
    let arrayIndex = numbers[1];
    //console.log("arrayIndex: " + arrayIndex);
    let tableNumberSubstring = "";
    //console.log("tableNumber" + tableNumber);
    tableNumberSubstring = tableNumber.toString().match(/\d+/);
    //console.log("tableNumberSubstring" + tableNumberSubstring);
    let dataString = [];
    dataString.push(information + departementSubstring + tableNumberSubstring);
    console.log('dataString' + dataString);
    this.departmentsComponent.addInformationToTable(dataString, arrayIndex);
    this.departmentsComponent.occupyTableOnDrop(dataString, arrayIndex);
    this.updateImHausListeElement(informationElements2);
    this.tableplanComponent.sumUpPersonenAnzahl();
  }

  private onOver(args) {
    let [e, el, container] = args;
  }

  private onOut(args) {
    let [e, el, container] = args;
  }

  ngOnInit() {
  }

  showWintergarten() {
    this.departmentmenuComponent.showWintergarten();
  }

  transform(term){
    this.departmentsComponent.transform(term);
  }


  showRestaurant() {
    this.departmentmenuComponent.showRestaurant();
  }

  showSonnbergZirbn() {
    this.departmentmenuComponent.showWintergarten();
  }

  showPanorama() {
    this.departmentmenuComponent.showPanorama();
  }

  sendInformation(event) {
    this.formComponent.sendInformation(event);
  }

  delete(informationElement, j, event) {
    this.navigationComponent.delete(informationElement, j, event);
  }

  changeBgColorIfAnreise() {
    this.departmentsComponent.changeBgColorIfAnreise();
  }

  abreisenRemoval() {
    this.departmentsComponent.occupy(this.abreiseTablePlusIndex.abreisenExport, this.abreiseTablePlusIndex.b);
  }

  updateImHausListeElement(x) {
    this.imHausListeComponent.updateImHausListeElement(x);
  }


  umsetzen() {
    this.departmentsComponent.addInformationToTable(this.umsetzenInfoVar.tableInformationExport, this.umsetzenInfoVar.indexZiel);
    this.departmentsComponent.occupyTableOnDrop(this.umsetzenInfoVar.tableToMove, this.umsetzenInfoVar.indexZiel);

    setTimeout(() => {
      this.departmentsComponent.occupy(this.umsetzenInfoVar.tableToMove, this.umsetzenInfoVar.indexQuell);
    }, 2000);
  }

  reloadLists() {
    this.tischplanService.getImHausListe()
      .subscribe(imHausListeElemente => {
        if (imHausListeElemente === null) {
          return;
        } else {

          imHausListeElemente.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });

          this.imHausListeElemente = imHausListeElemente;
          console.log(this.imHausListeElemente);

          setTimeout(() => {
            this.imHausListeComponent.sortList();
          }, 3000);
        }
      });

  }

  updateAzList() {
    setTimeout(() => {
      this.getTables();
      setTimeout(() => {
        //console.log('this.tablesWintergarten:');
        //console.log(this.tablesWintergarten);
        this.tables = this.tablesWintergarten.concat(this.tablesRestaurant).concat(this.tablesPanorama).concat(this.tablesSonnbergZirbn);
        //console.log('this.tables: in updateAzList');
        //console.log(this.tables);
        this.printComponent.formatAzListe(this.tables);
      }, 3000);
    }, 1000);
  }

  getTables() {
    //console.log('2222222222222222222222------------------------------');
    this.tischplanService.getTables()
      .subscribe(tables => {
        if (tables === null) {
          return;
        } else {

          //console.log("tables[3].tables");
          //console.log(JSON.parse(tables[3].tables));
          /*
          for (let a = 0; a < tables.length; a++) {
            tables[a].tables.sort((a, b) => a.number - b.number); // Ascending sort
            console.log(tables[a].tables);
          }
           */
          for (let x = 0; x < tables.length; x++){
            //console.log("tables[x].department");
            //console.log(tables[x].department);
            if (tables[x].department === "Restaurant") {
              tables[x].tables.sort(function (a, b) {
                //console.log(a.number);
                //console.log(b.number);
                if (Number(a.number) < Number(b.number))
                  return -1;
                if (Number(a.number) > Number(b.number))
                  return 1;
                return 0;
              });
            }
            }


          /*
          let testTables = [{ number: "512"}, {number: "501"}, {number:  "505"}, {number:  "507"}, {number:  "508"}, {number:  "509"}, {number:  "510"}, {number:  "511"}, {number:  "503"}, {number:  "513"}, {number:  "514"}, {number:  "515"}, {number:  "517"}, {number:  "519"}, {number:  "521"}, {number: "522"}, {number:  "523"}];

          console.log(testTables);
          testTables.sort(function (a, b) {
            console.log(a.number);
            console.log(b.number);
            if (Number(a.number) < Number(b.number))
              return -1;
            if (Number(a.number) > Number(b.number))
              return 1;
            return 0;
          });

           tables[3].tables.sort(function (a, b) {
            console.log(a.number);
            console.log(b.number);
            if (Number(a.number) < Number(b.number))
              return -1;
            if (Number(a.number) > Number(b.number))
              return 1;
            return 0;
          });

          let sortedTablesWintergarten = tables[3].tables.sort();
           */
          //console.log('sorted?:');
          //console.log(sortedArray);
          //console.log(tables[3].tables);
          //console.log(sortedTablesWintergarten);
          //console.log(testTables);

          for (let a = 0; a < tables.length; a++) {
            if (tables[a].department === "Panorama") {
              this.tablesPanorama = tables[a].tables;
            }
            else if (tables[a].department === "Wintergarten") {
              this.tablesWintergarten = tables[a].tables;
              //console.log('Test' + JSON.stringify(this.tablesWintergarten));
            }
            else if (tables[a].department === "Sonnberg-Zirbn") {
              this.tablesSonnbergZirbn = tables[a].tables;
            }
            else if (tables[a].department === "Restaurant") {
              this.tablesRestaurant = tables[a].tables;
            }
          }
          //console.log(this.tablesPanorama);
          //console.log(this.tablesWintergarten);
          //console.log(this.tablesSonnbergZirbn);
          //console.log(this.tablesRestaurant);
          this.changeBgColorIfAnreise();
        }

        this.tablesTempAbreise = tables;
        this.tables = this.tablesWintergarten.concat(this.tablesRestaurant).concat(this.tablesPanorama).concat(this.tablesSonnbergZirbn);
        this.printComponent.formatAzListe(this.tables);
        setTimeout(() => {
          this.tableplanComponent.sumUpPersonenAnzahl();
        }, 1000);

        //console.log("this.tables");
        //console.log(this.tables);
      });
  }
}

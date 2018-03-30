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
  buttonBgColor1: string;
  fontColor1: string;
  buttonBgColorInfoForm: string;
  buttonBgColorNotizForm: string;
  fontColorInfoForm: string;
  fontColorNotizForm: string;
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
  tablesRestaurant: Table[] = [];
  filesToUpload: Array<File> = [];
  isDropped: any[] = [];
  showRestaurantBool: boolean;
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
  date: any[] = [];
  parts: any[] = [];
  parsedDate: any[] = [];
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
  ki1Restaurant: any[] = [];
  ki2Restaurant: any[] = [];
  ki3Restaurant: any[] = [];
  ki4Restaurant: any[] = [];
  erwWintergarten: any[] = [];
  kiWintergarten: any[] = [];

  constructor(private tischplanService: TischplanService, private dragulaService: DragulaService) {
    this.buttonBgColorInfoForm = "0a7a74";
    this.buttonBgColorNotizForm = "0a7a74";
    this.buttonBgColorShowTablePlan = "0a7a74";
    this.fontColorInfoForm = "f3efe4";
    this.fontColorNotizForm = "f3efe4";
    this.fontColorShowTablePlan = "f3efe4";
    this.dateGeneratedListe = new Date();
    this.buttonBgColor1 = "0a7a74";
    this.fontColor1 = "f3efe4";
    this.tablesOccupied = 0;
    this.backgroundColor = "ffffff";
    this.showRestaurantBool = false;
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
          informationElemente.sort((a,b) => 0 - (a.numberOfInfos > b.numberOfInfos ? 1 : -1));
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
  transform(term){
    this.departmentsComponent.transform(term);
  }
  showRestaurant() {
    this.departmentmenuComponent.showRestaurant();
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
        this.tables = this.tablesRestaurant;
        //console.log('this.tables: in updateAzList');
        //console.log(this.tables);
        this.printComponent.formatAzListe(this.tables);
      }, 3000);
    }, 1000);
  }

  getTables() {
    //console.log('getTables() called');
    this.tischplanService.getTables()
      .subscribe(tables => {
        if (tables === null) {
          return;
        } else {
          //console.log("tables[3].tables");
          //console.log(JSON.parse(tables[3].tables));
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
          //console.log('sorted?:');
          //console.log(sortedArray);
          //console.log(tables[3].tables);
          //console.log(sortedTablesWintergarten);
          //console.log(testTables);
          for (let a = 0; a < tables.length; a++) {
             if (tables[a].department === "Restaurant") {
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
        this.tables = this.tablesRestaurant;
        this.printComponent.formatAzListe(this.tables);
        setTimeout(() => {
          this.tableplanComponent.sumUpPersonenAnzahl();
        }, 1000);
        //console.log("this.tables");
        //console.log(this.tables);
      });
  }
}

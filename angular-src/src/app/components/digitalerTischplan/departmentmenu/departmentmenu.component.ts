import {Component, OnInit, Input, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-departmentmenu',
  templateUrl: 'departmentmenu.component.html',
  styleUrls: ['departmentmenu.component.css']
})
export class DepartmentmenuComponent implements AfterViewInit {

  @Input('buttonBgColor1') buttonBgColor1: string;
  @Input('fontColor1') fontColor1: string;
  @Input('showRestaurantBool') showRestaurantBool: boolean;
  @Output() showRestaurantBoolChange: EventEmitter<boolean> = new EventEmitter();
  @Input('buttonBgColorInfoForm') buttonBgColorInfoForm: string;
  @Input('fontColorInfoForm') fontColorInfoForm: string;
  @Input('fontColorNotizForm') fontColorNotizForm: string;
  @Input('buttonBgColorNotizForm') buttonBgColorNotizForm: string;
  @Input('buttonBgColorShowTablePlan') buttonBgColorShowTablePlan: string;
  @Input('fontColorShowTablePlan') fontColorShowTablePlan: string;
  @Input('showNotizFormBool') showNotizFormBool: boolean;
  @Input('showInfoFormBool') showInfoFormBool: boolean;
  @Input('showTablePlanBool') showTablePlanBool: boolean;
  @Output() showNotizFormBoolChange: EventEmitter<boolean> = new EventEmitter();
  @Output() showInfoFormBoolChange: EventEmitter<boolean> = new EventEmitter();
  @Output() showTablePlanBoolChange: EventEmitter<boolean> = new EventEmitter();
  showAbteilungen: boolean;
  buttonBgColorDropdownToggle: string;
  constructor() {
    this.showAbteilungen = true;
    this.buttonBgColorShowTablePlan = "0a7a74";
    this.buttonBgColorInfoForm = "0a7a74";
    this.buttonBgColorNotizForm = "0a7a74";
    this.buttonBgColorDropdownToggle = "0a7a74";
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
    showRestaurant() {
      //console.log("showRestaurant!");
      this.showRestaurantBool = true;
      this.showAbteilungen = false;

      if (this.buttonBgColor1 === "154846") {
        this.buttonBgColor1 = "0d2f2e";
      } else {
        this.buttonBgColor1 = "0a7a74";
      }
      if (this.fontColor1 === "f3efe4") {
        this.fontColor1 = "0a7a74";
      } else {
        this.fontColor1 = "f3efe4";
      }
      this.showRestaurantBoolChange.emit(this.showRestaurantBool);
    }
  showInfoForm() {
    console.log("showTraceForm!");

    this.showNotizFormBool = false;
    this.showInfoFormBool = true;
    this.showTablePlanBool = false;

    if (this.buttonBgColorInfoForm === "154846") {
      this.buttonBgColorInfoForm = "0d2f2e";
      this.buttonBgColorNotizForm = "0a7a74";
      this.buttonBgColorShowTablePlan = "0a7a74";
    } else {
      this.buttonBgColorInfoForm = "0a7a74";
    }
    if (this.fontColorInfoForm === "f3efe4") {
      this.fontColorInfoForm = "0a7a74";
      this.fontColorNotizForm = "f3efe4";
      this.fontColorShowTablePlan = "f3efe4";
    } else {
      this.fontColorInfoForm = "f3efe4";
    }
    this.showNotizFormBoolChange.emit(this.showNotizFormBool);
    this.showInfoFormBoolChange.emit(this.showInfoFormBool);
    this.showTablePlanBoolChange.emit(this.showTablePlanBool);
  }

  showNotizForm() {
    //console.log("showNotizForm!");
    this.showNotizFormBool = true;
    this.showTablePlanBool = false;
    this.showInfoFormBool = false;

    if (this.buttonBgColorNotizForm === "154846") {
      this.buttonBgColorNotizForm = "0d2f2e";
      this.buttonBgColorInfoForm = "0a7a74";
      this.buttonBgColorShowTablePlan = "0a7a74";
    } else {
      this.buttonBgColorNotizForm = "0a7a74";
    }
    if (this.fontColorNotizForm === "f3efe4") {
      this.fontColorNotizForm = "0a7a74";
      this.fontColorInfoForm = "f3efe4";
      this.fontColorShowTablePlan = "f3efe4";
    } else {
      this.fontColorNotizForm = "f3efe4";
    }
    this.showNotizFormBoolChange.emit(this.showNotizFormBool);
    this.showInfoFormBoolChange.emit(this.showInfoFormBool);
    this.showTablePlanBoolChange.emit(this.showTablePlanBool);
  }
  showTablePlan(){
    //console.log("showTablePlan!");
    this.showNotizFormBool = false;
    this.showTablePlanBool = true;
    this.showInfoFormBool = false;

    if (this.buttonBgColorShowTablePlan = "154846") {
      this.buttonBgColorShowTablePlan = "0d2f2e";
      this.buttonBgColorNotizForm = "0a7a74";
      this.buttonBgColorInfoForm = "0a7a74";
    } else {
      this.buttonBgColorShowTablePlan = "0a7a74";
    }
    if (this.fontColorShowTablePlan = "f3efe4") {
      this.fontColorShowTablePlan = "0a7a74";
      this.fontColorNotizForm = "f3efe4";
      this.fontColorInfoForm = "f3efe4";
    } else {
      this.fontColorShowTablePlan = "0a7a74";
    }
    this.showNotizFormBoolChange.emit(this.showNotizFormBool);
    this.showInfoFormBoolChange.emit(this.showInfoFormBool);
    this.showTablePlanBoolChange.emit(this.showTablePlanBool);
  }

  mouseEnterShowInfoForm() {
    //console.log("mouse enter : ");
    if (this.buttonBgColorInfoForm === "0a7a74") {
      //console.log('mouse enter1 :');
      this.buttonBgColorInfoForm = "154846";
    }
  }

  mouseLeaveShowInfoForm() {
    if (this.buttonBgColorInfoForm === "0a7a74") {
      //console.log('mouse leave1 :');
      this.buttonBgColorInfoForm = "154846";
    } else if (this.buttonBgColorInfoForm === "154846") {
      //console.log('mouse leave2 :');
      this.buttonBgColorInfoForm = "0a7a74";
    }
  }

  mouseEnterShowNotizForm() {
    //console.log("mouse enter : ");
    if (this.buttonBgColorNotizForm === "0a7a74") {
      //console.log('mouse enter1 :');
      this.buttonBgColorNotizForm = "154846";
    }
  }

  mouseLeaveShowNotizForm() {
    if (this.buttonBgColorNotizForm === "0a7a74") {
      //console.log('mouse leave1 :');
      this.buttonBgColorNotizForm = "154846";
    } else if (this.buttonBgColorNotizForm === "154846") {
      //console.log('mouse leave2 :');
      this.buttonBgColorNotizForm = "0a7a74";
    }
  }

  mouseEnterShowTablePlan() {
    //console.log("mouse enter mouseEnterShowTablePlan: ");
    if (this.buttonBgColorShowTablePlan === "0a7a74") {
      //console.log('mouse enter1 mouseEnterShowTablePlan:');
      this.buttonBgColorShowTablePlan = "154846";
    }
  }

  mouseLeaveShowTablePlan() {
    if (this.buttonBgColorShowTablePlan === "0a7a74") {
      //console.log('mouse leave1 mouseEnterShowTablePlan:');
      this.buttonBgColorShowTablePlan = "154846";
    } else if (this.buttonBgColorShowTablePlan === "154846") {
      //console.log('mouse leave2 mouseEnterShowTablePlan:');
      this.buttonBgColorShowTablePlan = "0a7a74";
    }
  }


  mouseEnterDropdownToggle() {
    //console.log("mouse enter mouseEnterShowTablePlan: ");
    if (this.buttonBgColorDropdownToggle === "0a7a74") {
      //console.log('mouse enter1 mouseEnterShowTablePlan:');
      this.buttonBgColorDropdownToggle = "154846";
    }
  }

  mouseLeaveDropdownToggle() {
    if (this.buttonBgColorDropdownToggle === "0a7a74") {
      //console.log('mouse leave1 mouseEnterShowTablePlan:');
      this.buttonBgColorDropdownToggle = "154846";
    } else if (this.buttonBgColorDropdownToggle === "154846") {
      //console.log('mouse leave2 mouseEnterShowTablePlan:');
      this.buttonBgColorDropdownToggle = "0a7a74";
    }
  }

  mouseEnterRestaurant() {
    //console.log("mouse enter mouseEnterShowTablePlan: ");
    if (this.buttonBgColor1 === "0a7a74") {
      //console.log('mouse enter1 mouseEnterShowTablePlan:');
      this.buttonBgColor1 = "154846";
    }
  }

  mouseLeaveRestaurant() {
    if (this.buttonBgColor1 === "0a7a74") {
      //console.log('mouse leave1 mouseEnterShowTablePlan:');
      this.buttonBgColor1 = "154846";
    } else if (this.buttonBgColor1 === "154846") {
      //console.log('mouse leave2 mouseEnterShowTablePlan:');
      this.buttonBgColor1 = "0a7a74";
    }
  }
}



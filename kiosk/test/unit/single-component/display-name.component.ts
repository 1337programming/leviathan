import {Component, Input} from '@angular/core';

@Component({
  selector: 'display-name',
  templateUrl: './my-template.html'
})

export class DisplayName {
  
  @Input() public firstName: string;
  @Input() public lastName: string;
  
  public fullName: string;
  
  public generateFullName() {
    this.fullName = this.firstName + ' ' + this.lastName;
  }
}

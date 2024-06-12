import { Component, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MyObj } from './model/my-obj';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-child',
  standalone: true,
  template: `
    <div style="border: 2px dotted brown; padding: 1rem; margin-top: 1rem;">
      <h3>Child component</h3>
      <div style="display: flex; margin: 0.5rem 0; justify-content: space-between; gap: 0.5rem">
        <input placeholder="prop1" style="flex-basis: 100%" [(ngModel)]="prop1" />
        <input placeholder="prop2" style="flex-basis: 100%" [(ngModel)]="prop2" />
        <button (click)="onClick()" style="flex-basis: 100%">Update</button>
      </div>
      <h4 style="font-style: italic">myObj:</h4> 
      <pre>{{ myObjModel() | json }}</pre>
    </div>
  `,
})
export class Child {
  checked = model(false);
  myObjModel = model<MyObj>();
  public prop1: string = '';
  public prop2: string = '';

  onMyModelChange(event: MyObj) {
    this.myObjModel.set(event);
    console.log('this.myObjModel changed in child:', this.myObjModel());
    this.doThings(event);
  }

  doThings(event: MyObj) {
    console.log('I changed value in: ', event);
  }

  onClick() {
    this.checked.set(!this.checked());

    const obj: MyObj = {
      prop1: this.prop1,
      prop2: this.prop2,
    };

    this.onMyModelChange(obj);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { Child } from './child';
import { MyObj } from './model/my-obj';
import 'zone.js';

@Component({
  imports: [CommonModule, FormsModule, Child],
  selector: 'app-root',
  standalone: true,
  template: `
    <div style="border: 2px dotted teal; padding: 1rem; margin: 1rem">
      <h3>Parent component</h3>
      <div style="display: flex; margin: 0.5rem 0; justify-content: space-between; gap: 0.5rem">
        <input placeholder="prop1" style="flex-basis: 100%" [(ngModel)]="prop1" />
        <input placeholder="prop2" style="flex-basis: 100%" [(ngModel)]="prop2" />
        <button (click)="onClick()" style="flex-basis: 100%">Update</button>
      </div>
      <h4 style="font-style: italic">myObj:</h4>
      <pre>{{ myObj | json }}</pre>
      <app-child [myObjModel]="myObj"
                 (myObjModelChange)="doSomething($event)"
                 >
      </app-child>
    </div>
  `,
})
export class App {
  public prop1: string = '';
  public prop2: string = '';

  public myObj: MyObj = {
    prop1: 'original value 1',
    prop2: 'original value 2',
  };

  doSomething(event?: MyObj) {
    if (event) {
      this.myObj = event;
    }
  }

  onClick() {
    const obj: MyObj = {
      prop1: this.prop1,
      prop2: this.prop2,
    };

    this.myObj = obj;
  }
}

bootstrapApplication(App);

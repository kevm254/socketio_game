import { Component, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'home-cmp',
  templateUrl: './home.component.html',
  styleUrls: []
})

export class HomeComponent {
  @Input() name: string;

  ngOnChanges() {
    console.log(this.name);
  }

  ngOnInit() {
    alert(this.name);
  }
}

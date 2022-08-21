import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-fligt-list',
  templateUrl: './fligt-list.component.html',
  styleUrls: ['./fligt-list.component.scss']
})
export class FligtListComponent implements OnInit {
  first: string = "";
  last: string= "";

  @Input() flights : any[] = [];

  @Output() notify: EventEmitter<{}> = new EventEmitter<{}>();
  constructor() { }

  ngOnInit(): void {
  }

  onBookFlight = (flight:{}) => {
    if (this.first === "" && this.last === "") {
      alert("Enter your first and last name");
      return;
    }
    console.log('emitted');
    this.notify.emit({first: this.first, last: this.last, flight: flight});
  }

}

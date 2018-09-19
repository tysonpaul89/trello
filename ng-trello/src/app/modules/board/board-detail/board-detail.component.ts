import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
})
export class BoardDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    console.log('dragged');
  }

  drop(ev) {
    console.log('dropped');
  }

  onCardClick(ev) {
    console.log('clicked');
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardListComponent } from './board-list/board-list.component';
import { BoardDetailComponent } from './board-detail/board-detail.component';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule
  ],
  declarations: [BoardListComponent, BoardDetailComponent]
})
export class BoardModule { }

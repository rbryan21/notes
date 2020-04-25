import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TopNavbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [TopNavbarComponent],
})
export class TopNavbarModule {}

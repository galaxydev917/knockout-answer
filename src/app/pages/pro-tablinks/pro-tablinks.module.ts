import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProTablinksPageRoutingModule } from './pro-tablinks-routing.module';

import { ProTablinksPage } from './pro-tablinks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProTablinksPageRoutingModule
  ],
  declarations: [ProTablinksPage]
})
export class ProTablinksPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProMessagesPageRoutingModule } from './pro-messages-routing.module';

import { ProMessagesPage } from './pro-messages.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProMessagesPageRoutingModule
  ],
  declarations: [ProMessagesPage]
})
export class ProMessagesPageModule {}

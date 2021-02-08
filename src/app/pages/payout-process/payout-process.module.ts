import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PayoutProcessPageRoutingModule } from './payout-process-routing.module';

import { PayoutProcessPage } from './payout-process.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PayoutProcessPageRoutingModule
  ],
  declarations: [PayoutProcessPage]
})
export class PayoutProcessPageModule {}

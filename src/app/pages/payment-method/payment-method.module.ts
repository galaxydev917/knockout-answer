import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentMethodPageRoutingModule } from './payment-method-routing.module';

import { PaymentMethodPage } from './payment-method.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    PaymentMethodPageRoutingModule
  ],
  declarations: [PaymentMethodPage]
})
export class PaymentMethodPageModule {}

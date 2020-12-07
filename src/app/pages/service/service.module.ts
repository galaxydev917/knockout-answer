import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicePageRoutingModule } from './service-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { ServicePage } from './service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ServicePageRoutingModule
  ],
  declarations: [ServicePage]
})
export class ServicePageModule {}

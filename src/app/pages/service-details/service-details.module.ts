import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { ServiceDetailsPage } from './service-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ServiceDetailsPageRoutingModule
  ],
  declarations: [ServiceDetailsPage]
})
export class ServiceDetailsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRequestPageRoutingModule } from './service-request-routing.module';

import { ServiceRequestPage } from './service-request.page';
import { ComponentsModule } from '../../components/components.module';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    StarRatingModule,
    ServiceRequestPageRoutingModule
  ],
  declarations: [ServiceRequestPage]
})
export class ServiceRequestPageModule {}

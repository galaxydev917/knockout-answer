import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailsPageRoutingModule } from './service-details-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { ServiceDetailsPage } from './service-details.page';
import { StarRatingModule } from 'ionic5-star-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    ReactiveFormsModule,
    ComponentsModule,
    ServiceDetailsPageRoutingModule
  ],
  declarations: [ServiceDetailsPage]
})
export class ServiceDetailsPageModule {}

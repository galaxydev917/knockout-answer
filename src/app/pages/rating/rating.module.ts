import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingPageRoutingModule } from './rating-routing.module';
import { StarRatingModule } from 'ionic5-star-rating';
import { ComponentsModule } from '../../components/components.module';

import { RatingPage } from './rating.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    StarRatingModule,
    RatingPageRoutingModule
  ],
  declarations: [RatingPage]
})
export class RatingPageModule {}

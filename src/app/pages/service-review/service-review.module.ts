import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceReviewPageRoutingModule } from './service-review-routing.module';

import { ServiceReviewPage } from './service-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceReviewPageRoutingModule
  ],
  declarations: [ServiceReviewPage]
})
export class ServiceReviewPageModule {}

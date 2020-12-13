import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProServiceDetailsPageRoutingModule } from './pro-service-details-routing.module';

import { ProServiceDetailsPage } from './pro-service-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProServiceDetailsPageRoutingModule
  ],
  declarations: [ProServiceDetailsPage]
})
export class ProServiceDetailsPageModule {}

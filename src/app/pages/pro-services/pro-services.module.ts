import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProServicesPageRoutingModule } from './pro-services-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { ProServicesPage } from './pro-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProServicesPageRoutingModule
  ],
  declarations: [ProServicesPage]
})
export class ProServicesPageModule {}

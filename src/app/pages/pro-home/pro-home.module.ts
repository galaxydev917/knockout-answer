import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProHomePageRoutingModule } from './pro-home-routing.module';

import { ProHomePage } from './pro-home.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ProHomePageRoutingModule
  ],
  declarations: [ProHomePage]
})
export class ProHomePageModule {}

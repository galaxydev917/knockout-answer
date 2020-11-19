import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProProfilePageRoutingModule } from './pro-profile-routing.module';

import { ProProfilePage } from './pro-profile.page';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    ProProfilePageRoutingModule
  ],
  declarations: [ProProfilePage]
})
export class ProProfilePageModule {}

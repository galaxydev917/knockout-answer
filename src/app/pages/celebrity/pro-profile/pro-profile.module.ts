import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProProfilePageRoutingModule } from './pro-profile-routing.module';

import { ProProfilePage } from './pro-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProProfilePageRoutingModule
  ],
  declarations: [ProProfilePage]
})
export class ProProfilePageModule {}

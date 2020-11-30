import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotpwdPageRoutingModule } from './forgotpwd-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { ForgotpwdPage } from './forgotpwd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    IonicModule,
    ForgotpwdPageRoutingModule
  ],
  declarations: [ForgotpwdPage]
})
export class ForgotpwdPageModule {}

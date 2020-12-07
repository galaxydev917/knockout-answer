import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProTablinksPage } from './pro-tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: ProTablinksPage,
    children: [
      {
        path: 'pro-home',
        loadChildren: () => import('../pro-home/pro-home.module').then(m => m.ProHomePageModule)
      },
      {
        path: 'pro-services',
        loadChildren: () => import('../pro-services/pro-services.module').then(m => m.ProServicesPageModule)
      },      
      {
        path: 'messages',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },        
       {
        path: 'pro-profile',
        loadChildren: () => import('../pro-profile/pro-profile.module').then( m => m.ProProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProTablinksPageRoutingModule {}

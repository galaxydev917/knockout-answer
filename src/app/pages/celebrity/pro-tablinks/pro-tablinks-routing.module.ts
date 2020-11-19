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
        loadChildren: () => import('../pro-home/pro-home.module').then( m => m.ProHomePageModule)
      },
      {
        path: 'pro-services',
        loadChildren: () => import('../pro-services/pro-services.module').then(m => m.ProServicesPageModule)
      },
      {
        path: 'pro-profile',
        loadChildren: () => import('../pro-profile/pro-profile.module').then(m => m.ProProfilePageModule)
      },
      {
        path: 'pro-messages',
        loadChildren: () => import('../pro-messages/pro-messages.module').then(m => m.ProMessagesPageModule)
      },
      {
        path: '',
        redirectTo: '/pro-tablinks/pro-home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProTablinksPageRoutingModule {}

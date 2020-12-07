import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: TablinksPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('../service/service.module').then(m => m.ServicePageModule)
      },      
      {
        path: 'messages',
        loadChildren: () => import('../message/message.module').then(m => m.MessagePageModule)
      },        
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
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
export class TablinksPageRoutingModule {}

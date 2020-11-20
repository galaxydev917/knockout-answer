import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpwd',
    loadChildren: () => import('./pages/forgotpwd/forgotpwd.module').then( m => m.ForgotpwdPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/customer/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/customer/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/customer/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'tablinks',
    loadChildren: () => import('./pages/customer/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/customer/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'pro-tablinks',
    loadChildren: () => import('./pages/celebrity/pro-tablinks/pro-tablinks.module').then( m => m.ProTablinksPageModule)
  },
  {
    path: 'pro-profile',
    loadChildren: () => import('./pages/celebrity/pro-profile/pro-profile.module').then( m => m.ProProfilePageModule)
  },
  {
    path: 'pro-messages',
    loadChildren: () => import('./pages/celebrity/pro-messages/pro-messages.module').then( m => m.ProMessagesPageModule)
  },
  {
    path: 'pro-home',
    loadChildren: () => import('./pages/celebrity/pro-home/pro-home.module').then( m => m.ProHomePageModule)
  },
  {
    path: 'pro-services',
    loadChildren: () => import('./pages/celebrity/pro-services/pro-services.module').then( m => m.ProServicesPageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./pages/customer/service-request/service-request.module').then( m => m.ServiceRequestPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

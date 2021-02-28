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
    path: 'tablinks',
    loadChildren: () => import('./pages/tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'service',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'message',
    loadChildren: () => import('./pages/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'pro-profile',
    loadChildren: () => import('./pages/pro-profile/pro-profile.module').then( m => m.ProProfilePageModule)
  },
  {
    path: 'service-request',
    loadChildren: () => import('./pages/service-request/service-request.module').then( m => m.ServiceRequestPageModule)
  },
  {
    path: 'payment-method',
    loadChildren: () => import('./pages/payment-method/payment-method.module').then( m => m.PaymentMethodPageModule)
  },
  {
    path: 'service-review',
    loadChildren: () => import('./pages/service-review/service-review.module').then( m => m.ServiceReviewPageModule)
  },
  {
    path: 'service-history',
    loadChildren: () => import('./pages/service-history/service-history.module').then( m => m.ServiceHistoryPageModule)
  },
  {
    path: 'service-details',
    loadChildren: () => import('./pages/service-details/service-details.module').then( m => m.ServiceDetailsPageModule)
  },
  {
    path: 'forgotpwd',
    loadChildren: () => import('./pages/forgotpwd/forgotpwd.module').then( m => m.ForgotpwdPageModule)
  },
  {
    path: 'pro-tablinks',
    loadChildren: () => import('./pages/pro-tablinks/pro-tablinks.module').then( m => m.ProTablinksPageModule)
  },
  {
    path: 'pro-home',
    loadChildren: () => import('./pages/pro-home/pro-home.module').then( m => m.ProHomePageModule)
  },
  {
    path: 'pro-services',
    loadChildren: () => import('./pages/pro-services/pro-services.module').then( m => m.ProServicesPageModule)
  },
  {
    path: 'pro-service-details',
    loadChildren: () => import('./pages/pro-service-details/pro-service-details.module').then( m => m.ProServiceDetailsPageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./pages/rating/rating.module').then( m => m.RatingPageModule)
  },
  {
    path: 'rating-list',
    loadChildren: () => import('./pages/rating-list/rating-list.module').then( m => m.RatingListPageModule)
  },
  {
    path: 'payout-process/:account_id',
    loadChildren: () => import('./pages/payout-process/payout-process.module').then( m => m.PayoutProcessPageModule)
  },
  {
    path: 'contactus',
    loadChildren: () => import('./pages/contactus/contactus.module').then( m => m.ContactusPageModule)
  },
  {
    path: 'termscondition',
    loadChildren: () => import('./pages/termscondition/termscondition.module').then( m => m.TermsconditionPageModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./pages/policy/policy.module').then( m => m.PolicyPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

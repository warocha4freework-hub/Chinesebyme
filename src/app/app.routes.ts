import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudyChinaComponent } from './pages/study-china/study-china.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminAdsComponent } from './pages/admin/admin-ads/admin-ads.component';
import { AdminCampsComponent } from './pages/admin/admin-camps/admin-camps.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Chinese By Me | หน้าหลัก' },
  { path: 'study-in-china', component: StudyChinaComponent, title: 'Chinese By Me | เรียนภาษาที่จีน' },
  { path: 'reviews', component: ReviewsComponent, title: 'Chinese By Me | รีวิวความประทับใจ' },
  { path: 'about-us', component: AboutUsComponent, title: 'Chinese By Me | เกี่ยวกับเรา' },
  { path: 'contact', component: ContactUsComponent, title: 'Chinese By Me | ติดต่อเรา' },
  
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AdminLoginComponent, title: 'Admin Login' },
      { path: 'dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard' },
      { path: 'ads-banner', component: AdminAdsComponent, title: 'Manage Ads Banner' },
      { path: 'camps', component: AdminCampsComponent, title: 'Manage Camps' }
    ]
  },

  { path: '**', redirectTo: '' }
];

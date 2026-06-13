import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex">
      <!-- Admin Sidebar -->
      <aside class="w-64 bg-navy-900 text-white flex flex-col hidden md:flex">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gold-500">Admin CMS</h2>
        </div>
        <nav class="flex-1 px-4 space-y-2">
          <a routerLink="/admin/dashboard" class="block py-2 px-4 rounded hover:bg-navy-800 transition">Dashboard</a>
          <a routerLink="/admin/ads-banner" class="block py-2 px-4 rounded hover:bg-navy-800 transition">Ads Banner</a>
          <a routerLink="/admin/camps" class="block py-2 px-4 rounded hover:bg-navy-800 transition">Camps</a>
        </nav>
        <div class="p-4">
          <a routerLink="/" class="block text-center py-2 px-4 rounded bg-red-600 hover:bg-red-700 transition">Logout / Back to Site</a>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: ``
})
export class AdminComponent {

}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-navy-800">Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a routerLink="/admin/ads-banner" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="bg-red-100 text-red-600 p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-navy-800">Ads Banner</h3>
              <p class="text-gray-500 text-sm">Manage dynamic promotional banner text and prices</p>
            </div>
          </div>
        </a>

        <a routerLink="/admin/camps" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition cursor-pointer">
          <div class="flex items-center gap-4">
            <div class="bg-sky-100 text-sky-600 p-4 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-navy-800">Camps Data</h3>
              <p class="text-gray-500 text-sm">Edit registration status, dates, and prices</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminDashboardComponent {

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center justify-center min-h-[80vh]">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 class="text-3xl font-extrabold text-navy-900 text-center mb-8">Admin Login</h1>
        
        <form (submit)="onLogin($event)" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none" value="admin" readonly>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 outline-none" value="password" readonly>
          </div>
          <button type="submit" class="w-full bg-navy-800 text-white font-bold py-3 rounded-xl hover:bg-navy-700 transition">
            Login
          </button>
        </form>
        <p class="text-xs text-center text-gray-400 mt-4">Mock login for demo purposes</p>
      </div>
    </div>
  `,
  styles: ``
})
export class AdminLoginComponent {
  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/admin/dashboard']);
  }
}

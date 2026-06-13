import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampService } from '../../../core/services/camp.service';
import { AdsBanner } from '../../../core/models/camp.model';

@Component({
  selector: 'app-admin-ads',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 class="text-2xl font-bold text-navy-800 mb-6">Edit Ads Banner</h2>
      
      <div *ngIf="isLoading" class="text-gray-500">Loading data...</div>

      <form *ngIf="!isLoading && banner" (ngSubmit)="saveBanner()" class="space-y-6 max-w-2xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-navy-700 mb-1">Tagline (Red Badge)</label>
            <input type="text" [(ngModel)]="banner.tagline" name="tagline" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-bold text-navy-700 mb-1">Badge Label (Orange Circle Top)</label>
            <input type="text" [(ngModel)]="banner.badgeLabel" name="badgeLabel" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-navy-700 mb-1">Main Title</label>
          <input type="text" [(ngModel)]="banner.title" name="title" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold text-navy-700 mb-1">Discount Price</label>
            <input type="number" [(ngModel)]="banner.price" name="price" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
          </div>
          <div>
            <label class="block text-sm font-bold text-navy-700 mb-1">Original Price</label>
            <input type="number" [(ngModel)]="banner.originalPrice" name="originalPrice" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
          </div>
        </div>

        <div>
          <label class="block text-sm font-bold text-navy-700 mb-1">Discount Text (Orange Circle Center)</label>
          <input type="text" [(ngModel)]="banner.discountText" name="discountText" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
        </div>

        <!-- Rounds Array Editor (Fixed to 2 rounds for simplicity) -->
        <div class="border-t pt-4">
          <h3 class="font-bold text-navy-800 mb-4">Registration Rounds</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div *ngFor="let round of banner.rounds; let i = index" class="space-y-3 p-4 bg-gray-50 rounded-lg">
              <p class="font-bold text-sm text-navy-600">Round {{i+1}}</p>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input type="text" [(ngModel)]="round.name" [name]="'roundName'+i" class="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none text-sm">
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Deadline</label>
                <input type="text" [(ngModel)]="round.deadline" [name]="'roundDeadline'+i" class="w-full px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none text-sm">
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 flex items-center gap-4 border-t">
          <button type="submit" [disabled]="isSaving" class="bg-navy-800 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-navy-700 transition disabled:opacity-50">
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
          </button>
          <span *ngIf="showSuccess" class="text-green-600 font-bold text-sm flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Saved successfully!
          </span>
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class AdminAdsComponent implements OnInit {
  banner: AdsBanner | null = null;
  isLoading = true;
  isSaving = false;
  showSuccess = false;

  constructor(private campService: CampService) {}

  ngOnInit() {
    this.campService.getAdsBanner().subscribe(data => {
      this.banner = data;
      this.isLoading = false;
    });
  }

  saveBanner() {
    if (!this.banner) return;
    this.isSaving = true;
    this.showSuccess = false;
    
    this.campService.updateAdsBanner(this.banner).subscribe({
      next: () => {
        this.isSaving = false;
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      },
      error: (err) => {
        console.error('Error saving', err);
        this.isSaving = false;
      }
    });
  }
}

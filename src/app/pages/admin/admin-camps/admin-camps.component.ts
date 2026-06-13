import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CampService } from '../../../core/services/camp.service';
import { Camp } from '../../../core/models/camp.model';

@Component({
  selector: 'app-admin-camps',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-navy-800">Manage Camps</h2>
      
      <div *ngIf="isLoading" class="text-gray-500">Loading camps...</div>

      <div *ngIf="!isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div *ngFor="let camp of camps" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 class="text-lg font-bold text-navy-800 border-b pb-2 mb-4">{{ camp.title }} ({{ camp.name }})</h3>
          
          <form (ngSubmit)="saveCamp(camp)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select [(ngModel)]="camp.status" name="status" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="filled">Filled (Full)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status Badge Text</label>
              <input type="text" [(ngModel)]="camp.statusText" name="statusText" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="text" [(ngModel)]="camp.startDate" name="startDate" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="text" [(ngModel)]="camp.endDate" name="endDate" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Registration Date Range</label>
              <input type="text" [(ngModel)]="camp.registrationRange" name="registrationRange" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy-500 outline-none">
            </div>

            <div class="pt-4 flex justify-end">
              <button type="submit" class="bg-navy-800 text-white font-bold py-2 px-6 rounded-lg hover:bg-navy-700 transition text-sm">
                Save Camp
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  `,
  styles: ``
})
export class AdminCampsComponent implements OnInit {
  camps: Camp[] = [];
  isLoading = true;

  constructor(private campService: CampService) {}

  ngOnInit() {
    this.campService.getCamps().subscribe(data => {
      this.camps = data;
      this.isLoading = false;
    });
  }

  saveCamp(camp: Camp) {
    this.campService.updateCamp(camp.id, camp).subscribe({
      next: () => alert(`Camp ${camp.title} saved successfully!`),
      error: (err) => alert(`Error saving camp: ${err.message}`)
    });
  }
}

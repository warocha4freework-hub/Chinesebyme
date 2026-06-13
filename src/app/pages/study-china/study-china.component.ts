import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampService } from '../../core/services/camp.service';
import { Camp, DormAmenity, DormRoom, ProjectDetail } from '../../core/models/camp.model';

@Component({
  selector: 'app-study-china',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './study-china.component.html',
  styleUrls: []
})
export class StudyChinaComponent implements OnInit {
  camps: Camp[] = [];
  amenities: DormAmenity[] = [];
  rooms: DormRoom[] = [];
  projectDetails?: ProjectDetail;
  isLoading = true;

  constructor(private campService: CampService) {}

  ngOnInit() {
    this.campService.getCamps().subscribe(data => this.camps = data);
    this.campService.getDormAmenities().subscribe(data => this.amenities = data);
    this.campService.getDormRooms().subscribe(data => this.rooms = data);
    this.campService.getProjectDetail().subscribe(data => {
      this.projectDetails = data;
      this.isLoading = false;
    });
  }
}

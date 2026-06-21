import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
export class StudyChinaComponent implements OnInit, OnDestroy {
  camps: Camp[] = [];
  amenities: DormAmenity[] = [];
  rooms: DormRoom[] = [];
  projectDetails?: ProjectDetail;
  isLoading = true;

  // Popup state
  showPopup = false;
  popupImage = '';

  // Dormitory Carousel State
  currentRoomPage = 0;
  itemsPerPage = 3;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemsPerPage();
  }

  updateItemsPerPage() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) {
        this.itemsPerPage = 1;
      } else if (window.innerWidth < 768) {
        this.itemsPerPage = 2;
      } else {
        this.itemsPerPage = 3;
      }
      
      if (this.currentRoomPage >= this.totalRoomPages) {
        this.currentRoomPage = Math.max(0, this.totalRoomPages - 1);
      }
    }
  }

  get totalRoomPages() {
    return Math.ceil(this.rooms.length / this.itemsPerPage);
  }

  get roomPagesArray() {
    return new Array(this.totalRoomPages);
  }

  nextRoomPage() {
    if (this.currentRoomPage < this.totalRoomPages - 1) {
      this.currentRoomPage++;
    } else {
      this.currentRoomPage = 0;
    }
  }

  prevRoomPage() {
    if (this.currentRoomPage > 0) {
      this.currentRoomPage--;
    } else {
      this.currentRoomPage = this.totalRoomPages - 1;
    }
  }

  setRoomPage(index: number) {
    this.currentRoomPage = index;
  }

  openPopup(imagePath: string) {
    this.popupImage = imagePath;
    this.showPopup = true;
    document.body.classList.add('overflow-hidden');
  }

  closePopup() {
    this.showPopup = false;
    document.body.classList.remove('overflow-hidden');
  }

  ngOnDestroy() {
    document.body.classList.remove('overflow-hidden');
  }

  constructor(private campService: CampService) {}

  ngOnInit(): void {
    this.updateItemsPerPage();
    this.loadCamps();
    this.loadAmenities();
    this.loadDormRooms();
    this.loadProjectDetails();
  }

  private loadCamps() {
    this.campService.getCamps().subscribe(data => this.camps = data);
  }

  private loadAmenities() {
    this.campService.getDormAmenities().subscribe(data => this.amenities = data);
  }

  private loadDormRooms() {
    this.campService.getDormRooms().subscribe(data => this.rooms = data);
  }

  private loadProjectDetails() {
    this.campService.getProjectDetail().subscribe(data => {
      this.projectDetails = data;
      this.isLoading = false;
    });
  }
}

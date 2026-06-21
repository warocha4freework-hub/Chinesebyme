import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CampService } from '../../core/services/camp.service';
import { Camp, AdsBanner } from '../../core/models/camp.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit, OnDestroy {
  camps: Camp[] = [];
  adsBanner: AdsBanner | null = null;
  isLoading = true;
  
  // Slideshow state
  currentSlide = 0;
  totalSlides = 2; // 2 hero images
  private slideInterval: any;
  heroImages = [
    '/assets/images/Banner-Home.png',
    '/assets/images/Dalian1.jpg'
  ];

  // Popup state
  showPopup = false;
  popupImage = '';

  openPopup(imagePath: string) {
    this.popupImage = imagePath;
    this.showPopup = true;
    document.body.classList.add('overflow-hidden');
  }

  closePopup() {
    this.showPopup = false;
    document.body.classList.remove('overflow-hidden');
  }

  // News carousel state
  currentNewsPage = 0;
  newsCards = [
    {
      title: 'เดินทางไปเรียนจีน อย่างสบายใจ',
      desc: 'ทีมงาน CHINESEBYME เป็นการร่วมกันดูแลนักเรียนตั้งแต่ในประเทศไทยพร้อมคอยดูแลและอยู่ที่จีนตลอดระยะเวลาของโครงการ',
      image: '/assets/images/Review-cover.png',
      link: '/study-in-china',
      iconText: 'อ่านเพิ่มเติม'
    },
    {
      title: 'ลงวารสารของมหาวิทยาลัยที่จีน',
      desc: 'นักเรียนจากโครงการเรียนภาษาจีนระยะสั้นจาก CHINESEBYME กล่าวขอบคุณและพูดถึงความประทับใจตลอดระยะเวลาที่เรียนในมหาวิทยาลัยดงเป่ย',
      image: '/assets/images/Magazine-cover.png',
      link: '/reviews',
      iconText: 'อ่านเพิ่มเติม'
    },
    {
      title: 'ภาพความประทับใจ',
      desc: 'รวมภาพบรรยากาศรอยยิ้ม ความสนุกสนาน และประสบการณ์ที่มีค่าจากน้องๆ นักเรียนที่ร่วมเดินทางไปแคมป์กับเรา',
      image: '/assets/images/photo/1.png',
      link: '/reviews',
      iconText: 'ดูทั้งหมด'
    }
  ];

  pagedNewsCards: any[][] = [];

  nextNews() {
    this.currentNewsPage = (this.currentNewsPage + 1) % this.pagedNewsCards.length;
  }

  prevNews() {
    this.currentNewsPage = (this.currentNewsPage - 1 + this.pagedNewsCards.length) % this.pagedNewsCards.length;
  }

  setNewsPage(index: number) {
    this.currentNewsPage = index;
  }

  constructor(private campService: CampService) {}

  ngOnInit() {
    // Populate pages
    for (let i = 0; i < this.newsCards.length; i += 3) {
      this.pagedNewsCards.push(this.newsCards.slice(i, i + 3));
    }

    this.campService.getCamps().subscribe({
      next: (data) => {
        this.camps = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching camps:', err);
        this.isLoading = false;
      }
    });

    // Still fetch ads banner for other sections if needed, or if the user meant to remove it completely, we can leave the fetch here just in case.
    this.campService.getAdsBanner().subscribe({
      next: (data) => {
        this.adsBanner = data;
      },
      error: (err) => {
        console.error('Error fetching ads banner:', err);
      }
    });

    this.startSlideshow();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    document.body.classList.remove('overflow-hidden');
  }

  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 20000); // Change slide every 20 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  nextSlideManual() {
    this.nextSlide();
    this.resetSlideshow();
  }

  prevSlideManual() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.resetSlideshow();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.resetSlideshow();
  }

  resetSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.startSlideshow();
  }
}

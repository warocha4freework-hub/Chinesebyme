import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isScrolled = false;

  navItems = [
    { label: 'หน้าหลัก', route: '/' },
    { 
      label: 'เรียนภาษาที่จีน', 
      route: '', // Parent doesn't need to navigate directly
      subItems: [
        { label: 'ต้าเหลียน (Dalian)', route: '/study-in-china' }
      ]
    },
    { label: 'รีวิว', route: '/reviews' },
    { label: 'เกี่ยวกับเรา', route: '/about-us' },
    { label: 'ติดต่อเรา', route: '/contact' }
  ];

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.checkScroll);
    }
  }

  checkScroll = () => {
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 20;
    }
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}

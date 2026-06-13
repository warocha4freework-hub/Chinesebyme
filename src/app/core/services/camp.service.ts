import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Camp, DormAmenity, DormRoom, ProjectDetail, AdsBanner } from '../models/camp.model';

@Injectable({
  providedIn: 'root'
})
export class CampService {

  private camps: Camp[] = [
    {
      id: 'summer-camp',
      name: 'รอบมิถุนายน | ระยะ 2 สัปดาห์',
      type: 'summer',
      title: 'SUMMER CAMP',
      duration: '2 สัปดาห์',
      startDate: 'วันที่ -',
      endDate: '',
      registrationRange: 'ปิดรับสมัครแล้ว',
      status: 'closed',
      statusText: 'ปิดรับสมัครแล้ว',
      price: 48900,
      originalPrice: 52900
    },
    {
      id: 'autumn-camp',
      name: 'รอบตุลาคม | ระยะ 2 สัปดาห์',
      type: 'autumn',
      title: 'AUTUMN CAMP',
      duration: '2 สัปดาห์',
      startDate: '11 ตุลาคม 2026',
      endDate: '24 ตุลาคม 2026',
      registrationRange: 'วันนี้ - 31 ก.ค. 2026',
      status: 'open',
      statusText: 'เปิดรับสมัคร วันนี้ - 31 ก.ค. 2026',
      price: 48900,
      originalPrice: 52900
    },
    {
      id: 'winter-camp',
      name: 'รอบธันวาคม | ระยะ 2 สัปดาห์',
      type: 'winter',
      title: 'WINTER CAMP',
      duration: '2 สัปดาห์',
      startDate: '06 ธันวาคม 2026',
      endDate: '19 ธันวาคม 2026',
      registrationRange: 'วันนี้ - 30 ก.ย. 2026',
      status: 'open',
      statusText: 'เปิดรับสมัคร วันนี้ - 30 ก.ย. 2026',
      price: 48900,
      originalPrice: 52900
    }
  ];

  private amenities: DormAmenity[] = [
    { name: 'เครื่องปรับอากาศ', available: true },
    { name: 'ห้องน้ำในตัว', available: true },
    { name: 'ตู้เย็น', available: true },
    { name: 'เตียงคู่', available: true },
    { name: 'ตู้เสื้อผ้าและโต๊ะเขียนหนังสือ', available: true },
    { name: 'เครื่องซักผ้า (ส่วนกลาง)', available: true },
    { name: 'ไมโครเวฟ (ส่วนกลาง)', available: true },
    { name: 'คีย์การ์ดผ่านเข้า-ออกตึกหอพัก', available: true },
    { name: 'Wi-Fi ครอบคลุมทั่วพื้นที่', available: true },
    { name: 'เจ้าหน้าที่ดูแลความปลอดภัยตลอด 24 ชั่วโมง', available: true }
  ];

  private dormRooms: DormRoom[] = [
    {
      id: 'room-1',
      name: 'ทางเดิน/ภายนอกหอพัก',
      images: ['/assets/images/Exterior.jpg'],
      description: 'บริเวณทางเดินและบรรยากาศภายนอกอาคารหอพัก สะอาดและร่มรื่น'
    },
    {
      id: 'room-2',
      name: 'ครัวและไมโครเวฟส่วนกลาง',
      images: ['/assets/images/Microwave.webp'],
      description: 'ครัวส่วนกลางและไมโครเวฟ พร้อมใช้บริการตลอดเวลา'
    },
    {
      id: 'room-3',
      name: 'เครื่องซักผ้าส่วนกลาง',
      images: ['/assets/images/Washer.webp'],
      description: 'เครื่องซักผ้าหยอดเหรียญและบริการซักอบรีดสะดวกสบาย'
    },
    {
      id: 'room-4',
      name: 'ตู้เย็นในห้องพัก',
      images: ['/assets/images/Refride.webp'],
      description: 'ตู้เย็นจัดเตรียมไว้สำหรับเก็บเครื่องดื่มและอาหารภายในห้องพัก'
    },
    {
      id: 'room-5',
      name: 'ห้องนอนพักคู่',
      images: ['/assets/images/Bedroom.webp'],
      description: 'ห้องนอนสำหรับเตียงคู่ มีตู้เสื้อผ้า โต๊ะเขียนหนังสือ และเครื่องปรับอากาศครบครัน'
    },
    {
      id: 'room-6',
      name: 'ห้องน้ำในตัว',
      images: ['/assets/images/Toilet.webp'],
      description: 'ห้องน้ำสะอาดสะอ้าน แยกส่วนเปียก-แห้ง เพื่อสุขอนามัยที่ดี'
    },
    {
      id: 'room-7',
      name: 'มุมพักผ่อนห้องนอน',
      images: ['/assets/images/bedroom2.webp'],
      description: 'พื้นที่พักผ่อนภายในห้องนอน พร้อมแสงสว่างเพียงพอ'
    },
    {
      id: 'room-8',
      name: 'อ่างล้างหน้า',
      images: ['/assets/images/Sink.webp'],
      description: 'อ่างล้างหน้าแยกสัดส่วนเพื่อความสะดวกในการใช้งาน'
    },
    {
      id: 'room-9',
      name: 'ระบบคีย์การ์ด',
      images: ['/assets/images/Keycard.webp'],
      description: 'ระบบรักษาความปลอดภัยเข้า-ออกหอพักและห้องพักด้วยคีย์การ์ด'
    }
  ];

  private projectDetail: ProjectDetail = {
    includes: [
      'ค่าเรียนหลักสูตรภาษาจีนและกิจกรรมทางวัฒนธรรม',
      'ค่าที่พักหอพักนักศึกษาต่างชาติตามระบุในโครงการ (ห้องพักคู่)',
      'ค่าประกันภัยการเดินทางและรักษาพยาบาลวงเงินตามกรมธรรม์',
      'ค่าวีซ่าเข้าประเทศจีน (วีซ่าท่องเที่ยวแบบหมู่คณะ)',
      'ค่ากิจกรรมทัศนศึกษา ทริปวัฒนธรรม และค่าเข้าชมสถานที่ต่างๆ ตามกำหนดการ',
      'ค่ารถรับ-ส่งสนามบินที่จีนตามเวลาของคณะ',
      'เจ้าหน้าที่และพี่ๆ ดูแลประสานงานใกล้ชิดตลอดระยะเวลาของโครงการ'
    ],
    excludes: [
      'ค่าตั๋วเครื่องบินไป-กลับ กรุงเทพ - ต้าเหลียน',
      'ค่าอาหารและเครื่องดื่มประจำวัน (เฉลี่ยวันละ 30-50 หยวน)',
      'ค่าตรวจสุขภาพและค่าใช้จ่ายส่วนตัวอื่นๆ',
      'ค่าใช้จ่ายนอกเหนือจากที่โครงการกำหนด'
    ]
  };

  private adsBanner: AdsBanner = {
    tagline: 'แคมป์เรียนภาษาจีน',
    title: 'เปิดรับสมัครรอบธันวาคม 2026',
    price: 48900,
    originalPrice: 52900,
    badgeLabel: 'HOT DEAL',
    discountText: 'สมัครคู่ลด 1,000 บาท/คน',
    rounds: [
      { name: 'รอบ 1', deadline: '31 ก.ค. 2026' },
      { name: 'รอบ 2', deadline: '30 ก.ย. 2026' }
    ],
    ctaText: 'สมัครเรียนเลย',
    backgroundImageUrl: '/assets/images/Ads-Banner.png'
  };

  constructor() { }

  getCamps(): Observable<Camp[]> {
    return of(this.camps);
  }

  getCampById(id: string): Observable<Camp | undefined> {
    return of(this.camps.find(c => c.id === id));
  }

  updateCamp(id: string, camp: Camp): Observable<any> {
    const index = this.camps.findIndex(c => c.id === id);
    if (index !== -1) {
      this.camps[index] = camp;
    }
    return of({ success: true });
  }

  getAdsBanner(): Observable<AdsBanner> {
    return of(this.adsBanner);
  }

  updateAdsBanner(banner: AdsBanner): Observable<any> {
    this.adsBanner = banner;
    return of({ success: true });
  }

  getDormAmenities(): Observable<DormAmenity[]> {
    return of(this.amenities);
  }

  getDormRooms(): Observable<DormRoom[]> {
    return of(this.dormRooms);
  }

  getProjectDetail(): Observable<ProjectDetail> {
    return of(this.projectDetail);
  }
}

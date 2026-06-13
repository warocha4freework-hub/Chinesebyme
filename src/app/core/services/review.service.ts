import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StudentReview, MemoryPhoto } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'https://api.chinesebyme.com/reviews';

  private reviews: StudentReview[] = [
    {
      id: 'rev-1',
      author: 'น้องน้ำหวาน',
      avatar: 'assets/reviews/avatar1.png',
      rating: 5,
      program: 'ต้าเหลียน 2 สัปดาห์',
      text: 'พี่ๆ ดูแลดีมากค่ะ ตั้งแต่เตรียมเอกสาร ยื่นวีซ่า จนถึงพาขึ้นเครื่อง บินไปถึงก็มีรถมารับ พาไปเช็คอินหอพัก ซื้อของใช้จำเป็น แนะนำการเดินทาง สอนนั่งรถไฟใต้ดิน รถเมล์ ทุกอย่างคืออุ่นใจมาก ไม่เคว้งคว้างเลยค่ะ',
      images: ['assets/reviews/post1.png'],
      platform: 'instagram'
    },
    {
      id: 'rev-2',
      author: 'น้องพีท',
      avatar: 'assets/reviews/avatar2.png',
      rating: 5,
      program: 'ต้าเหลียน 1 เดือน',
      text: 'หลักสูตรภาษาที่ Dongbei University เรียนสนุกมากครับ เหล่าซือสอนเข้าใจง่าย มีกิจกรรมทัศนศึกษาวัฒนธรรมจีน ได้ฝึกเขียนพู่กันจีน ตัดกระดาษชงชา และได้พาเที่ยวสถานที่ไฮไลท์ในต้าเหลียนด้วย สนุกและได้ความรู้เยอะมาก',
      images: ['assets/reviews/post2.png'],
      platform: 'instagram'
    },
    {
      id: 'rev-3',
      author: 'น้องมายด์',
      avatar: 'assets/reviews/avatar3.png',
      rating: 5,
      program: 'ต้าเหลียน 2 สัปดาห์',
      text: 'หอพักสะดวกสบายมากค่ะ ห้องพักสะอาด มีแอร์ ปลอดภัย มีคีย์การ์ดเข้าออกตึก ใกล้มหาวิทยาลัยมีร้านอาหารอร่อยๆ เพียบ ค่าครองชีพไม่แพงอย่างที่คิด พี่ๆ สตาฟอยู่ดูแลตลอดโครงการ ถ้ามีปัญหาปรึกษาได้ 24 ชม. เลยค่ะ',
      images: ['assets/reviews/post3.png'],
      platform: 'instagram'
    }
  ];

  private memories: MemoryPhoto[] = [
    { id: 'mem-1', imageUrl: 'assets/memories/mem1.png', caption: 'เรียนรู้วัฒนธรรมจีน' },
    { id: 'mem-2', imageUrl: 'assets/memories/mem2.png', caption: 'บรรยากาศหน้าหอพักมหาวิทยาลัย' },
    { id: 'mem-3', imageUrl: 'assets/memories/mem3.png', caption: 'ทริปทัศนศึกษาที่จัตุรัสชิงไห่' },
    { id: 'mem-4', imageUrl: 'assets/memories/mem4.png', caption: 'กลุ่มนักเรียนกับเหล่าซือที่น่ารัก' },
    { id: 'mem-5', imageUrl: 'assets/memories/mem5.png', caption: 'คลาสเรียนภาษาจีนแสนสนุก' },
    { id: 'mem-6', imageUrl: 'assets/memories/mem6.png', caption: 'อาหารต้าเหลียนแสนอร่อย' },
    { id: 'mem-7', imageUrl: 'assets/memories/mem7.png', caption: 'กิจกรรมทำเกี๊ยวและอาหารจีน' },
    { id: 'mem-8', imageUrl: 'assets/memories/mem8.png', caption: 'ถ่ายภาพหมู่รวมในพิธีปิดโครงการ' },
    { id: 'mem-9', imageUrl: 'assets/memories/mem9.png', caption: 'เพื่อนๆ ร่วมแชร์ความประทับใจ' }
  ];

  private quoteTestimonial = {
    avatar: 'assets/reviews/quote-avatar.png',
    author: 'น้องเนย',
    role: 'ผู้เข้าร่วมโครงการเรียนภาษาที่ต้าเหลียน 1 เดือน',
    text: 'มารีวิวโครงการไปเรียนที่ต้าเหลียน 1 เดือนค่า พี่ๆดูแลดีมาก ให้คำปรึกษาแนะนำอย่างดีตั้งแต่ก่อนเดินทางและระหว่างที่อยู่จีน พาไปเที่ยวทุกสัปดาห์ พาไปร้านอาหารอร่อยๆ มีขนมอร่อยๆให้ลองชิมตลอดเลย เหล่าซือที่มหาวิทยาลัยใจดีมากคอยถามตลอดว่าฟังทันไหม หอพักปลอดภัยสะอาด เพื่อนๆพี่ๆน่ารัก ประทับใจมากๆค่ะ ถ้ามีโอกาสจะไปอีกและชวนเพื่อนๆไปด้วยนะคะ ขอบคุณที่จัดโครงการดีๆแบบนี้ค่ะ💖🥺'
  };

  constructor(private http: HttpClient) { }

  getReviews(): Observable<StudentReview[]> {
    return of(this.reviews);
  }

  getMemories(): Observable<MemoryPhoto[]> {
    return of(this.memories);
  }

  getQuoteTestimonial(): Observable<typeof this.quoteTestimonial> {
    return of(this.quoteTestimonial);
  }
}

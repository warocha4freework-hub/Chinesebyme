import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactInquiry, ContactInfo } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://api.chinesebyme.com/contact';

  private contactInfo: ContactInfo = {
    lineId: '@chinesebyme',
    lineLink: 'https://lin.ee/7CvaC7o',
    igId: 'Chinesebyme',
    igLink: 'https://www.instagram.com/Chinesebyme',
    facebookId: 'Chinesebyme Education',
    facebookLink: 'https://www.facebook.com/profile.php?id=100069467911049&mibextid=LQQJ4d',
    tiktokLink: 'https://www.tiktok.com/@chinesebyme?_t=8ryykv4rvf4&_r=1',
    xLink: 'https://x.com/chinese_byme?s=21&t=e9jFADJo83UKwIDwAwgAig',
    phone: '098-765-4321', // Placeholder contact number
    email: 'info@chinesebyme.com',
    address: 'เชียงราย ประเทศไทย', // matching certificate province
    taxId: '057356000871'
  };

  constructor(private http: HttpClient) { }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }

  submitInquiry(inquiry: ContactInquiry): Observable<{ success: boolean; message: string }> {
    // Standard HttpClient ready:
    // return this.http.post<{ success: boolean; message: string }>(`${this.apiUrl}/inquire`, inquiry);
    console.log('Mock Form Submitted to API:', inquiry);
    return of({
      success: true,
      message: 'ส่งคำขอข้อมูลเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด'
    }).pipe(delay(800)); // Delay to simulate network roundtrip
  }
}

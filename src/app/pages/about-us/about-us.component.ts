import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactService } from '../../core/services/contact.service';
import { ContactInfo } from '../../core/models/contact.model';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrls: []
})
export class AboutUsComponent implements OnInit {
  contactInfo?: ContactInfo;
  isLoading = true;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContactInfo().subscribe({
      next: (data) => {
        this.contactInfo = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}

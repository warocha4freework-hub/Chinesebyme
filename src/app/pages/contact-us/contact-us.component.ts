import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { ContactInfo } from '../../core/models/contact.model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: []
})
export class ContactUsComponent implements OnInit {
  contactInfo?: ContactInfo;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    // Fetch contact details
    this.contactService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }
}

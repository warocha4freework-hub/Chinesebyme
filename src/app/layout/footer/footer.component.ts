import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../core/services/contact.service';
import { ContactInfo } from '../../core/models/contact.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {
  contactInfo?: ContactInfo;
  currentYear = new Date().getFullYear();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContactInfo().subscribe(info => {
      this.contactInfo = info;
    });
  }
}

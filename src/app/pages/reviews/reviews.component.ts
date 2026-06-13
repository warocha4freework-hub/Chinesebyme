import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewService } from '../../core/services/review.service';
import { StudentReview, MemoryPhoto } from '../../core/models/review.model';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrls: []
})
export class ReviewsComponent implements OnInit {
  reviews: StudentReview[] = [];
  memories: MemoryPhoto[] = [];
  quoteTestimonial?: any;
  isLoading = true;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews().subscribe(data => this.reviews = data);
    this.reviewService.getMemories().subscribe(data => this.memories = data);
    this.reviewService.getQuoteTestimonial().subscribe(data => {
      this.quoteTestimonial = data;
      this.isLoading = false;
    });
  }
}

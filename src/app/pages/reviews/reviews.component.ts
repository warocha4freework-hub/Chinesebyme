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
  pagedMemories: MemoryPhoto[][] = [];
  currentMemoryPage = 0;
  quoteTestimonial?: any;
  isLoading = true;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.reviewService.getReviews().subscribe(data => this.reviews = data);
    this.reviewService.getMemories().subscribe(data => {
      this.memories = data;
      this.pagedMemories = [];
      for (let i = 0; i < this.memories.length; i += 3) {
        this.pagedMemories.push(this.memories.slice(i, i + 3));
      }
    });
    this.reviewService.getQuoteTestimonial().subscribe(data => {
      this.quoteTestimonial = data;
      this.isLoading = false;
    });
  }

  nextMemoryPage() {
    if (this.currentMemoryPage < this.pagedMemories.length - 1) {
      this.currentMemoryPage++;
    } else {
      this.currentMemoryPage = 0;
    }
  }

  prevMemoryPage() {
    if (this.currentMemoryPage > 0) {
      this.currentMemoryPage--;
    } else {
      this.currentMemoryPage = this.pagedMemories.length - 1;
    }
  }

  goToMemoryPage(index: number) {
    this.currentMemoryPage = index;
  }
}

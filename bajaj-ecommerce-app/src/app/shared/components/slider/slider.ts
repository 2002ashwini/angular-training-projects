import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bajaj-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['./slider.css']
})
export class Slider implements OnInit {
  protected images: string[] = [
    'assets/images/slider/img1.jpg',
    'assets/images/slider/img2.jpg',
    'assets/images/slider/img4.jpg',
    'assets/images/slider/img5.jpg',
    'assets/images/slider/img6.jpg'
  ];

  protected currentIndex: number = 0;
  private autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  protected startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  protected nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  protected prevSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

 
  private startX = 0;
  private deltaX = 0;
  private swiping = false;

  onTouchStart(e: TouchEvent) {
    if (!e.touches.length) return;
    this.swiping = true;
    this.startX = e.touches[0].clientX;
    this.deltaX = 0;
  }

  onTouchMove(e: TouchEvent) {
    if (!this.swiping || !e.touches.length) return;
    this.deltaX = e.touches[0].clientX - this.startX;
  }

  onTouchEnd() {
    if (!this.swiping) return;
    const threshold = 40; 
    if (this.deltaX > threshold) this.prevSlide();
    else if (this.deltaX < -threshold) this.nextSlide();
    this.swiping = false;
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tile = { title: string; img: string; href?: string };
type Column = { heading: string; ctaText: string; ctaHref: string; tiles: Tile[] };

@Component({
  selector: 'bajaj-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrls: ['./banner.css']
})
export class Banner {
  columns: Column[] = [
    {
      heading: 'Revamp your home in style',
      ctaText: 'Explore all',
      ctaHref: '#',
      tiles: [
        { title: 'Cushion covers, bedsheets & more', img: 'assets/images/banner/img1.jpg' },
        { title: 'Figurines, vases & more',          img: 'assets/images/banner/img2.jpg' },
        { title: 'Home storage',                     img: 'assets/images/banner/img3.jpg' },
        { title: 'Lighting solutions',               img: 'assets/images/banner/img4.jpg' }
      ]
    },
    {
      heading: 'Appliances for your home | Up to 55% off',
      ctaText: 'See more',
      ctaHref: '#',
      tiles: [
        { title: 'Air conditioners',   img: 'assets/images/banner/img5.jpg' },
        { title: 'Refrigerators',      img: 'assets/images/banner/img6.jpg' },
        { title: 'Microwaves',         img: 'assets/images/banner/img7.jpg' },
        { title: 'Washing machines',   img: 'assets/images/banner/img8.jpg' }
      ]
    },
    {
      heading: 'Starting ₹149 | Headphones',
      ctaText: 'See all offers',
      ctaHref: '#',
      tiles: [
        { title: 'Starting ₹249 | boAt',      img: 'assets/images/banner/img9.jpg' },
        { title: 'Starting ₹349 | boult',     img: 'assets/images/banner/img10.jpg' },
        { title: 'Starting ₹649 | Noise',     img: 'assets/images/banner/img11.jpg' },
        { title: 'Starting ₹149 | Zebronics', img: 'assets/images/banner/img12.jpg' }
      ]
    },
     {
      heading: 'Revamp your home in style',
      ctaText: 'Explore all',
      ctaHref: '#',
      tiles: [
        { title: 'Cushion covers, bedsheets & more', img: 'assets/images/banner/img1.jpg' },
        { title: 'Figurines, vases & more',          img: 'assets/images/banner/img2.jpg' },
        { title: 'Home storage',                     img: 'assets/images/banner/img3.jpg' },
        { title: 'Lighting solutions',               img: 'assets/images/banner/img4.jpg' }
      ]
    },
    {
      heading: 'Appliances for your home | Up to 55% off',
      ctaText: 'See more',
      ctaHref: '#',
      tiles: [
        { title: 'Air conditioners',   img: 'assets/images/banner/img5.jpg' },
        { title: 'Refrigerators',      img: 'assets/images/banner/img6.jpg' },
        { title: 'Microwaves',         img: 'assets/images/banner/img7.jpg' },
        { title: 'Washing machines',   img: 'assets/images/banner/img8.jpg' }
      ]
    },
    {
      heading: 'Starting ₹149 | Headphones',
      ctaText: 'See all offers',
      ctaHref: '#',
      tiles: [
        { title: 'Starting ₹249 | boAt',      img: 'assets/images/banner/img9.jpg' },
        { title: 'Starting ₹349 | boult',     img: 'assets/images/banner/img10.jpg' },
        { title: 'Starting ₹649 | Noise',     img: 'assets/images/banner/img11.jpg' },
        { title: 'Starting ₹149 | Zebronics', img: 'assets/images/banner/img12.jpg' }
      ]
    }
  ];
}


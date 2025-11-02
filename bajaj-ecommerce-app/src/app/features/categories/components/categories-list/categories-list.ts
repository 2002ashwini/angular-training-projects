import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CategoriesApi } from '../../services/categories-api';
import { Category } from '../../models/category';

@Component({
  selector: 'bajaj-categories-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories-list.html',
  styleUrls: ['./categories-list.css'],
})
export class CategoriesListComponent implements OnInit {
  private api = inject(CategoriesApi);
  private router = inject(Router);

  categories: Category[] = [];
  loading = true;

  ngOnInit() {
    this.api.getCategories().subscribe({
      next: (list) => { this.categories = list; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  open(cat: Category) {
    this.router.navigate(['/products'], { queryParams: { category: cat.slug } });
  }

}

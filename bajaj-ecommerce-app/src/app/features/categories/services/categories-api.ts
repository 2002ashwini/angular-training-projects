import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';

@Injectable({ providedIn: 'root' })
export class CategoriesApi {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api'; 

 
  getCategories(): Observable<Category[]> {
    return this.http
      .get<{ categories: Category[] }>(`${this.baseUrl}/categories`)
      .pipe(map(res => res.categories));
  }

  
}

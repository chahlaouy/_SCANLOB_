import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  addFoundProduct(product_id: number, location: any, status: string) {
    return this.http.post<any>(
      `${environment.BACK_END_URL_API}/loss-products`,
      {
        product_id,
        location,
        status,
      }
    );
  }

  addComment(body: any, product_id: number) {
    return this.http.post<any>(`${environment.BACK_END_URL_API}/comments`, {
      body,
      product_id,
    });
  }

  getLossProducts() {
    return this.http.get<any>(
      `${environment.BACK_END_URL_API}/home/loss-products`
    );
  }

  getLatestProducts(page: number) {
    return this.http.get<any>(
      `${environment.BACK_END_URL_API}/home/products?page=${page}`
    );
  }

  getAllCategories() {
    return this.http.get<any>(`${environment.BACK_END_URL_API}/categories`);
  }
}

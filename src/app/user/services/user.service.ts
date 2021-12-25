import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  sendMessage(body: string, id: number) {
    return this.http.post<any>(`${environment.BACK_END_URL_API}/messages`, {
      body: body,
      room_id: id,
    });
  }
  getUserBankAccount(){
    return this.http.get<any>(`${environment.BACK_END_URL_API}/account`);;
  }
  setUserBankAccount(account: any){
    return this.http.post<any>(`${environment.BACK_END_URL_API}/account`, {
      account
    });;
  }
  getUserChatrooms(){
    return this.http.get<any>(`${environment.BACK_END_URL_API}/chatrooms`);;
  }

  toggleSellable(id: number, price: any){
    return this.http.get<any>(`${environment.BACK_END_URL_API}/products/sellable/${id}?price=${price}`);;
  }

  getUserLossProducts(){
    return this.http.get<any>(`${environment.BACK_END_URL_API}/loss-products`);;
  }

  addUserLossProduct(product_id: number, location: any, status: string){
    return this.http.post<any>(`${environment.BACK_END_URL_API}/loss-products`, {
      product_id,
      location,
      status,
    });
  }

  restoreUserLossProduct(id: number){

    return this.http.get<any>(`${environment.BACK_END_URL_API}/loss-products/${id}`);;
  }
  addUserProduct(product: FormData){
    return this.http.post<any>(`${environment.BACK_END_URL_API}/products`, product);;
  }

  getUserProducts(){
    // return this.http.get<any>(`${environment.BACK_END_URL_API}/products?page=${page}`);;
    return this.http.get<any>(`${environment.BACK_END_URL_API}/products`);;
  }


}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private validation: any = {
    required: '',
    email: ''
  }
  constructor() { }

  getValidation(){
    return this.validation
  }
}

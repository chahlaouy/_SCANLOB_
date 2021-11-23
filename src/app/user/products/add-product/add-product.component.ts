import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { getCategories } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';
import { addProductStart } from '../../state/user.actions';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {

  product = new FormData();


  userProduct: FormGroup;

  // categories= [
  //   {label: 'Véhicules', array: ['Caravaning','Camions','Équipement auto', 'Équipement moto','Nautisme','Utilitaires','Motos','Équipement caravaning','Équipement nautisme']},
  //   {label: 'Mode', array: ['Vêtements','Chaussures','Accessoires & Bagagerie','Montres & Bijoux','Équipement bébé','Vêtements bébé','Luxe et Tendance']},
  //   {label: 'Multimédia',array: ['Consoles & Jeux vidéo','Téléphonie','Images & Son ','Informatique',]},
  // ]

  subCategoryArray= null;

  categories: any
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.select(getCategories).subscribe(categories => {
      this.categories = categories
    })
    this.initializeForm();

  }


  initializeForm(){
    this.userProduct = this.fb.group({
      category: "",
      name: "",
      subCategory: "",
      miniDescription: "",
      description: "",
      uuid: "",
      state: "",
      zip: "",
      city: "",
      country: "",
      productImg: []
    })
  }

  changeCategory(e){
    this.userProduct.value.category=e.target.value;
    this.categories.forEach(item => {
      if (item.id == e.target.value){
        this.subCategoryArray = item.sub_categories
      }
    })
  }

  onProductImgChange(event) {

    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.product.append('productImg[]', event.target.files[i]);
      }
    }
  }


  onProductSubmit(){

    this.product.append('uuid', this.userProduct.get('uuid').value);
    this.product.append('category', this.userProduct.get('category').value);
    this.product.append('subCategory', this.userProduct.get('subCategory').value);
    this.product.append('miniDescription', this.userProduct.get('miniDescription').value);
    this.product.append('description', this.userProduct.get('description').value);
    this.product.append('zip', this.userProduct.get('zip').value);
    this.product.append('city', this.userProduct.get('city').value);
    this.product.append('country', this.userProduct.get('country').value);
    this.product.append('state', this.userProduct.get('state').value);
    this.product.append('name', this.userProduct.get('name').value);
    const product = this.product;
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(addProductStart({product}))
  }


}

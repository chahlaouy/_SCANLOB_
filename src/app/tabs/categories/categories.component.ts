import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getCategories } from 'src/app/shared/store/shared.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<any>;
  // = [
  //   {label: 'Véhicules', array: ['Caravaning','Camions','Équipement auto', 'Équipement moto','Nautisme','Utilitaires','Motos','Équipement caravaning','Équipement nautisme']},
  //   {label: 'Mode', array: ['Vêtements','Chaussures','Accessoires & Bagagerie','Montres & Bijoux','Équipement bébé','Vêtements bébé','Luxe et Tendance']},
  //   {label: 'Multimédia',array: ['Consoles & Jeux vidéo','Téléphonie','Images & Son','Informatique',]},
  // ]
  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit() {
    this.categories$ = this.store.select(getCategories);
  }

}

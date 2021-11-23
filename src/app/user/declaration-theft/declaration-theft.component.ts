import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setErrorMessage, setLoadingSpinner } from 'src/app/shared/store/shared.actions';
import { AppState } from 'src/app/state/app.state';
import { addLossProductStart } from '../state/user.actions';
import { getUserProducts } from '../state/user.selectors';

@Component({
  selector: 'app-declaration-theft',
  templateUrl: './declaration-theft.component.html',
  styleUrls: ['./declaration-theft.component.scss'],
})
export class DeclarationTheftComponent implements OnInit {

  @ViewChild('localisation')
  public localisationElementRef: ElementRef;

  location = {
    latitude: 0,
    longitude: 0 ,
    adminAreaLevel1: "",
    adminAreaLevel2: "",
    locality: ""
  }
  private geoCoder;

  productId: number;
  products$: Observable<any>;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.products$ = this.store.select(getUserProducts);
  }

  ngAfterViewInit() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let destinationAutocomplete = new google.maps.places.Autocomplete(this.localisationElementRef.nativeElement);
      destinationAutocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = destinationAutocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          // this.address = place.formatted_address;

          place.address_components.forEach(item => {
            if ( item.types.indexOf("administrative_area_level_2") != -1){
              this.location.adminAreaLevel2 = item.long_name
            }
            if (item.types.indexOf("locality") != -1) {
              this.location.locality = item.long_name
            }
            if (item.types.indexOf("administrative_area_level_1") != -1) {
              this.location.adminAreaLevel1 = item.long_name
            }
          })
        });
      });
    });
  }

  declareLossObject(){
    if(!this.productId || this.location.latitude == 0){
      this.store.dispatch(setErrorMessage({errorMessage: {error: "Error"}}));
      return;
    }
    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(addLossProductStart({
      product_id: this.productId,
      location: this.location,
      status: "theft-object"
    }));
  }
}

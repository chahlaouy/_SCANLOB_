import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeclarationOfLossComponent } from './declaration-of-loss.component';

describe('DeclarationOfLossComponent', () => {
  let component: DeclarationOfLossComponent;
  let fixture: ComponentFixture<DeclarationOfLossComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarationOfLossComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeclarationOfLossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

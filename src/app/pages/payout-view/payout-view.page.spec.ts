import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayoutViewPage } from './payout-view.page';

describe('PayoutViewPage', () => {
  let component: PayoutViewPage;
  let fixture: ComponentFixture<PayoutViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayoutViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

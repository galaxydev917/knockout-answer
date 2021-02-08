import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayoutProcessPage } from './payout-process.page';

describe('PayoutProcessPage', () => {
  let component: PayoutProcessPage;
  let fixture: ComponentFixture<PayoutProcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayoutProcessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayoutProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

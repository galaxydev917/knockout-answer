import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServiceReviewPage } from './service-review.page';

describe('ServiceReviewPage', () => {
  let component: ServiceReviewPage;
  let fixture: ComponentFixture<ServiceReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProServicesPage } from './pro-services.page';

describe('ProServicesPage', () => {
  let component: ProServicesPage;
  let fixture: ComponentFixture<ProServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

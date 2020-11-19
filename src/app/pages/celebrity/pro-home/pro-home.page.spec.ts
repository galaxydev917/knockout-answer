import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProHomePage } from './pro-home.page';

describe('ProHomePage', () => {
  let component: ProHomePage;
  let fixture: ComponentFixture<ProHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

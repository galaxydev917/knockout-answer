import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProProfilePage } from './pro-profile.page';

describe('ProProfilePage', () => {
  let component: ProProfilePage;
  let fixture: ComponentFixture<ProProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

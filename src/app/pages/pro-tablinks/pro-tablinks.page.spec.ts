import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProTablinksPage } from './pro-tablinks.page';

describe('ProTablinksPage', () => {
  let component: ProTablinksPage;
  let fixture: ComponentFixture<ProTablinksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProTablinksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProTablinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

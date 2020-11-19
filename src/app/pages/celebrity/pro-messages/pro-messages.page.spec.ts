import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProMessagesPage } from './pro-messages.page';

describe('ProMessagesPage', () => {
  let component: ProMessagesPage;
  let fixture: ComponentFixture<ProMessagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProMessagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProMessagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

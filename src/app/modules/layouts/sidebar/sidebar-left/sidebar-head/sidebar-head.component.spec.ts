import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHeadComponent } from './sidebar-head.component';
import { LoginService } from 'src/app/modules/authen/service/login.service';

describe('SidebarHeadComponent', () => {
  let component: SidebarHeadComponent;
  let fixture: ComponentFixture<SidebarHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarHeadComponent],
      providers: [LoginService]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

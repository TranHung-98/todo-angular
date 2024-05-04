import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarHeadComponent } from './sidebar-head.component';

describe('SidebarHeadComponent', () => {
  let component: SidebarHeadComponent;
  let fixture: ComponentFixture<SidebarHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarHeadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

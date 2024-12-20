import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgendamientosComponent } from './admin-agendamientos.component';

describe('AdminAgendamientosComponent', () => {
  let component: AdminAgendamientosComponent;
  let fixture: ComponentFixture<AdminAgendamientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAgendamientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAgendamientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

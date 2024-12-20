import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVehiculosComponent } from './admin-vehiculos.component';

describe('AdminVehiculosComponent', () => {
  let component: AdminVehiculosComponent;
  let fixture: ComponentFixture<AdminVehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminVehiculosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

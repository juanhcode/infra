import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidarFormularioComponent } from './olvidar-formulario.component';

describe('OlvidarFormularioComponent', () => {
  let component: OlvidarFormularioComponent;
  let fixture: ComponentFixture<OlvidarFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OlvidarFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OlvidarFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

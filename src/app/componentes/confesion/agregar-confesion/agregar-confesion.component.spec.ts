import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarConfesionComponent } from './agregar-confesion.component';

describe('AgregarConfesionComponent', () => {
  let component: AgregarConfesionComponent;
  let fixture: ComponentFixture<AgregarConfesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarConfesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarConfesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

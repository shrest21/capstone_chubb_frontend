import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousestockComponent } from './warehousestock.component';

describe('WarehousestockComponent', () => {
  let component: WarehousestockComponent;
  let fixture: ComponentFixture<WarehousestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehousestockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WarehousestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

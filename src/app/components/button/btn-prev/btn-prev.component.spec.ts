import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPrevComponent } from './btn-prev.component';

describe('BtnPrevComponent', () => {
  let component: BtnPrevComponent;
  let fixture: ComponentFixture<BtnPrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnPrevComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnPrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

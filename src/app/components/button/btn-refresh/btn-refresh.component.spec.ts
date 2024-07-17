import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnRefreshComponent } from './btn-refresh.component';

describe('BtnRefreshComponent', () => {
  let component: BtnRefreshComponent;
  let fixture: ComponentFixture<BtnRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnRefreshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

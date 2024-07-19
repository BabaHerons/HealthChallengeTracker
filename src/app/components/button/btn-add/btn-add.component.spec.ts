import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddComponent } from './btn-add.component';

describe('BtnAddComponent', () => {
  let component: BtnAddComponent;
  let fixture: ComponentFixture<BtnAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it("should return the passed functionality to the button", () => {
  //   let btn = new BtnAddComponent
  //   let result = btn.btnClick()
  // })

  it('should correctly @Output value of text input in component', () => {
    spyOn(component.onClick, 'emit')
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
  
    expect(component.onClick.emit).toHaveBeenCalledWith(component.btnClick());
  });
});

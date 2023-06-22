import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LemsSelectComponent } from './lems-select.component';

describe('LemsSelectComponent', () => {
  let component: LemsSelectComponent;
  let fixture: ComponentFixture<LemsSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

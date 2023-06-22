import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IperlemsSelectComponent } from './iperlems-select.component';

describe('IperlemsSelectComponent', () => {
  let component: IperlemsSelectComponent;
  let fixture: ComponentFixture<IperlemsSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IperlemsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IperlemsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

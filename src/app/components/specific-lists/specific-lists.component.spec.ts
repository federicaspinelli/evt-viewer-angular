import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpecificListsComponent } from './specific-lists.component';

describe('SpecificListsComponent', () => {
  let component: SpecificListsComponent;
  let fixture: ComponentFixture<SpecificListsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

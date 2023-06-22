import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemEntryComponent } from './lem-entry.component';

describe('LemEntryComponent', () => {
  let component: LemEntryComponent;
  let fixture: ComponentFixture<LemEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LemEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemEntryReadingsComponent } from './lem-entry-readings.component';

describe('LemEntryReadingsComponent', () => {
  let component: LemEntryReadingsComponent;
  let fixture: ComponentFixture<LemEntryReadingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LemEntryReadingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LemEntryReadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemEntryDetailComponent } from './lem-entry-detail.component';

describe('LemEntryDetailComponent', () => {
  let component: LemEntryDetailComponent;
  let fixture: ComponentFixture<LemEntryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LemEntryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LemEntryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

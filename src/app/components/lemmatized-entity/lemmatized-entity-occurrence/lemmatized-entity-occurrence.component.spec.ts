import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LemmatizedEntityOccurrenceComponent } from './lemmatized-entity-occurrence.component';

describe('LemmatizedEntityOccurrenceComponent', () => {
  let component: LemmatizedEntityOccurrenceComponent;
  let fixture: ComponentFixture<LemmatizedEntityOccurrenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntityOccurrenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntityOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

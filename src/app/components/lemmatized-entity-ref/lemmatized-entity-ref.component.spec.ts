import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LemmatizedEntityRefComponent } from './lemmatized-entity-ref.component';

describe('LemmatizedEntityRefComponent', () => {
  let component: LemmatizedEntityRefComponent;
  let fixture: ComponentFixture<LemmatizedEntityRefComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntityRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntityRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

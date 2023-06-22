import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LemmatizedEntityComponent } from './lemmatized-entity.component';

describe('LemmatizedEntityComponent', () => {
  let component: LemmatizedEntityComponent;
  let fixture: ComponentFixture<LemmatizedEntityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LemmatizedEntitiesListComponent } from './lemmatized-entities-list.component';

describe('LemmatizedEntitiesListComponent', () => {
  let component: LemmatizedEntitiesListComponent;
  let fixture: ComponentFixture<LemmatizedEntitiesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

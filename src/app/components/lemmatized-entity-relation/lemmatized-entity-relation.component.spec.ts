import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LemmatizedEntityRelationComponent } from './lemmatized-entity-relation.component';

describe('LemmatizedEntityRelationComponent', () => {
  let component: LemmatizedEntityRelationComponent;
  let fixture: ComponentFixture<LemmatizedEntityRelationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntityRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntityRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LemmatizedEntityDetailComponent } from './lemmatized-entity-detail.component';

describe('LemmatizedEntityDetailComponent', () => {
  let component: LemmatizedEntityDetailComponent;
  let fixture: ComponentFixture<LemmatizedEntityDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LemmatizedEntityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LemmatizedEntityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

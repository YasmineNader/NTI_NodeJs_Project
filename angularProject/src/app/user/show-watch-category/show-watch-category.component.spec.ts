import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowWatchCategoryComponent } from './show-watch-category.component';

describe('ShowWatchCategoryComponent', () => {
  let component: ShowWatchCategoryComponent;
  let fixture: ComponentFixture<ShowWatchCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowWatchCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowWatchCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

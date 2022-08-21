import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FligtListComponent } from './fligt-list.component';

describe('FligtListComponent', () => {
  let component: FligtListComponent;
  let fixture: ComponentFixture<FligtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FligtListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FligtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

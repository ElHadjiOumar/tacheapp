import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionProjetComponent } from './selection-projet.component';

describe('SelectionProjetComponent', () => {
  let component: SelectionProjetComponent;
  let fixture: ComponentFixture<SelectionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

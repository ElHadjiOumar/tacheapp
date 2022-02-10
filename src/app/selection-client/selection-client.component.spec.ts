import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionClientComponent } from './selection-client.component';

describe('SelectionClientComponent', () => {
  let component: SelectionClientComponent;
  let fixture: ComponentFixture<SelectionClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

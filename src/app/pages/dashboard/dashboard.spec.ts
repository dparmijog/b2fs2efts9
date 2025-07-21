import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Dashboard } from './dashboard';

describe('Dashboard - Standalone Component Tests', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Dashboard, // Import standalone component directly
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should be a standalone component', () => {
    // This test verifies the component can be imported directly without declarations
    expect(component).toBeInstanceOf(Dashboard);
  });

  it('should render the welcome message correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome to the IdentiWorld!');
  });

  it('should have proper template structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element).toBeTruthy();
    expect(h1Element?.tagName).toBe('H1');
  });

  it('should display content without external dependencies', () => {
    // Tests that the standalone component works independently
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.trim()).toBeTruthy();
    expect(compiled.textContent).toContain('Welcome');
  });
});
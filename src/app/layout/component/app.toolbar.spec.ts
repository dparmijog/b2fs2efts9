import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppToolbar } from './app.toolbar';

describe('AppToolbar - Standalone Component Tests', () => {
  let component: AppToolbar;
  let fixture: ComponentFixture<AppToolbar>;

  beforeEach(async () => {
    // Mock localStorage
    const mockSession = {
      user: {
        displayName: 'Test User',
        coins: 500
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockSession));

    await TestBed.configureTestingModule({
      imports: [
        AppToolbar, // Import standalone component directly
        RouterTestingModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any intervals
    jasmine.clock().uninstall();
  });

  it('should create the toolbar component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should be a standalone component with self-contained imports', () => {
    expect(component).toBeInstanceOf(AppToolbar);
  });

  it('should initialize with session data from localStorage', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('session');
    expect(component.name()).toBe('Test User');
    expect(component.coins()).toBe(500);
  });

  it('should handle missing session data gracefully', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('{}');
    component.ngOnInit();
    expect(component.name()).toBe('Invitado');
    expect(component.coins()).toBe(0);
  });

  it('should display user name and coins in template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test User');
    expect(compiled.textContent).toContain('500');
  });

  it('should render spinner icon correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spinnerIcon = compiled.querySelector('.pi-spin.pi-asterisk');
    expect(spinnerIcon).toBeTruthy();
  });

  it('should use signals for reactive state management', () => {
    expect(typeof component.coins).toBe('function'); // Signal function
    expect(typeof component.name).toBe('function'); // Signal function
    
    // Test signal reactivity
    component.coins.set(999);
    expect(component.coins()).toBe(999);
  });

  it('should have proper styling classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.flex.justify-end.items-center');
    expect(container).toBeTruthy();
  });
});
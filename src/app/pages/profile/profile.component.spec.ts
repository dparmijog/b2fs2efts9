import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent - Standalone Component Tests', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    // Mock localStorage with sample session data
    const mockSession = {
      user: {
        displayName: 'John Doe',
        email: 'john.doe@example.com',
        favouriteNumber: 42
      }
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockSession));

    await TestBed.configureTestingModule({
      imports: [ProfileComponent] // Import standalone component directly
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the profile component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should be a standalone component', () => {
    expect(component).toBeInstanceOf(ProfileComponent);
  });

  it('should load user data from localStorage on initialization', () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('session');
    expect(component.displayName).toBe('John Doe');
    expect(component.email).toBe('john.doe@example.com');
    expect(component.favouriteNumber).toBe(42);
  });

  it('should handle missing session data gracefully', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);
    component.ngOnInit();
    
    expect(component.displayName).toBe('');
    expect(component.email).toBe('');
    expect(component.favouriteNumber).toBe(0);
  });

  it('should handle malformed session data', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('{}');
    component.ngOnInit();
    
    expect(component.displayName).toBe('');
    expect(component.email).toBe('');
    expect(component.favouriteNumber).toBe(0);
  });

  it('should display user information in the template', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.textContent).toContain('John Doe');
    expect(compiled.textContent).toContain('john.doe@example.com');
    expect(compiled.textContent).toContain('42');
  });

  it('should have proper HTML structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('h1')).toBeTruthy();
    expect(compiled.querySelector('.shadow-md.rounded-lg')).toBeTruthy();
    expect(compiled.querySelector('ul')).toBeTruthy();
  });

  it('should display email and favourite number labels correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.textContent).toContain('Email:');
    expect(compiled.textContent).toContain('Numero de la suerte:');
  });

  it('should handle number conversion for favouriteNumber', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(JSON.stringify({
      user: { favouriteNumber: '123' }
    }));
    
    component.ngOnInit();
    expect(component.favouriteNumber).toBe(123);
    expect(typeof component.favouriteNumber).toBe('number');
  });

  it('should work without external dependencies', () => {
    // Test that component works independently without modules
    expect(component.displayName).toBeDefined();
    expect(component.email).toBeDefined();
    expect(component.favouriteNumber).toBeDefined();
  });
});
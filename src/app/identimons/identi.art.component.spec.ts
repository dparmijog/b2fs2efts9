import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdentiArtComponent } from './identi.art.component';

describe('IdentiArtComponent - Standalone Component Tests', () => {
  let component: IdentiArtComponent;
  let fixture: ComponentFixture<IdentiArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdentiArtComponent] // Import standalone component directly
    }).compileComponents();

    fixture = TestBed.createComponent(IdentiArtComponent);
    component = fixture.componentInstance;
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should be a completely standalone component', () => {
    expect(component).toBeInstanceOf(IdentiArtComponent);
  });

  it('should initialize with empty id by default', () => {
    expect(component.id).toBe('');
  });

  it('should accept id input property', () => {
    const testId = 'test-123-abc';
    component.id = testId;
    expect(component.id).toBe(testId);
  });

  it('should generate art data URL correctly', () => {
    component.id = 'test-id';
    const artUrl = component.art();
    expect(artUrl).toContain('data:image/svg+xml,');
    expect(artUrl).toContain('%3C'); // URL encoded SVG content
  });

  it('should render img element with correct attributes', () => {
    component.id = 'sample-id';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    const imgElement = compiled.querySelector('img');
    
    expect(imgElement).toBeTruthy();
    expect(imgElement?.getAttribute('src')).toContain('data:image/svg+xml,');
  });

  it('should update art when id changes', () => {
    component.id = 'first-id';
    const firstArt = component.art();
    
    component.id = 'second-id';
    const secondArt = component.art();
    
    expect(firstArt).not.toBe(secondArt);
  });

  it('should work with empty id gracefully', () => {
    component.id = '';
    expect(() => component.art()).not.toThrow();
    expect(component.art()).toContain('data:image/svg+xml,');
  });

  it('should generate consistent art for same id', () => {
    const testId = 'consistent-test';
    component.id = testId;
    const art1 = component.art();
    const art2 = component.art();
    
    expect(art1).toBe(art2);
  });

  it('should have proper template structure', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.children.length).toBe(1);
    expect(compiled.firstElementChild?.tagName).toBe('IMG');
  });
});
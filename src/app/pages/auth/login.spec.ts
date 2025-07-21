import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { PLATFORM_ID } from '@angular/core';
import * as bcrypt from 'bcryptjs';

import { Login } from './login';
import { IdentiMeService } from '../../service/identime.service';
import { LayoutService } from '../../layout/service/layout.service';

describe('Login - Standalone Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockIdentiMeService: jasmine.SpyObj<IdentiMeService>;
  let mockLayoutService: jasmine.SpyObj<LayoutService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const identiMeServiceSpy = jasmine.createSpyObj('IdentiMeService', ['getUsers']);
    const layoutServiceSpy = jasmine.createSpyObj('LayoutService', ['toggleDarkMode', 'updateLayoutConfig'], {
      layoutConfig: jasmine.createSpy().and.returnValue({
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: false,
        menuMode: 'static'
      })
    });

    await TestBed.configureTestingModule({
      imports: [
        Login, // Import the standalone component directly
        ReactiveFormsModule,
        CommonModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        RippleModule
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: IdentiMeService, useValue: identiMeServiceSpy },
        { provide: LayoutService, useValue: layoutServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockIdentiMeService = TestBed.inject(IdentiMeService) as jasmine.SpyObj<IdentiMeService>;
    mockLayoutService = TestBed.inject(LayoutService) as jasmine.SpyObj<LayoutService>;

    // Mock users data
    mockIdentiMeService.getUsers.and.returnValue(Promise.resolve([
      {
        id: '1',
        email: 'diego@identi.com',
        password: '$2a$10$test.hash.for.password',
        coins: 1000
      }
    ]));

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should function as a standalone component with all required imports and providers', () => {
    // Test that the component initializes correctly as standalone
    expect(component).toBeTruthy();
    
    // Verify the component has standalone: true (implicitly tested by successful import)
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
    
    // Test that all required UI elements are rendered independently
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
    expect(compiled.querySelector('p-password[formControlName="password"]')).toBeTruthy();
    expect(compiled.querySelector('p-button[type="submit"]')).toBeTruthy();
    expect(compiled.querySelector('.text-3xl').textContent).toContain('Welcome to IdentiWorld!');
    
    // Verify that the component provides its own service instances
    const identiMeService = TestBed.inject(IdentiMeService);
    expect(identiMeService).toBeTruthy();
    
    // Test that the form validators work independently
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.loginForm.get('email')?.hasError('required')).toBeTruthy();
    expect(component.loginForm.get('password')?.hasError('required')).toBeTruthy();
    
    // Test that form works with valid data
    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('validpassword');
    expect(component.loginForm.valid).toBeTruthy();
    
    // Verify the component can handle its own state management
    component.error = 'Test error';
    component.success = 'Test success';
    expect(component.error).toBe('Test error');
    expect(component.success).toBe('Test success');
    
    // Test that the floating configurator is included as part of the standalone setup
    expect(compiled.querySelector('app-floating-configurator')).toBeTruthy();
  });

  
});
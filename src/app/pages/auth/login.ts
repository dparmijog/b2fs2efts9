import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import bcrypt from 'bcryptjs'
import { CommonModule } from '@angular/common';
import { IdentiMeService } from '../../service/identime.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule, PasswordModule, CommonModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to IdentiWorld!</div>
                            <span class="text-muted-color font-medium">Log in to continue</span>
                        </div>

                        <form class="flex flex-col items-start " [formGroup]="loginForm" (ngSubmit)="authenticate()" novalidate>
                            <input pInputText id="email1" formControlName="email" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" />

                            <p-password id="password" formControlName="password" placeholder="Password" [toggleMask]="true" styleClass="w-full md:w-[30rem] mb-8" [fluid]="true" [feedback]="false"></p-password>

                            <!-- <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div> -->
                            <p-button label="Ingresar" styleClass="w-full" type="submit"></p-button>
                        </form>
                    </div>
            </div>
        </div>
    `,
    providers: [IdentiMeService]
})
export class Login implements OnInit {
    loginForm!: FormGroup;

    error: string = '';
    success: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private identiMeService: IdentiMeService
    ) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group(
            {
                email: ['diego@identi.com', [Validators.required, Validators.email,  Validators.minLength(4)]],
                password: ['p4ssw0rd.', [Validators.required, Validators.minLength(4)]],
            }
        );
    }

    async authenticate() {
        this.error = '';
        this.success = '';

        if (this.loginForm.invalid) {
            this.error = 'Revisa los campos, hay errores en el formulario.';
            return;
        }

        const { email, password } = this.loginForm.value;

        const users = await this.identiMeService.getUsers();

        if (!users.some((user: any) => user.email === email)) {
            this.error = 'No existe ningun usuario registrado con este email'
            return;
        }
        const user = users.find((user: any) => user.email === email);
        const checkedPassword = await bcrypt.compare(password, user.password)

        if(checkedPassword) {
            localStorage.setItem('session', JSON.stringify({
                user: user,
                expiresAt: new Date().valueOf() + 60 * 30 * 1000,
                coins: user.coins || 1000
            }))
            setTimeout(() => this.router.navigate(['/identiworld']), 1500);
        }
        
        this.success = 'Usuario autenticado';
        
    }
}

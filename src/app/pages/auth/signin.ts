import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { ulid } from 'ulid';
import { CommonModule } from '@angular/common';
import bcrypt from 'bcryptjs';

@Component({
    selector: 'app-sign-in',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule, PasswordModule, CommonModule],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20">
                    Ingresa a IdentiWorld
                    <div class="text-center mb-8"></div>

                    <div class="flex flex-col items-center justify-center">
                        <form class="flex flex-col items-start " [formGroup]="formGroup" (ngSubmit)="registerUser()" novalidate>
                            <label for="email" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Correo Electronico</label>
                            <input pInputText id="email" formControlName="email" type="text" placeholder="Correo Electronico" class="w-full mb-8" />
                            <div>
                                <label for="password0" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                                <p-password id="password0" formControlName="password0" placeholder="Password" styleClass=" mb-8" [toggleMask]="true" [feedback]="false"></p-password>
                            </div>
                            <div>
                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                                <p-password id="password1" formControlName="password1" placeholder="Password" styleClass="mb-8" [toggleMask]="true" [feedback]="false"></p-password>
                            </div>
                            <label for="displayName" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Display Name</label>
                            <input pInputText id="displayName" formControlName="displayName" type="text" placeholder="Display Name" class="w-full mb-8" />

                            <label for="favouriteNumber" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Favourite Number</label>
                            <input pInputText id="favouriteNumber" formControlName="favouriteNumber" type="number" placeholder="Favourite Number" class="w-full mb-8" />

                            <label for="birthDate" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Birth Date</label>
                            <input pInputText id="birthDate" type="date" formControlName="birthDate" placeholder="Birth Date" class="w-full mb-8" />

                            <p-button label="Submit" styleClass="w-full" type="submit"></p-button>
                            <div class="col-12 text-center">
                                <div *ngIf="error" class="alert alert-danger mt-3">{{ error }}</div>
                                <div *ngIf="success" class="alert alert-success mt-3">{{ success }}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class SignIn implements OnInit {
    formGroup!: FormGroup;

    error: string = '';
    success: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
    ) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group(
            {
                email: ['diego@identi.com', [Validators.required, Validators.email]],
                displayName: ['Dio Brando', [Validators.required, Validators.minLength(4)]],
                favouriteNumber: [42, Validators.required],
                birthDate: [new Date(), Validators.required],
                password0: ['p4ssw0rd.', [Validators.required, Validators.minLength(4)]],
                password1: ['p4ssw0rd.', [Validators.required, Validators.minLength(4)]]
            },
            {
                validators: [this.checkPasswords]
            }
        );
    }

    checkPasswords(group: AbstractControl): ValidationErrors | null {
        const pass0 = group.get('password0')?.value;
        const pass1 = group.get('password1')?.value;
        return pass0 === pass1 ? null : { passwordMatch: false };
    }

    async registerUser() {
        console.log('asjkd');
        this.error = '';
        this.success = '';

        if (this.formGroup.invalid) {
            this.error = 'Revisa los campos, hay errores en el formulario.';
            return;
        }

        const { email, displayName, favouriteNumber, birthDate, password0 } = this.formGroup.value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some((user: any) => user.email === email)) {
            this.error = 'Ya existe un usuario con ese correo electrónico.';
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPasssword = await bcrypt.hash(password0, salt);
        users.push({
            email,
            displayName,
            favouriteNumber,
            birthDate,
            password: hashedPasssword,
            coins: 1000
        });
        localStorage.setItem('users', JSON.stringify(users));

        this.success = 'Usuario registrado con éxito. Ahora puedes iniciar sesión.';
        setTimeout(() => this.router.navigate(['/login']), 1500);
    }
}

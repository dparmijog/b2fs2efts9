import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { ulid } from 'ulid';

@Component({
    selector: 'app-quit',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, IdentiArtComponent],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20">
                        <app-identi-art id={{hash()}} />
                        Saliendo...
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Quit implements OnInit {
    email: string = '';

    password: string = '';

    checked: boolean = false;

    hash = signal<string>("");

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        setInterval(() => {
            this.hash.set(ulid());
        }, 666)
        
        setTimeout(() => {
            const session = JSON.parse(localStorage.getItem("session") || "{}");
            
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const newUsers = users.map((user: any) => {
                if (user.email === session?.user?.email) {
                    return {
                        ...user,
                        identimons: session?.user?.identimons || [],
                        coins: session?.user?.coins || 125,
                    };
                }
                return user;
            });
            localStorage.setItem("users",  JSON.stringify(newUsers));
            localStorage.removeItem("session");
            this.router.navigate(['/']);
        }, 666 * 3);
        
    }
}

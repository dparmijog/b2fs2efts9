import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule],
    template: ` <div class="flex justify-end  items-center" style="margin-bottom: 1rem;">
        <span class="ml-2 mr-8">{{name()}}</span>
        <i class="pi pi-spin pi-asterisk" style="font-size: 1rem; margin-right: 1rem;"></i>
        {{coins()}}
        
    </div>`
})
export class AppToolbar implements OnInit {
    coins = signal<number>(0);
    name = signal<string>('');

    ngOnInit() {
        localStorage.getItem('session');
        const session = JSON.parse(localStorage.getItem('session') || '{}');
        this.coins.set(session?.user?.coins || 0);
        this.name.set(session?.user?.displayName || 'Invitado');
        setInterval(() => {
            this.coins.set(session?.user?.coins || 0);
        }, 1000);
    }
}

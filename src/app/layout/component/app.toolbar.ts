import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';

/**
 * Toolbar component that displays user information and game statistics
 * Shows the user's name and coin balance, updating periodically from session data
 * @class AppToolbar
 * @implements {OnInit}
 */
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
    /** Signal containing the user's current coin balance */
    coins = signal<number>(0);
    
    /** Signal containing the user's display name */
    name = signal<string>('');

    /**
     * Angular lifecycle hook that runs after component initialization
     * Loads user data from session storage and sets up periodic updates for coin balance
     */
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

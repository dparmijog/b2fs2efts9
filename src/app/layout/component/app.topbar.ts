import { Component, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { ulid } from 'ulid';

/**
 * Top navigation bar component that provides application branding and controls
 * Contains menu toggle, logo, dark mode toggle, and configuration options
 * @class AppTopbar
 * @implements {OnInit}
 */
@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, IdentiArtComponent],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <div style="width: 50px">
                    <app-identi-art id="{{hash()}}" />
                </div>
                <span>IDENTI</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>
        </div>
    </div>`
})
export class AppTopbar implements OnInit {
    /** Menu items for the topbar actions */
    items!: MenuItem[];
    
    /** Signal containing a random hash for animated logo */
    hash = signal<string>("");

    /**
     * Constructor that injects the layout service
     * @param layoutService - Service for managing layout state and theme
     */
    constructor(public layoutService: LayoutService) {}

    /**
     * Toggles between light and dark theme modes
     * Updates the layout configuration to switch themes
     */
    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    /**
     * Angular lifecycle hook that runs after component initialization
     * Sets up interval to periodically update the animated logo hash
     */
    ngOnInit(): void {
        setInterval(() => {
            this.hash.set(ulid());
        }, 666);
    }
}

import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';

/**
 * Sidebar component that contains the main navigation menu
 * Provides a container for the application's primary navigation
 * @class AppSidebar
 */
@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu],
    template: ` <div class="layout-sidebar">
        <app-menu></app-menu>
    </div>`
})
export class AppSidebar {
    /**
     * Constructor that injects the ElementRef for DOM access
     * @param el - Reference to the component's DOM element
     */
    constructor(public el: ElementRef) {}
}

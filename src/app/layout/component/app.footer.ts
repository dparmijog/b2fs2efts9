import { Component } from '@angular/core';

/**
 * Footer component that displays application credits and branding
 * Simple component that shows attribution information at the bottom of the layout
 * @class AppFooter
 */
@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Identi by
        <a href="https://primeng.org" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Diego</a>
    </div>`
})
export class AppFooter {}

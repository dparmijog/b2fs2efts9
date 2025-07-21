import { Component } from '@angular/core';

/**
 * Dashboard component that serves as the main welcome page for the IdentiWorld application
 * Displays a welcome message to users when they first enter the application
 * @class Dashboard
 */
@Component({
    selector: 'app-dashboard',
    standalone: true,
    template: `
       <h1> Welcome to the IdentiWorld! </h1>
    `
})
export class Dashboard {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Root component of the IdentiWorld application
 * Serves as the main entry point and router outlet container
 * @class AppComponent
 */
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}

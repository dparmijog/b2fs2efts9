import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Notfound } from './app/pages/notfound/notfound';
import { Login } from './app/pages/auth/login';
import { Quit } from './app/pages/auth/quit';
import { SignIn } from './app/pages/auth/signin';
import { IdentiWorld } from './app/pages/identiworld/identiworld';
import { ProfileComponent } from './app/pages/profile/profile.component';
import { TeamComponent } from './app/pages/team/team.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'identiworld', component: IdentiWorld },
            { path: 'profile', component: ProfileComponent },
            { path: 'team', component: TeamComponent }
        ]
    },
    { path: 'notfound', component: Notfound },
    {
        path: 'auth',
        component: Login
    },
    {
        path: 'register',
        component: SignIn
    },
    {
        path: 'quit',
        component: Quit
    },
    {
        path: '**',
        redirectTo: '/notfound'
    }
];

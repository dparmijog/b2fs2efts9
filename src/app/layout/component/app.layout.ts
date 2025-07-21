import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../service/layout.service';
import { AppToolbar } from "./app.toolbar";

/**
 * Main layout component that orchestrates the overall application structure
 * Manages the topbar, sidebar, main content area, and handles responsive menu behavior
 * @class AppLayout
 */
@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter, AppToolbar],
    template: `<div class="layout-wrapper" [ngClass]="containerClass">
        <app-topbar></app-topbar>
        <app-sidebar></app-sidebar>
        <div class="layout-main-container">
            
            <div class="layout-main">
                <app-toolbar></app-toolbar>
                <router-outlet></router-outlet>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div> `
})
export class AppLayout {
    /** Subscription to overlay menu open events */
    overlayMenuOpenSubscription: Subscription;

    /** Event listener for clicks outside the menu */
    menuOutsideClickListener: any;

    /** Reference to the sidebar component */
    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    /** Reference to the topbar component */
    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    /**
     * Constructor that injects dependencies and sets up menu behavior
     * @param layoutService - Service for managing layout state
     * @param renderer - Angular Renderer2 for DOM manipulation
     * @param router - Angular Router for navigation events
     */
    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });
    }

    /**
     * Determines if a click event occurred outside the menu area
     * @param event - The mouse click event
     * @returns True if click was outside menu elements
     */
    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    /**
     * Hides the menu and cleans up event listeners
     * Updates layout state and removes outside click listener
     */
    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    /**
     * Prevents body scrolling when mobile menu is active
     * Adds CSS class to block scroll behavior
     */
    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    /**
     * Restores body scrolling when mobile menu is closed
     * Removes CSS class that blocks scroll behavior
     */
    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    /**
     * Computed property that returns CSS classes for the layout container
     * Classes change based on menu mode and state
     * @returns Object with CSS class names as keys and boolean values
     */
    get containerClass() {
        return {
            'layout-overlay': this.layoutService.layoutConfig().menuMode === 'overlay',
            'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    /**
     * Angular lifecycle hook for cleanup when component is destroyed
     * Unsubscribes from observables and removes event listeners
     */
    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}

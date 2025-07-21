import { Injectable, effect, signal, computed } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Configuration interface for the application layout
 * @interface layoutConfig
 */
export interface layoutConfig {
    /** Theme preset name (Aura, Lara, Nora) */
    preset?: string;
    /** Primary color theme */
    primary?: string;
    /** Surface color configuration */
    surface?: string | undefined | null;
    /** Whether dark theme is enabled */
    darkTheme?: boolean;
    /** Menu display mode (static, overlay) */
    menuMode?: string;
}

/**
 * Interface defining the current state of the layout
 * @interface LayoutState
 */
interface LayoutState {
    /** Whether the desktop static menu is inactive */
    staticMenuDesktopInactive?: boolean;
    /** Whether the overlay menu is currently active */
    overlayMenuActive?: boolean;
    /** Whether the configuration sidebar is visible */
    configSidebarVisible?: boolean;
    /** Whether the mobile static menu is active */
    staticMenuMobileActive?: boolean;
    /** Whether menu hover state is active */
    menuHoverActive?: boolean;
}

/**
 * Interface for menu change events
 * @interface MenuChangeEvent
 */
interface MenuChangeEvent {
    /** The key identifying the menu item */
    key: string;
    /** Whether this event was triggered by route navigation */
    routeEvent?: boolean;
}

/**
 * Service responsible for managing the application layout state and configuration
 * Handles theme switching, menu states, and responsive behavior
 * @class LayoutService
 */
@Injectable({
    providedIn: 'root'
})
export class LayoutService {
    /** Internal configuration object */
    _config: layoutConfig = {
        preset: 'Aura',
        primary: 'emerald',
        surface: null,
        darkTheme: true,
        menuMode: 'static'
    };

    /** Internal state object */
    _state: LayoutState = {
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    };

    /** Signal containing the current layout configuration */
    layoutConfig = signal<layoutConfig>(this._config);

    /** Signal containing the current layout state */
    layoutState = signal<LayoutState>(this._state);

    /** Subject for broadcasting configuration updates */
    private configUpdate = new Subject<layoutConfig>();

    /** Subject for overlay open events */
    private overlayOpen = new Subject<any>();

    /** Subject for menu state change events */
    private menuSource = new Subject<MenuChangeEvent>();

    /** Subject for reset events */
    private resetSource = new Subject();

    /** Observable stream of menu source events */
    menuSource$ = this.menuSource.asObservable();

    /** Observable stream of reset events */
    resetSource$ = this.resetSource.asObservable();

    /** Observable stream of configuration updates */
    configUpdate$ = this.configUpdate.asObservable();

    /** Observable stream of overlay open events */
    overlayOpen$ = this.overlayOpen.asObservable();

    /** Computed property returning the current theme mode */
    theme = computed(() => (this.layoutConfig()?.darkTheme ? 'light' : 'dark'));

    /** Computed property indicating if sidebar is active */
    isSidebarActive = computed(() => this.layoutState().overlayMenuActive || this.layoutState().staticMenuMobileActive);

    /** Computed property indicating if dark theme is enabled */
    isDarkTheme = computed(() => this.layoutConfig().darkTheme);

    /** Computed property returning the primary color */
    getPrimary = computed(() => this.layoutConfig().primary);

    /** Computed property returning the surface color */
    getSurface = computed(() => this.layoutConfig().surface);

    /** Computed property indicating if overlay mode is active */
    isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

    /** Signal indicating if theme transition is complete */
    transitionComplete = signal<boolean>(false);

    /** Flag to track if the service has been initialized */
    private initialized = false;

    /**
     * Constructor that sets up reactive effects for configuration and theme changes
     */
    constructor() {
        effect(() => {
            const config = this.layoutConfig();
            if (config) {
                this.onConfigUpdate();
            }
        });

        effect(() => {
            const config = this.layoutConfig();

            if (!this.initialized || !config) {
                this.initialized = true;
                return;
            }

            this.handleDarkModeTransition(config);
        });
    }

    /**
     * Handles dark mode transition with or without view transitions API
     * @param config - The layout configuration
     * @private
     */
    private handleDarkModeTransition(config: layoutConfig): void {
        if ((document as any).startViewTransition) {
            this.startViewTransition(config);
        } else {
            this.toggleDarkMode(config);
            this.onTransitionEnd();
        }
    }

    /**
     * Starts a view transition for smooth theme switching
     * @param config - The layout configuration
     * @private
     */
    private startViewTransition(config: layoutConfig): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(config);
        });

        transition.ready
            .then(() => {
                this.onTransitionEnd();
            })
            .catch(() => {});
    }

    /**
     * Toggles between light and dark theme modes
     * @param config - Optional configuration object, uses current config if not provided
     */
    toggleDarkMode(config?: layoutConfig): void {
        const _config = config || this.layoutConfig();
        if (_config.darkTheme) {
            document.documentElement.classList.add('app-dark');
        } else {
            document.documentElement.classList.remove('app-dark');
        }
    }

    /**
     * Handles the completion of theme transition
     * @private
     */
    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }

    /**
     * Handles menu toggle logic for both overlay and static modes
     * Manages different behavior for desktop and mobile devices
     */
    onMenuToggle() {
        if (this.isOverlay()) {
            this.layoutState.update((prev) => ({ ...prev, overlayMenuActive: !this.layoutState().overlayMenuActive }));

            if (this.layoutState().overlayMenuActive) {
                this.overlayOpen.next(null);
            }
        }

        if (this.isDesktop()) {
            this.layoutState.update((prev) => ({ ...prev, staticMenuDesktopInactive: !this.layoutState().staticMenuDesktopInactive }));
        } else {
            this.layoutState.update((prev) => ({ ...prev, staticMenuMobileActive: !this.layoutState().staticMenuMobileActive }));

            if (this.layoutState().staticMenuMobileActive) {
                this.overlayOpen.next(null);
            }
        }
    }

    /**
     * Determines if the current viewport is desktop size
     * @returns True if viewport width is greater than 991px
     */
    isDesktop() {
        return window.innerWidth > 991;
    }

    /**
     * Determines if the current viewport is mobile size
     * @returns True if viewport width is 991px or less
     */
    isMobile() {
        return !this.isDesktop();
    }

    /**
     * Handles configuration update events
     * Synchronizes internal config and broadcasts the change
     */
    onConfigUpdate() {
        this._config = { ...this.layoutConfig() };
        this.configUpdate.next(this.layoutConfig());
    }

    /**
     * Updates the layout configuration with new values
     * @param config - Partial configuration object with properties to update
     */
    updateLayoutConfig(config: Partial<layoutConfig>) {
        this.layoutConfig.set({ ...this.layoutConfig(), ...config });
    }

    /**
     * Handles menu state change events
     * @param event - The menu change event containing key and route information
     */
    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    /**
     * Triggers a reset event for the layout
     */
    reset() {
        this.resetSource.next(true);
    }
}

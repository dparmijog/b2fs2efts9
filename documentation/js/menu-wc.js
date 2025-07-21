'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">identi-ng documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppConfigurator.html" data-type="entity-link" >AppConfigurator</a>
                            </li>
                            <li class="link">
                                <a href="components/AppFloatingConfigurator.html" data-type="entity-link" >AppFloatingConfigurator</a>
                            </li>
                            <li class="link">
                                <a href="components/AppFooter.html" data-type="entity-link" >AppFooter</a>
                            </li>
                            <li class="link">
                                <a href="components/AppLayout.html" data-type="entity-link" >AppLayout</a>
                            </li>
                            <li class="link">
                                <a href="components/AppMenu.html" data-type="entity-link" >AppMenu</a>
                            </li>
                            <li class="link">
                                <a href="components/AppMenuitem.html" data-type="entity-link" >AppMenuitem</a>
                            </li>
                            <li class="link">
                                <a href="components/AppSidebar.html" data-type="entity-link" >AppSidebar</a>
                            </li>
                            <li class="link">
                                <a href="components/AppToolbar.html" data-type="entity-link" >AppToolbar</a>
                            </li>
                            <li class="link">
                                <a href="components/AppTopbar.html" data-type="entity-link" >AppTopbar</a>
                            </li>
                            <li class="link">
                                <a href="components/Dashboard.html" data-type="entity-link" >Dashboard</a>
                            </li>
                            <li class="link">
                                <a href="components/IdentiArtComponent.html" data-type="entity-link" >IdentiArtComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IdentiStatsComponent.html" data-type="entity-link" >IdentiStatsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IdentiWorld.html" data-type="entity-link" >IdentiWorld</a>
                            </li>
                            <li class="link">
                                <a href="components/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="components/Notfound.html" data-type="entity-link" >Notfound</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileComponent.html" data-type="entity-link" >ProfileComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/Quit.html" data-type="entity-link" >Quit</a>
                            </li>
                            <li class="link">
                                <a href="components/SignIn.html" data-type="entity-link" >SignIn</a>
                            </li>
                            <li class="link">
                                <a href="components/TeamComponent.html" data-type="entity-link" >TeamComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/IdentiMeService.html" data-type="entity-link" >IdentiMeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IdentiWorldService.html" data-type="entity-link" >IdentiWorldService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Identimon.html" data-type="entity-link" >Identimon</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/layoutConfig.html" data-type="entity-link" >layoutConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayoutState.html" data-type="entity-link" >LayoutState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuChangeEvent.html" data-type="entity-link" >MenuChangeEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stats.html" data-type="entity-link" >Stats</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
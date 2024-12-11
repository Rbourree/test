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
                    <a href="index.html" data-type="index-link">dougs-romain documentation</a>
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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' : 'data-bs-target="#xs-controllers-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' :
                                            'id="xs-controllers-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' }>
                                            <li class="link">
                                                <a href="controllers/MovementsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MovementsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' : 'data-bs-target="#xs-injectables-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' :
                                        'id="xs-injectables-links-module-AppModule-3612953faf2d27c9bdc3b22fc374565e4f8ef29850175374fc24d585428f6e10e618809b058ac23509d5e8963b28fd47b8ba869fc059435f3d4e534719664d98"' }>
                                        <li class="link">
                                            <a href="injectables/ValidateMovementsUseCase.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidateMovementsUseCase</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Balance.html" data-type="entity-link" >Balance</a>
                            </li>
                            <li class="link">
                                <a href="classes/BalanceDto.html" data-type="entity-link" >BalanceDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DuplicatedReason.html" data-type="entity-link" >DuplicatedReason</a>
                            </li>
                            <li class="link">
                                <a href="classes/MismatchReason.html" data-type="entity-link" >MismatchReason</a>
                            </li>
                            <li class="link">
                                <a href="classes/Movement.html" data-type="entity-link" >Movement</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovementDto.html" data-type="entity-link" >MovementDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MovementValidationService.html" data-type="entity-link" >MovementValidationService</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reason.html" data-type="entity-link" >Reason</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidateMovementsDto.html" data-type="entity-link" >ValidateMovementsDto</a>
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
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
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
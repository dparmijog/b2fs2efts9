import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { Identimon, IdentiWorldService } from '../../service/identiworld.service';
import { IdentiStatsComponent } from '../../identimons/identi.stats.component';

/**
 * Main component for exploring and discovering Identimon creatures in the IdentiWorld
 * Provides functionality to view, select, and hire Identimons
 * @class IdentiWorld
 * @implements {OnInit}
 */
@Component({
    selector: 'app-identiworld',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        CardModule,
        IdentiArtComponent, IdentiStatsComponent
    ],
    templateUrl: './identiworld.html',
    providers: [IdentiWorldService]
})
export class IdentiWorld implements OnInit {
    /** Signal containing the list of available Identimons */
    identimons = signal<Identimon[]>([]);

    /** Currently selected Identimon for detailed view */
    selectedIdentimon: Identimon | undefined;

    /** Flag to control the display of the detail dialog */
    displayDialog = false;

    /**
     * Constructor that injects the IdentiWorld service
     * @param identiWorldService - Service for managing Identimon data
     */
    constructor(
        private identiWorldService: IdentiWorldService,
    ) {}

    /**
     * Angular lifecycle hook that runs after component initialization
     * Loads initial demo data for the IdentiWorld
     */
    ngOnInit() {
        this.loadDemoData();
    }

    /**
     * Loads a random selection of Identimon creatures for exploration
     * Generates between 12-24 random Identimons
     */
    loadDemoData() {
        this.identiWorldService.getFauna(Math.floor(Math.random() * 12) + 12).then((data) => {
            this.identimons.set(data);
        });
    }

    /**
     * Selects an Identimon and opens the detail dialog
     * @param identimon - The Identimon to select and view in detail
     */
    selectIdentimon(identimon: Identimon) {
        this.displayDialog = true
        this.selectedIdentimon = identimon;
    }

    /**
     * Closes the detail dialog and clears the selected Identimon
     */
    closeDialog() {
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }

    /**
     * Generates new Identimons for exploration and closes the detail dialog
     */
    exploreMore() {
        this.loadDemoData();
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }

    /**
     * Hires an Identimon and adds it to the user's collection
     * Updates the user's session data in localStorage
     * @param identimon - The Identimon to hire and add to the user's team
     */
    hireIdentimon(identimon: Identimon) {
        const session = JSON.parse(localStorage.getItem('session')!);
        if (session && session.user) {
            const identimons = session.user.identimons || [];
            localStorage.setItem('session', JSON.stringify({
                ...session,
                user: {
                    ...session.user,
                    identimons: [...identimons, identimon]
                }
            }))
            this.exploreMore()
        }
    }
}

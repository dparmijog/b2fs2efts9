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
    identimons = signal<Identimon[]>([]);

    selectedIdentimon: Identimon | undefined;

    displayDialog = false;

    constructor(
        private identiWorldService: IdentiWorldService,
    ) {}

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.identiWorldService.getFauna(Math.floor(Math.random() * 12) + 12).then((data) => {
            this.identimons.set(data);
        });
    }

    selectIdentimon(identimon: Identimon) {
        this.displayDialog = true
        this.selectedIdentimon = identimon;
    }

    closeDialog() {
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }

    exploreMore() {
        this.loadDemoData();
        this.displayDialog = false;
        this.selectedIdentimon = undefined;
    }

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

import { Component, Input, OnInit } from '@angular/core';
import { minidenticon } from 'minidenticons'
import { ProgressBarModule } from 'primeng/progressbar';
import { createIdentimon, Identimon, Stats } from '../service/identiworld.service';

const max = 180
@Component({
    selector: 'app-identi-stats',
    standalone: true,
    imports: [ProgressBarModule],
    templateUrl: './identi.stats.component.html',
    styleUrl: './identi.art.component.scss'
})
export class IdentiStatsComponent implements OnInit {
    @Input() id = '';
    identimon: Identimon = createIdentimon(this.id);
    life: number = 0;
    mana: number = 0;
    defense: number = 0;
    attack: number = 0;
    speed: number = 0;
    luck: number = 0;
    magic: number = 0;
    power: number = 0;
    


    // constructor() {
    //     this.identimon = createIdentimon(this.id);
    //     console.log("id",this.id, "mon", this.identimon)
    // }

    ngOnInit(): void {
        this.identimon = createIdentimon(this.id);
        this.life = Number(((this.identimon.stats.life / max) * 100).toFixed(2))    //console.log("id",this.id, "mon", this.identimon)
        this.mana = Number(((this.identimon.stats.mana / max) * 100).toFixed(2));
        this.defense = Number(((this.identimon.stats.defense / max) * 100).toFixed(2));
        this.attack = Number(((this.identimon.stats.attack / max) * 100).toFixed(2));
        this.speed = Number(((this.identimon.stats.speed / max) * 100).toFixed(2));
        this.luck = Number(((this.identimon.stats.luck / max) * 100).toFixed(2));
        this.magic = Number(((this.identimon.stats.magic / max) * 100).toFixed(2));
        this.power = Number(((this.identimon.stats.power / max) * 100).toFixed(2));
    }




}

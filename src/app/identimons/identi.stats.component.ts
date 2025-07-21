import { Component, Input, OnInit } from '@angular/core';
import { minidenticon } from 'minidenticons'
import { ProgressBarModule } from 'primeng/progressbar';
import { createIdentimon, Identimon, Stats } from '../service/identiworld.service';

/** Maximum possible stat value used for percentage calculations */
const max = 180

/**
 * Component that displays detailed statistics for an Identimon creature
 * Renders progress bars showing each stat as a percentage of the maximum value
 * @class IdentiStatsComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-identi-stats',
    standalone: true,
    imports: [ProgressBarModule],
    templateUrl: './identi.stats.component.html',
    styleUrl: './identi.art.component.scss'
})
export class IdentiStatsComponent implements OnInit {
    /** Unique identifier used to generate the Identimon and its stats */
    @Input() id = '';
    
    /** The Identimon object created from the provided ID */
    identimon: Identimon = createIdentimon(this.id);
    
    /** Life stat as percentage of maximum (0-100) */
    life: number = 0;
    
    /** Mana stat as percentage of maximum (0-100) */
    mana: number = 0;
    
    /** Defense stat as percentage of maximum (0-100) */
    defense: number = 0;
    
    /** Attack stat as percentage of maximum (0-100) */
    attack: number = 0;
    
    /** Speed stat as percentage of maximum (0-100) */
    speed: number = 0;
    
    /** Luck stat as percentage of maximum (0-100) */
    luck: number = 0;
    
    /** Magic stat as percentage of maximum (0-100) */
    magic: number = 0;
    
    /** Power stat as percentage of maximum (0-100) */
    power: number = 0;

    /**
     * Angular lifecycle hook that runs after component initialization
     * Creates the Identimon from the provided ID and calculates percentage values for all stats
     */
    ngOnInit(): void {
        this.identimon = createIdentimon(this.id);
        this.life = Number(((this.identimon.stats.life / max) * 100).toFixed(2))
        this.mana = Number(((this.identimon.stats.mana / max) * 100).toFixed(2));
        this.defense = Number(((this.identimon.stats.defense / max) * 100).toFixed(2));
        this.attack = Number(((this.identimon.stats.attack / max) * 100).toFixed(2));
        this.speed = Number(((this.identimon.stats.speed / max) * 100).toFixed(2));
        this.luck = Number(((this.identimon.stats.luck / max) * 100).toFixed(2));
        this.magic = Number(((this.identimon.stats.magic / max) * 100).toFixed(2));
        this.power = Number(((this.identimon.stats.power / max) * 100).toFixed(2));
    }
}

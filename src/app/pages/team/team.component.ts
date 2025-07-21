import { Component, OnInit, signal } from '@angular/core';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { Card, CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Identimon } from '../../service/identiworld.service';
import { CommonModule } from '@angular/common';

/**
 * Component that displays the user's collection of hired Identimon creatures
 * Shows all Identimons that the user has added to their team from exploration
 * @class TeamComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-team',
  standalone: true,
  imports: [IdentiArtComponent, CardModule, TagModule, CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  /** Signal containing the user's collection of Identimons */
  identimons = signal<Identimon[]>([]);
  
  /** Current user session data from localStorage */
  session: any;

  /**
   * Constructor for the Team component
   */
  constructor() { }

  /**
   * Angular lifecycle hook that runs after component initialization
   * Loads the user's Identimon collection from the session data
   */
  ngOnInit(): void {
    this.session = JSON.parse(localStorage.getItem('session') || '{}');
    console.log('Session:', this.session);
    this.identimons.set(this.session.user?.identimons || []);
  }
}

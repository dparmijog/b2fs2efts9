import { Component, OnInit, signal } from '@angular/core';
import { IdentiArtComponent } from '../../identimons/identi.art.component';
import { Card, CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Identimon } from '../../service/identiworld.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [IdentiArtComponent, CardModule, TagModule, CommonModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  identimons = signal<Identimon[]>([]);
  session: any;

  constructor() { }

  ngOnInit(): void {
    this.session = JSON.parse(localStorage.getItem('session') || '{}');
    console.log('Session:', this.session);
    this.identimons.set(this.session.user?.identimons || []);
  }

}

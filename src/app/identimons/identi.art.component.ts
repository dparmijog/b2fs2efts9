import { Component, Input } from '@angular/core';
import { minidenticon } from 'minidenticons'
import { ulid } from 'ulid';

@Component({
  selector: 'app-identi-art',
  standalone: true,
  template: '<img [src]="art()" alt=[id] />',
  styleUrl: './identi.art.component.scss'
})
export class IdentiArtComponent {
  @Input() id = '';

  constructor() {
  }
  art = () => 'data:image/svg+xml,' + encodeURIComponent(minidenticon(this.id))
}

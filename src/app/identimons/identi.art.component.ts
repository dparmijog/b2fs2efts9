import { Component, Input } from '@angular/core';
import { minidenticon } from 'minidenticons'
import { ulid } from 'ulid';

/**
 * Component responsible for generating and displaying visual art for Identimon creatures
 * Creates unique SVG artwork based on the provided ID using minidenticons
 * @class IdentiArtComponent
 */
@Component({
  selector: 'app-identi-art',
  standalone: true,
  template: '<img [src]="art()" alt=[id] />',
  styleUrl: './identi.art.component.scss'
})
export class IdentiArtComponent {
  /** Unique identifier used to generate the Identimon's visual representation */
  @Input() id = '';

  /**
   * Constructor for the IdentiArt component
   */
  constructor() {
  }

  /**
   * Generates a data URI containing SVG artwork for the Identimon
   * Uses the minidenticon library to create deterministic visual art from the ID
   * @returns Data URI string containing the SVG image
   */
  art = () => 'data:image/svg+xml,' + encodeURIComponent(minidenticon(this.id))
}

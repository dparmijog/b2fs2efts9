import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  displayName: string = '';
  email: string = '';
  favouriteNumber = 0;

  constructor() { }

  ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('session')!)
    this.displayName = session?.user?.displayName || '';
    this.email = session?.user?.email || '';
    this.favouriteNumber = Number(session?.user?.favouriteNumber) || 0;
  }

  // Additional methods and properties for the profile component can be added here

}

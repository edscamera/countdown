import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(public databaseService: DatabaseService) {}
}
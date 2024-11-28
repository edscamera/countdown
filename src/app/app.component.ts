import { Component } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private database: DatabaseService) {}

  public test(): void {
    this.database.getEvents().then(events => {
      console.log(events);
    }).catch(err => console.error(err));
  }

  public test2(): void {
    this.database.createEvent();
  }
}

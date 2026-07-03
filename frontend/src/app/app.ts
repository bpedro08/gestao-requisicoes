import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <main class="container">
      <router-outlet />
    </main>
  `,
  styles: [`
    .container {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
  `]
})
export class App {}
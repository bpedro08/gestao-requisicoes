import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
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
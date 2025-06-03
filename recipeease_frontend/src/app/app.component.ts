import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container">
      <main>
        <router-outlet></router-outlet>
      </main>
      
      <nav class="bottom-nav">
        <button class="nav-item" (click)="navigate('home')">
          <i class="material-icons">home</i>
          <span>Home</span>
        </button>
        <button class="nav-item" (click)="navigate('favorites')">
          <i class="material-icons">favorite</i>
          <span>Favorites</span>
        </button>
        <button class="nav-item" (click)="navigate('add')">
          <i class="material-icons">add</i>
          <span>Add Recipe</span>
        </button>
        <button class="nav-item" (click)="toggleTheme()">
          <i class="material-icons">{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</i>
        </button>
      </nav>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isDarkTheme = false;

  constructor(private themeService: ThemeService) {
    this.themeService.isDarkTheme$.subscribe(
      isDark => this.isDarkTheme = isDark
    );
  }

  navigate(route: string): void {
    // TODO: Implement navigation
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}

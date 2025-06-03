import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="app-container" [class.dark-theme]="isDarkTheme">
      <main>
        <router-outlet></router-outlet>
      </main>
      
      <nav class="bottom-nav">
        <button class="nav-item" (click)="handleNavigation('home')">
          <i class="material-icons">home</i>
          <span>Home</span>
        </button>
        <button class="nav-item" (click)="handleNavigation('favorites')">
          <i class="material-icons">favorite</i>
          <span>Favorites</span>
        </button>
        <button class="nav-item" (click)="handleNavigation('add')">
          <i class="material-icons">add</i>
          <span>Add Recipe</span>
        </button>
        <button class="nav-item" (click)="onThemeToggle()">
          <i class="material-icons">{{ isDarkTheme ? 'light_mode' : 'dark_mode' }}</i>
        </button>
      </nav>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkTheme = false;
  private themeSubscription?: Subscription;

  /* eslint-disable no-unused-vars */
  constructor(
    private readonly themeService: ThemeService,
    private readonly router: Router
  ) {}
  /* eslint-enable no-unused-vars */

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(
      isDark => this.isDarkTheme = isDark
    );
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }

  handleNavigation(route: string): void {
    void this.router.navigate([route]);
  }

  onThemeToggle(): void {
    this.themeService.toggleTheme();
  }
}

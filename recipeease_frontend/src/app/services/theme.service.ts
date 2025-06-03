import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private readonly platformId: Object) {
    if (this.isBrowser) {
      this.initializeTheme();
    }
  }

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private initializeTheme(): void {
    if (!this.isBrowser) return;

    try {
      const mediaQuery = '(prefers-color-scheme: dark)';
      const prefersDark = globalThis?.window?.matchMedia?.(mediaQuery)?.matches ?? false;
      if (prefersDark) {
        this.setDarkTheme(true);
      }
    } catch (error) {
      console.warn('Failed to detect system theme preference:', error);
    }
  }

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    if (this.isBrowser) {
      try {
        const body = globalThis?.document?.body;
        if (body) {
          if (isDark) {
            body.classList.add('dark-theme');
          } else {
            body.classList.remove('dark-theme');
          }
        }
      } catch (error) {
        console.warn('Failed to update theme class:', error);
      }
    }
  }

  toggleTheme(): void {
    const currentValue = this.isDarkTheme.value;
    this.setDarkTheme(!currentValue);
  }
}

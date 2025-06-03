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
    if (isPlatformBrowser(this.platformId)) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      const prefersDark = typeof window !== 'undefined' &&
        window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
      if (prefersDark) {
        this.setDarkTheme(true);
      }
    }
  }

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      const body = typeof document !== 'undefined' ? document.body : null;
      if (body) {
        if (isDark) {
          body.classList.add('dark-theme');
        } else {
          body.classList.remove('dark-theme');
        }
      }
    }
  }

  toggleTheme(): void {
    const currentValue = this.isDarkTheme.value;
    this.setDarkTheme(!currentValue);
  }
}

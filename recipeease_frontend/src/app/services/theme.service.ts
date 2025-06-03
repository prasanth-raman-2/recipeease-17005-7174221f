import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkSystemPreference();
    }
  }

  private checkSystemPreference(): void {
    const prefersDark = typeof window !== 'undefined' && 
      window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    if (prefersDark) {
      this.setDarkTheme(true);
    }
  }

  setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.next(isDark);
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }

  toggleTheme(): void {
    const currentValue = this.isDarkTheme.value;
    this.setDarkTheme(!currentValue);
  }
}

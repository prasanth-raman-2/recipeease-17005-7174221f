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
      // Check user's preferred color scheme
      if (window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches) {
        this.setDarkTheme(true);
      }
    }
  }

  setDarkTheme(isDark: boolean) {
    this.isDarkTheme.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }

  toggleTheme() {
    this.setDarkTheme(!this.isDarkTheme.value);
  }
}

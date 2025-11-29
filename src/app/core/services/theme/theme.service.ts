import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeConfig, lightTheme, darkTheme } from './theme.config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeConfig>(lightTheme);
  public currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    this.loadInitialTheme();
  }

  setTheme(themeName: 'light' | 'dark'): void {
    const theme = themeName === 'dark' ? darkTheme : lightTheme;
    this.applyTheme(theme);
    this.currentTheme.next(theme);
    localStorage.setItem('theme', themeName);
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme.value.name === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private loadInitialTheme(): void {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (systemPrefersDark) {
      this.setTheme('dark');
    }
  }

  private applyTheme(theme: ThemeConfig): void {
    Object.keys(theme.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        theme.properties[property]
      );
    });
    
    // Update class for CSS selectors
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme.name}-theme`);
  }
}
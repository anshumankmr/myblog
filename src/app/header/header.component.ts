import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = "Anshuman's Blog";
  isDark = false;

  constructor() {}

  ngOnInit(): void {
    const stored = localStorage.getItem('theme');
    this.isDark = stored ? stored === 'dark' : false;
    document.body.classList.toggle('light-mode', !this.isDark);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    document.body.classList.toggle('light-mode', !this.isDark);
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}

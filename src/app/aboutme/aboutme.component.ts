import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutmeComponent implements OnInit {
  myNameIs = '👋 Hi, my name is <span>Anshuman Kumar</span>';
  aboutMe = `I'm a <strong>Consultant</strong> at <a href="https://www.deloitte.com/global/en.html" target="_blank" rel="noopener noreferrer" alt="Deloitte">Deloitte</a>, specializing in developing solutions using AI. My skill set includes NodeJS, Angular, Python, React, and Prompt Engineering, enabling me to build solutions using AI.`;

  constructor(private router: Router) {
    if (this.router.url === '/aboutme') {
      this.aboutMe +=
        ` In addition, I have a passion for creating <strong>Jamstack</strong> architectures, utilizing Angular and Scully to develop engaging and high-performance websites.` +
        ` I'm also an active participant in the tech community, sharing insights and trends through my blog at <a href="https://www.anshumankumar.dev/">https://www.anshumankumar.dev/</a> 😊.` +
        ` My commitment to crafting lightweight and optimized websites has been recognized with a feature on the <a href="https://web.archive.org/web/20230613205935/https://1mb.club/" target="_blank" rel="noopener noreferrer" alt="1mb club website">1mb Club</a> website.` +
        `<br/><br/>Outside of my professional pursuits, I engage in various interests that provide a balanced lifestyle. An aficionado of movies 🎬, I appreciate nuances not evident on the first watch and share my insights through blogging.` +
        ` Audiobooks have also captured my attention recently 📚, and you can find my reviews on <a href="https://www.goodreads.com/user/show/53014278-anshuman-kumar" target="_blank" rel="noopener noreferrer" alt="Anshuman Kumar's Book Reviews on Goodreads">Goodreads</a>.` +
        ` Additionally, I'm an active advocate for animal welfare 🐾, contributing to the betterment of society through care for stray animals.`;
    }
  }

  ngOnInit(): void {}
}

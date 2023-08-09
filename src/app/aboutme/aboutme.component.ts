import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutmeComponent implements OnInit {
  myNameIs = 'Hi, my name is <span>Anshuman Kumar</span>';aboutMe = `I'm a <strong>Software Developer</strong> at <a href="https://quantiphi.com" target="_blank" rel="noopener noreferrer" alt="Quantiphi - AI and Data Science Company">Quantiphi</a>, with strong proficiency in NodeJS, Angular, Python, React, and CSS. I have a passion for Jamstack architecture and I've utilized Angular and Scully to create engaging and high-performance websites.

  In addition to my work as a Software Developer, I keep active by cycling and regularly participating in marathons, including the Vedanta Delhi Half Marathon in 2022. My other hobbies include amateur photography, and I love sharing my work on <a href="https://unsplash.com/@anshumankmr97" target="_blank" rel="noopener noreferrer" alt="my photography work on Unsplash">Unsplash</a>.
  
  My passion and expertise in creating lightweight and optimized websites have earned me a feature on the <a href="https://web.archive.org/web/20230613205935/https://1mb.club/" target="_blank" rel="noopener noreferrer" alt="1mb club website">1mb Club</a> website.`;
    constructor() {}

  ngOnInit(): void {}
}

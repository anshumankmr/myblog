import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutmeComponent implements OnInit {
  myNameIs = 'Hi, my name is <span>Anshuman Kumar</span>';
  aboutMe = `Currently, I'm working for <a href="https://quantiphi.com"> Quantiphi</a> as
  Software Developer. I <3 Jam Stack. This site was built with Angular and Scully.I am proficient with NodeJS, Angular, 
  Python, React, CSS.In my spare time, I love cycling and participating in marathons. For example, in 2022, I participated in the Vedanta Delhi Half Marathon. I am also an amateur photography enthusiast.You can view some of my clicks here <a href="https://unsplash.com/@anshumankmr97" class="anchor-tag">here</a>. <br/>Proud to be featured on <a href="https://web.archive.org/web/20230613205935/https://1mb.club/" class="anchor-tag">1mb Club</a>.`;
  constructor() {}

  ngOnInit(): void {}
}

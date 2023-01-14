import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css'],
})
export class AboutmeComponent implements OnInit {
  imageCaption =
    'A Picture I took Near Baba Ka Mandir near Natu La Pass' +
    '. You can view the rest of my Pictures ';
  constructor() {}

  ngOnInit(): void {}
}

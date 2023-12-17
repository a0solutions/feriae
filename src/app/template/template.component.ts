import { Component, HostListener, OnInit } from '@angular/core';
declare var scrollAll: any;
import 'src/assets/js/main.js';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  ngOnInit(): void {
    new scrollAll();
  }
}

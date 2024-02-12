import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Watch this';

  ngAfterViewInit(): void {
    const preloader = document.getElementById('preloader');

    preloader?.classList.add('preloader--hidden');
  }
}

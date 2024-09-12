import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

type NavActionLink = {
  title: string;
  path: string;
  iconClass: string;
};

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  navActionLinks: Array<NavActionLink> = [
    {
      path: '/',
      title: 'Home',
      iconClass: 'home'
    },
    {
      path: 'cameraman',
      title: 'Cameraman',
      iconClass: 'video_camera_back'
    },
    {
      path: 'photographer',
      title: 'Photographer',
      iconClass: 'enhance_photo_translate'
    },
    {
      path: 'band',
      title: 'Band',
      iconClass: 'face'
    }
  ]
}

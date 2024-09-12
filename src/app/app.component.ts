import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { slideInAnimation } from './_animations/random-animation';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, RouterModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'marry-view';

  getRandomAnimation(): string {
    return 'slideInAnimation';
  }
}

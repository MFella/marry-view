import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxEditorModule } from 'ngx-editor';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(NgxEditorModule),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig)
    ),
  ],
};

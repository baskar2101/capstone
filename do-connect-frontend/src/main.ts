// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config'; // Make sure this points to the correct export
import { environment } from './app/environments/environment'; // Ensure this path is correct

if (environment.production) {
  enableProdMode();
}

// Bootstrap the application
const bootstrap = () => bootstrapApplication(AppComponent, appConfig);

bootstrap();

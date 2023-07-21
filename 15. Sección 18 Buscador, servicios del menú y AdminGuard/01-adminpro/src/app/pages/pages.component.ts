import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Para que typescript no marque error ya que sabemos que la
// función existe de manera global hacemos lo siguiente:
declare function customInitFunctions(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor( private settingsService: SettingsService ) { }

  ngOnInit(): void {
    // Llamamos la función global que inicializa todo
    customInitFunctions();
  }

}

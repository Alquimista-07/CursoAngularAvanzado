import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  public linkTheme = document.querySelector('#theme');
  
  constructor() { }

  ngOnInit(): void {
  }

  changeTheme( theme: string ){
    
    const urlTheme = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', urlTheme);

    // Guardamos la preferencia del tema en el localstorage
    localStorage.setItem('theme', urlTheme);

  }

}

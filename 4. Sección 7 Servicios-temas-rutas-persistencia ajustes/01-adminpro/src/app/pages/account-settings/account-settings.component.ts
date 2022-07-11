import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {
  
  public linkTheme = document.querySelector('#theme');
  public links: NodeListOf<Element> | undefined;
  
  constructor() { }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme: string ){
    
    const urlTheme = `./assets/css/colors/${theme}.css`;

    this.linkTheme?.setAttribute('href', urlTheme);

    // Guardamos la preferencia del tema en el localstorage
    localStorage.setItem('theme', urlTheme);

    // Marcamos el check en la caja del tema
    this.checkCurrentTheme();

  }

  // Creamos un metodo para el check
  checkCurrentTheme() {

    // Barremos y borramos la clase working condicionalmente
    this.links!.forEach( elemento => {

      elemento.classList.remove('working');
      const btnTheme = elemento.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      
      if( btnThemeUrl === currentTheme ){
        elemento.classList.add( 'working' );
      }

    });

  }

}

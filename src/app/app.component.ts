import { Component } from '@angular/core';

//un component utilise le décorateur @Component 
@Component({
  selector: 'app-root',//le nom de la balise que vous voulez utilisez pour afficher le web component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'catalogue';
}

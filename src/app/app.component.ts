import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language/language.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo';

  constructor(
    public language: LanguageService,
    public translate: TranslateService,
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang(this.language.getLanguage());
  }
}

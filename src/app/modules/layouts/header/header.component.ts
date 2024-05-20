import { Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { ELangMode, ELangTitle } from 'src/app/enums/language.enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  subMode = ELangMode;
  subList = ELangTitle;
  currentLang = this.languageService.isLang();
  getLang = this.cookieService.get('language');

  constructor(
    public layoutService: LayoutService,
    private cookieService: CookieService,
    private languageService: LanguageService,) { }


  changeLanguage(language: ELangMode, label: ELangTitle) {
    this.languageService.setLang(language, label);
    this.currentLang = language;
  }

  handleChangeSub(value: boolean) {
    if (value) {
      this.getLang = ELangMode.VI;
      this.changeLanguage(ELangMode.VI, ELangTitle.VI);
    } else {
      this.getLang = ELangMode.EN;
      this.changeLanguage(ELangMode.EN, ELangTitle.EN);
    }
  }

  handleShowAndHideSidebarLeft() {
    if (window.innerWidth <= 1170) {
      this.layoutService.showSidebarLeft = !this.layoutService.showSidebarLeft;
      this.layoutService.dropDownTheme = false;
    }
  }

  handleShowSidebarRight() {
    if (!this.layoutService.dropDownTheme) {
      this.layoutService.dropDownTheme = !this.layoutService.dropDownTheme;
      this.layoutService.showSidebarLeft = false;
    } else {
      this.layoutService.dropDownTheme = false;
    }
  }
}

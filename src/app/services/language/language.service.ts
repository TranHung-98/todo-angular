import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ELangMode, ELangTitle } from "src/app/enums/language.enum";
import { SweetAlertService } from "src/app/shared/sweetalert/service/sweetalert.service";


@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private lang: ELangMode = ELangMode.VI;
  private language = localStorage.getItem('language');

  constructor(public translate: TranslateService, private sweetalertService: SweetAlertService) { }

  getLanguage() {
    if (this.language === ELangMode.VI || this.language === ELangMode.EN) {
      return this.language;
    } else {
      return ELangMode.VI;
    }
  }

  isLang() {
    return this.lang;
  }

  setLang(lang: ELangMode, message: ELangTitle) {
    if (this.language === lang) {
      return;
    } else {
      this.language = lang;
      this.sweetalertService.fireSuccessAlert('', message, 2000, true, false, "bottom-end");
      this.translate.setDefaultLang(lang);
      localStorage.setItem('language', lang);
    }
  }
}

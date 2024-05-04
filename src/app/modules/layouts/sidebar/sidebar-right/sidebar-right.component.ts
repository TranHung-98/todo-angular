import { Component } from '@angular/core';
import { LayoutService } from '../../service/layout.service';
import { ETypeThem } from 'src/app/shared/components/theme-toggle/enum/type.enum';
import { ThemeService } from 'src/app/shared/components/theme-toggle/service/theme.service';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent {
  fillter: number = 1;
  constructor(private themeService: ThemeService, private layoutService: LayoutService) { }

  skillItems = [
    { name: ETypeThem.ThemeIndigo, colorIndex: 1 },
    { name: ETypeThem.ThemePink, colorIndex: 2 },
    { name: ETypeThem.ThemeGreen, colorIndex: 3 },
    { name: ETypeThem.ThemePurple, colorIndex: 4 },
    { name: ETypeThem.ThemeOrange, colorIndex: 5 },
    { name: ETypeThem.ThemeBrown, colorIndex: 6 },
    { name: ETypeThem.ThemeCyan, colorIndex: 11 },
    { name: ETypeThem.ThemeGrey, colorIndex: 7 },
    { name: ETypeThem.ThemeBlueGray, colorIndex: 8 },
    { name: ETypeThem.ThemeDeepOrange, colorIndex: 9 },
    { name: ETypeThem.ThemeLightGreen, colorIndex: 10 },
    { name: ETypeThem.ThemeLightBule, colorIndex: 12 },
    { name: ETypeThem.ThemeDeepPurple, colorIndex: 13 },
    { name: ETypeThem.ThemeRed, colorIndex: 14 },
    { name: ETypeThem.ThemeDeepPink, colorIndex: 15 },
    { name: ETypeThem.ThemeLime, colorIndex: 16 },
    { name: ETypeThem.ThemeTeal, colorIndex: 17 },
  ];

  handleHideSidebarRight() {
    this.layoutService.dropDownTheme = false;
  }

  handleChangeTheme(theme: ETypeThem, filter: number) {
    this.themeService.setMode(theme);
    this.fillter = filter;
  }
}

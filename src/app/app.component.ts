import { Component } from '@angular/core';
import { MenuItem } from './core/models/menu-item.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes - My First Project In Angular';
  menuItems: MenuItem[] = [
    {
      icon: 'dashboard',
      routerLink: '/dashboard',
      toolTipText: 'Dashboard',
    },
    {
      icon: 'self_improvement',
      routerLink: '/heroes',
      toolTipText: 'Heroes',
    },
  ];
}


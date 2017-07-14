import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MdTabsModule } from '@angular/material';
import { LoginComponent } from 'app/auth/login.component'
import { RegisterComponent } from 'app/auth/register.component'

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    selectedTab: number = 0

    toggleTab() {
        this.selectedTab = Math.abs(1 - this.selectedTab)
    }

    onSelectChange = ($event: any): void => {
        this.selectedTab = $event.index
    }
}
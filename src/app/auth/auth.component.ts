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
    selectedTab = 0

    toggleTab() {
        console.log("selected: " + this.selectedTab + " new: " + Math.abs(1 - this.selectedTab))
        this.selectedTab = Math.abs(1 - this.selectedTab)        
    }
}
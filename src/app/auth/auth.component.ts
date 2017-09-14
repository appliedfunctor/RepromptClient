import { Component, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import { MdTabsModule } from '@angular/material'
import { LoginComponent } from 'app/auth/login.component'
import { RegisterComponent } from 'app/auth/register.component'
import { UserModel } from "app/_models/user.model"

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    selectedTab: number = 0
    loading: boolean = false

    toggleTab() {
        this.selectedTab = Math.abs(1 - this.selectedTab)
    }

    onSelectChange(event: any): void {
        this.selectedTab = event.index
    }

    setLoading(value: boolean) {
        this.loading = value
        console.log('loading received: ' + value)
    }
}
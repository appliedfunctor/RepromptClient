import { Component } from '@angular/core'
import { MdTabsModule } from '@angular/material';

@Component({
    selector: 'auth-tabs',
    template: `
    <md-tab-group>
        <md-tab label="Login"></md-tab>
        <md-tab label="Register"></md-tab>
    </md-tab-group>`
})
export class AuthMenuTabs {
    
}
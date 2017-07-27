import { Component } from "@angular/core";

@Component({
  selector: 'unlink-confirm-dialog',
  templateUrl: 'unlink-confirm.dialog.html',
})
export class UnlinkConfirmDialog {
    public item: string
    public container: string
    public action: string
}
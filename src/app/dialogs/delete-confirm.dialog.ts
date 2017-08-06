import { Component } from "@angular/core";

@Component({
  selector: 'delete-confirm-dialog',
  templateUrl: 'delete-confirm.dialog.html',
})
export class DeleteConfirmDialog {
  public item: string = 'container'
}
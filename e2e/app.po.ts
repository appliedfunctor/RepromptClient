import { browser, by, element } from 'protractor';

export class ClientPage {
  navigateTo(uri) {
    return browser.get(uri);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getCurrentUrl() {
    return browser.driver.getCurrentUrl();
  }
}

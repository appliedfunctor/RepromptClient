import { ClientPage } from './app.po'
import { browser, by, element } from 'protractor'
import { protractor } from "protractor/built/ptor";

describe('client App', () => {
  let page: ClientPage
  let ec = protractor.ExpectedConditions

  beforeEach(() => {
    page = new ClientPage()
  })

  it('should redirect to auth if not authenticated', () => {
    page.navigateTo('/')
    expect(page.getCurrentUrl()).toMatch('/auth')
  })

  //EDUCATOR1
  it('should successfully authenticate as the first educator on valid credentials', () => {
    page.navigateTo('/auth')
    element(by.name('email')).sendKeys('t@e')
    element(by.name('passsword')).sendKeys('test')
    expect(page.getCurrentUrl()).toMatch('/')
  })

  //EDUCATOR2
  it('should successfully authenticate as the second educator on valid credentials', () => {
    page.navigateTo('/auth')
    element(by.name('email')).sendKeys('t@e2')
    element(by.name('passsword')).sendKeys('test')
    expect(page.getCurrentUrl()).toMatch('/')
  })

  //LEARNER
  it('should successfully authenticate as a learner on valid credentials', () => {
    page.navigateTo('/auth')
    element(by.name('email')).sendKeys('t@s')
    element(by.name('passsword')).sendKeys('test')
    expect(page.getCurrentUrl()).toMatch('/')
  })

})

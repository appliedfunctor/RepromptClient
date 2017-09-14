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

  //EDUCATOR
  it('should successfully authenticate as an educator on valid credentials', () => {
    page.navigateTo('/auth')
    element(by.name('email')).sendKeys('t@e')
    element(by.name('passsword')).sendKeys('test')
    expect(page.getCurrentUrl()).toMatch('/')
  })

  // it('should be able to access the cohorts page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@e')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/cohorts')
  //   expect(page.getCurrentUrl()).toMatch('/cohorts')
  // })

  // it('should be able to access the content page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@e')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/content')
  //   expect(page.getCurrentUrl()).toMatch('/content')
  // })

  // it('should be able to access the publish page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/publish')
  //   expect(page.getCurrentUrl()).toMatch('/publish')
  // })

  // it('should not be able to access the manage page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@e')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/manage')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should not be able to access the progress page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@e')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/progress')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should not be able to access the study page as an educator', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@e')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/study')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })
  
  // // LEARNER

  // it('should successfully authenticate as a learner on valid credentials', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should not be able to access the cohorts page as a learner', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/cohorts')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should not be able to access the content page as a learner', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/content')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should not be able to access the publish page as a learner', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/publish')
  //   expect(page.getCurrentUrl()).toMatch('/')
  // })

  // it('should be able to access the manage page as a learner', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/manage')
  //   expect(page.getCurrentUrl()).toMatch('/manage')
  // })

  it('should be able to access the progress page as a learner', () => {
    page.navigateTo('/auth')
    let submit = element(by.buttonText('Sign in'))
    element(by.name('email')).sendKeys('t@s')
    element(by.name('passsword')).sendKeys('test')
    browser.wait(ec.elementToBeClickable(submit), 5000)
    submit.click()    
    browser.wait(ec.urlContains('/'))   
    page.navigateTo('/progress')
    expect(page.getCurrentUrl()).toMatch('/progress')
  })

  // it('should be able to access the study page as a learner', () => {
  //   page.navigateTo('/auth')
  //   element(by.name('email')).sendKeys('t@s')
  //   element(by.name('passsword')).sendKeys('test')
  //   expect(page.getCurrentUrl()).toMatch('/')
  //   page.navigateTo('/study')
  //   expect(page.getCurrentUrl()).toMatch('/study')
  // })


})

import { ClientPage } from './app.po'

describe('client App', () => {
  let page: ClientPage

  beforeEach(() => {
    page = new ClientPage()
  })

  it('should redirect to auth if not authenticated', () => {
    page.navigateTo('/');
    expect(page.getCurrentUrl()).toMatch('/auth')
  })
})

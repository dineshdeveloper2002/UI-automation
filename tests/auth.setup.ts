import { test as setup } from '@playwright/test'
import { LoginPage } from '../pages/login'

setup('Login setup flow', async ({ page }) => {
  const login = new LoginPage(page)
  await login.navigateToUrl(process.env.BASE_URL + '/login')
  await login.authenticateUser({ username: process.env.USEREMAIL, password: process.env.PASSWORD })
})
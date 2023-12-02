import { RootRoute, Route, Router } from '@tanstack/react-router'
import LoginPage from '../views/Login'

const rootRoute = new RootRoute()

const indexRoute = new Route({
  getParentRoute: () => {
    return rootRoute
  },
  path: '/',
  component: LoginPage
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

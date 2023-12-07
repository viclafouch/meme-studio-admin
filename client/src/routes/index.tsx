/* eslint-disable react-hooks/rules-of-hooks */
import {
  Navigate,
  Outlet,
  RootRoute,
  Route,
  Router
} from '@tanstack/react-router'
import AuthLayout from '../components/AuthLayout'
import { queryClient } from '../config/query-client'
import { useAuth } from '../stores/Auth'
import HomePage from '../views/Home'
import LoginPage from '../views/Login'
import MemesPage from '../views/Memes'

const rootRoute = new RootRoute()

const loginRoute = new Route({
  getParentRoute: () => {
    return rootRoute
  },
  path: '/login',
  component: LoginPage
})

const authRoute = new Route({
  getParentRoute: () => {
    return rootRoute
  },
  component: () => {
    const { token } = useAuth()

    if (!token) {
      return <Navigate to="/login" />
    }

    return (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    )
  },
  id: 'layout'
})

const indexRoute = new Route({
  getParentRoute: () => {
    return authRoute
  },
  path: '/',
  component: HomePage
})

const memesRoute = new Route({
  getParentRoute: () => {
    return authRoute
  },
  path: 'memes',
  component: MemesPage
})

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([indexRoute, memesRoute]),
  loginRoute
])

export const router = new Router({
  routeTree,
  context: {
    token: '',
    queryClient
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

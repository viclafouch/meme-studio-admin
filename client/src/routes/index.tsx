/* eslint-disable react-hooks/rules-of-hooks */
import { QueryClient } from '@tanstack/react-query'
import {
  Navigate,
  Outlet,
  rootRouteWithContext,
  Route,
  Router
} from '@tanstack/react-router'
import AuthLayout from '../components/AuthLayout'
import { queries } from '../config/queries'
import { queryClient } from '../config/query-client'
import { useAuth } from '../stores/Auth'
import EditMemePage from '../views/EditMeme'
import HomePage from '../views/Home'
import LoginPage from '../views/Login'
import MemesPage from '../views/Memes'
import NewMemePage from '../views/NewMeme'

const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient
}>()()

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
  path: '/memes',
  component: MemesPage
})

const newMemeRoute = new Route({
  getParentRoute: () => {
    return authRoute
  },
  path: 'memes/new',
  component: NewMemePage
})

export const editMemeRoute = new Route({
  getParentRoute: () => {
    return authRoute
  },
  path: 'memes/$memeId',
  loader: ({ context, params: { memeId } }) => {
    return context.queryClient.ensureQueryData(queries.meme.getOne(memeId))
  },
  component: EditMemePage
})

const routeTree = rootRoute.addChildren([
  authRoute.addChildren([indexRoute, memesRoute, editMemeRoute, newMemeRoute]),
  loginRoute
])

export const router = new Router({
  routeTree,
  context: {
    queryClient
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router
  }
}

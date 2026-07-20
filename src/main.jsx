import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/store.js'
import './index.css'
import AddPost from "./pages/AddPost.jsx"
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import { AuthLayout, Login } from './components/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PostForm from './components/PostForm.jsx'

const rout = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout  authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout  authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout  authentication={true}> 
            <PostForm />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout  authentication={true}>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout  authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout  authentication={true}>
            <Post />
          </AuthLayout>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={rout} />
    </Provider>
  </StrictMode>,
)

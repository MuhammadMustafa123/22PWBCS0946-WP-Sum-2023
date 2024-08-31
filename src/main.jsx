import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import { Home,AddPost,AllPosts,EditPost,Login,Post,SignUp } from './components/index.js'

const router=createBrowserRouter([
  {
    element:<App/>,
    path:'/',
    children:[{
      path:'',
      element:<Home/>
    },

    {
      path:'login',
      element:(
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
      )
    },
  
    {
      path:'signup',
      element:(
        <AuthLayout authentication={false}>
          <SignUp/>
        </AuthLayout>
      )
    },
  
    {
      path:'all-posts',
      element:(
        <AuthLayout authentication={true}>
          <AllPosts/>
        </AuthLayout>
      )
    },
  
    {
      path:'add-post',
      element:(
        <AuthLayout authentication={true}>
          <AddPost/>
        </AuthLayout>
      )
    },
  
    {
      path:'edit-post/:id',
      element:(
        <AuthLayout authentication={true}>
          <EditPost/>
        </AuthLayout>
      )
    },
  
    {
      path:'post/:id',
      element:(
        <AuthLayout authentication={true}>
          <Post/>
        </AuthLayout>
      )
    }
  ]
  }

  

])

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import Home from './pages/home/Home.jsx'
import Login from './pages/login/Login.jsx'
import Signup from './pages/signup/Signup.jsx'
import Dashboard from './Dashboard.jsx'
import Vote from './pages/vote/Vote.jsx'
import AddElection from './components/addElection/AddElection.jsx'
import AddCandidate from './components/addCandidate/AddCandidate.jsx'
import UpcommingE from './components/upcommingElections/upcommingE.jsx'
import CandidateDetails from './components/candidateDetails/CandidateDetails.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/vote',
        element:<Vote/>
      },
      {
        path:'/login',
        element:(
            <Login/>
        )
      },
      {
        path:'/signup',
        element:(
            <Signup/>
        )
      },
      {
        path:'*',
        element:<div>404</div>
      }
    ]
  },
  {
    path:'/admin',
    element:<Dashboard/>,
    children:[
      {
        path:'/admin/addelection',
        element:<AddElection/>
      },
      {
        path:'/admin/addcandidate',
        element:<AddCandidate/>
      },
      {
        path:'/admin/upcomingelections',
        element:<UpcommingE/>
      },
      {
        path:'/admin/candidates',
        element:<CandidateDetails/>
      },
      {
        path:'*',
        element:<div>404</div>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
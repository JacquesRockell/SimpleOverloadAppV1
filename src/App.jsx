import React from 'react'
import { useState, createContext, useEffect, useContext } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { getUser }from './Axios/getUser'

//Page Imports
import Layout from './Layout'
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'

export const AppContext = createContext()

export default function App() {
	const { toggleColorMode, colorMode } = useColorMode()
	const secondary = (colorMode == 'light' ? 'secondary.100' : 'secondary.800')
	const secondaryBorder = (colorMode == 'light' ? 'secondary.50' : 'secondary.900')
	//const API = 'http://35.244.89.239/api'
	const API = 'http://localhost:8080/api'
	//const API = 'https://celadon-klepon-373f0d.netlify.app/.netlify/functions/api'
	const [ authToken, setAuthToken ] = useState('')
	const [ user, setUser ] = useState()
	const [ update, setUpdate ] = useState(false)
	const values = { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder, user, setUser, update, setUpdate }
	
	function signOut(){  
        window.localStorage.removeItem('auth-token')
        setAuthToken(null) 
        setUser(null)    
    }

	useEffect(async () => {
		let token = window.localStorage.getItem('auth-token')
		if(token) {
			setAuthToken(token)
			const res = await getUser(token, API)
			if(res.error){
				signOut()
			} 
			else if (res.user) {
				setUser(res.user)
				console.log("User Udated")
			}	
		}
	}, [update])


	return (
		<AppContext.Provider value={values}>
			<Routes>
				<Route path='/' element={<Layout />}> 				
					<Route index element={
						<RequireNoAuth>
							<Landing />
						</RequireNoAuth>						
					} />
					<Route path='login' element={
						<RequireNoAuth>
							<Login />
						</RequireNoAuth>					
					}/>
					<Route path='/register' element={
						<RequireNoAuth>
							<Register />
						</RequireNoAuth>
					}/>
					<Route path='/home/*' element={
						<RequireAuth>
							<Home />
						</RequireAuth>				
					}/>
				</Route>	
			</Routes>		
		</AppContext.Provider>	
	)
}

function RequireAuth({children}){
	const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder } = useContext(AppContext)
	let location = useLocation();

	if (!authToken) return <Navigate to="/login" state={{ from: location }} replace />
	
	return children
}

function RequireNoAuth({children}){
	const { API, authToken, setAuthToken, colorMode, toggleColorMode, secondary, secondaryBorder } = useContext(AppContext)
	let location = useLocation();

	if (authToken) return <Navigate to="/home" state={{ from: location }} replace />
	
	return children
}
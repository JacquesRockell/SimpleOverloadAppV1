import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/index'
import App from './App'


ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>			
			<BrowserRouter>
				<App />				
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

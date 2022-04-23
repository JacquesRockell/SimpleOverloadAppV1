// theme/index.js
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


// Global style overrides
//import styles from './styles'

// Foundational style overrides
//import borders from './foundations/borders'

// Component style overrides
import { ButtonStyle as Button} from './components/button'
import { SlideStyle as Slide} from './components/slide'

const overrides = { 
    colors: {
        primary: '#3653E6', 
        secondary: {
            50: '#F8F8F8',
            100: '#FFFFFF',
            800: '#171717',
            900: '#080808',
        }    	  
    },
    styles: {
        global: (props) => ({
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('#F0F0F0', '#0D0D0D')(props),
                lineHeight: 'base',
            },
        }),
    },
    components: {
        Button,
        Slide,
    },   
}

const theme = extendTheme(overrides)

export default theme
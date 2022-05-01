import { whiten, darken, mode } from "@chakra-ui/theme-tools";

export const ButtonStyle = {
    // style object for base or default style
    baseStyle: {
        _focus:{ boxShadow: "none"}
    },
    // styles for different sizes ("sm", "md", "lg")
    sizes: {},
    // styles for different visual variants ("outline", "solid")
    variants: {
        primary: (props) => ({
            bg: "primary",
            color: "white",
            _hover: {
                bg: mode(darken("primary", 10), whiten("primary", 10))(props),
            },
        }),
        primaryOutline: (props) => ({
            bg: "transparent",
            border: "1px solid",
            color: "primary",
            borderColor: "primary",
            _hover: {
                bg: mode(darken("primary", 10), whiten("primary", 10))(props),
                color: "white",
            },
            
        }),
    }, 
    // default values for `size` and `variant`
    defaultProps: {},
}
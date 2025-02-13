import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, adaptNavigationTheme } from "react-native-paper";
import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { Colors } from "../constants/Colors"
import merge from 'deepmerge';

const CustomDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const CustomLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, CustomLightTheme,);
const CombinedDarkTheme = merge(DarkTheme, CustomDarkTheme);

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const colorScheme = useColorScheme();

    const paperTheme = colorScheme === "dark" ? CombinedDarkTheme : CombinedLightTheme

    return (
        <PaperProvider
            theme={paperTheme}>
            {children}
        </PaperProvider>
    );
};

export default ThemeProvider;

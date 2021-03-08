import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
  --mainGradient: linear-gradient(109.6deg, rgba(48, 207, 208, 1) 11.2%, rgba(51, 8, 103, 1) 92.5%);
  --font-primary: 'Montserrat', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-primary); 
}
`;

export default GlobalStyle;

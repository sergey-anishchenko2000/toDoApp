import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  :root {
    --bright-blue-300: hsl(220,98%,61%);
    --bright-blue-400: hsl(235,21%,11%);
    --bright-blue-500: hsl(235,24%,19%);
    --light-300: hsl(0,0%,98%);
    --light-400: hsl(236,33%,92%);
    --light-500: hsl(233,11%,84%);
    --light-600: hsl(236,9%,61%);
    --light-700: hsl(235,19%,35%);
    --dark-300: hsl(234,39%,85%);
    --dark-400: hsl(236,33%,92%);
    --dark-500: hsl(234,11%,52%);
    --dark-600: hsl(233,14%,35%);
    --dark-700: hsl(237,14%,26%);
  }

  .full-bg {
    background: ${({ theme }) => theme.body};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: -1;
  }  
  

`
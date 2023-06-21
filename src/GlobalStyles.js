import { createGlobalStyle } from 'styled-components';

const GloblaStyle = createGlobalStyle`
    html,
    body {
        font-family: 'Poppins', sans-serif;
        scroll-behavior: smooth;
    }
    body {
        --primaryColor: #1890ff;
        --darkColor: #212121;
        --lightColor: #f3f3f3;
        --bs: 0 0 4px 1px rgb(0 0 0 / 10%);
        --br: 3px;
    }
    .container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 20px;
    }
    
    ::selection {
        background-color: var(--primaryColor);
        color: #f3f3f3;
    }
`;

export default GloblaStyle;
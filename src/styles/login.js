import styled from 'styled-components';

export const LoginPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .formContainer {
        background-color: #fff;
        padding: 50px 30px;
        border-radius: var(--br);
        box-shadow: var(--bs);
        width: 45%;
        @media screen and (max-width: 640px) {
            width: 100%;
        }
        .heading {
            margin: 0;
            color: #000;
        }
        .formContent {
            margin-top: 20px;
        }
    }
`;
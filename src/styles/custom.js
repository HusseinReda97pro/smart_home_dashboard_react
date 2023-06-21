import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const StyledContent = styled(Content)`
    && {
        background-color: #fff;
        margin-top: 64px;
        @media screen and (min-width: 768px) {
            margin-left: 200px;
        }
    }
`;
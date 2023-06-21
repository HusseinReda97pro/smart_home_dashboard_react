import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import styled from 'styled-components';

export const Heading = styled(Title)`
    && {
        color: #000;
        margin: 0;
    }
`;

export const Description = styled(Text)`
    && {
        display: block;
        margin-bottom: 10px;
    }
`;
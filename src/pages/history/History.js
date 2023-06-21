import { SearchOutlined } from '@ant-design/icons';
import { Input, Row } from 'antd';
import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { HistoryPage } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import HistoryList from './HistoryList';

const History = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const localSearch = term => history => {
        return history?.userId?.firstName?.toLowerCase().includes(term) || history?.userId?.lastName?.toLowerCase().includes(term);
    }

    return (
        <AdminLayout>
            <HistoryPage>
                <Heading level={4}>
                    History
                </Heading>
                <Description type='secondary'>
                    Users histories, transactions
                </Description>
                <Row gutter={[10, 10]} justify='space-between'>
                    <div>
                        <Input 
                            value={searchTerm}
                            placeholder='Type a search keyword'
                            onChange={e => setSearchTerm(e.target.value)} 
                            prefix={<SearchOutlined />}
                        />
                    </div>
                </Row>
                <HistoryList localSearch={localSearch} searchTerm={searchTerm} />
            </HistoryPage>
        </AdminLayout>
    )
}

export default History;
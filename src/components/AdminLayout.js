import { Layout } from 'antd';
import Sidebar from './Sidebar';
import { StyledContent } from '../styles/custom';

const AdminLayout = ({ children }) => {
    return (
        <Layout style={{ height: '100vh' }}>
            <Sidebar />
            <Layout>
                <StyledContent>
                    <div style={{ height: '100%' }} className='container'>
                        {children}
                    </div>
                </StyledContent>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;
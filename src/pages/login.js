import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginPage } from '../styles/login';
import { toast } from 'react-toastify';
import firebase from 'firebase/compat';
import {
    Form,
    Input,
    Button,
    Space,
    Typography,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

const {
    Title,
    Text,
} = Typography;

const Login = () => {



    const history = useHistory();
    const [form] = Form.useForm();

    // * user state
    const user = useSelector(state => state.user);

    const onFinish = values => {
        // dispatch(login(values.email, values.password));
        // console.log(values.email, values.password);
        // toast("Wow so easy!")
        if (values.email && values.password) {
            handleLogin(values.email, values.password);
        } else {
            toast("something went wrong");

        }

    }

    const onReset = () => {
        form.resetFields();
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!!user) {
                history.push('/courses');
            }
        });


    }, [history]);


    const handleLogin = (email, password) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Login successful
                const user = userCredential.user;
                history.push('/courses');
                console.log('Logged in user:', user);
            })
            .catch((error) => {
                // Handle login errors
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorCode, errorMessage);
                toast(errorCode);
            });
    };
    return (
        <LoginPage>
            <div className='formContainer'>
                <Title className='heading' level={3}>Login</Title>
                <Text type='secondary'>login to continue.</Text>
                <Form
                    className='formContent'
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                    requiredMark='optional'>
                    <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input size='large' prefix={<UserOutlined />} placeholder='Email' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined />} placeholder='Password' />
                    </Form.Item>
                    <Space>
                        <Button type='primary' htmlType='submit' loading={user?.loading}>
                            Login
                        </Button>
                        <Button htmlType='button' onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form>
            </div>
        </LoginPage>
    )
}

export default Login;
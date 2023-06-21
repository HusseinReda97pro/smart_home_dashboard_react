import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AdminLayout from '../../components/AdminLayout';
import ProductsList from './products_list';
import localSearch from '../../utils/localSearch';
import { CreateCoursePage } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import { Row, Modal, Button, Input, Select, Col, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import ImageUploader from './image_uploader';
import firebase from 'firebase/compat';
import { toast } from 'react-toastify';


const AddProductForm = () => {
    const [title, setTitle] = useState('');
    const [electricityConsumption, setElectricityConsumption] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [actions, setActions] = useState(["switch_state_1"]);
    const [productsListKey, setProductsListKey] = useState(0); // Initialize the key state


    const handleModalVisible = () => setIsModalVisible(!isModalVisible);

    // * states
    const {
        courseCreateSuccess,
        courseCreateError,
        courseCreateLoading,
        courseEditSuccess,
        courseEditError,
    } = useSelector(state => state.course);



    const addSwitchAction = () => {
        console.log('addSwitchAction');
        actions.push(`switch_state_${actions.length + 1}`);
        console.log(actions);
        console.log(actions);
        setActions([...actions]);

    }

    const removeSwitchAction = () => {
        console.log('removeSwitchAction');
        if (actions.length == 1) return;
        actions.pop();
        setActions([...actions]);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        handleUpload()
    }

    useEffect(() => {
    }, []);


    const closeModel = () => {
        setTitle('');
        setElectricityConsumption('');
        setActions(["switch_state_1"]);
        setSelectedImage(null);
        setProductsListKey(productsListKey + 1);
        setIsModalVisible(false);


    }

    useEffect(() => {
        if (courseCreateSuccess) {
            setIsModalVisible(false);
            message.success('Course Created Successfully!', 3);
        }

        if (courseEditSuccess) {
            message.success('Course Updated Successfully!', 3);
        }

        if (courseEditError) {
            message.error(courseEditError, 3);
        }

        if (courseCreateError) {
            message.error('Error occurred, please try again!', 3);
        }
    }, [
        courseCreateSuccess,
        courseEditSuccess,
        courseEditError,
        courseCreateError,
    ]);


    const handleUpload = () => {
        console.log(selectedImage);
        if (selectedImage) {
            const currentTime = new Date();
            let image_name = `${currentTime.toISOString()}_${selectedImage.name}`;
            const uploadTask = firebase.storage()
                .ref(`product_images/${image_name}`)
                .put(selectedImage);

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Error uploading image: ', error);
                },
                () => {
                    console.log("value xxxxxxxxxxx");
                    firebase.storage()
                        .ref('product_images')
                        .child(image_name)
                        .getDownloadURL()
                        .then(async (url) => {
                            console.log("url");
                            console.log(url);
                            let data = {
                                name: title,
                                electricityConsumption: electricityConsumption,
                                image: url,
                                actions: actions
                            };
                            await firebase.firestore().collection('products').add(data)
                                .then((docRef) => {
                                    console.log('Document written with ID: ', docRef.id);
                                    toast('Product added successfully');
                                    closeModel();
                                })
                                .catch((error) => {
                                    console.log(error);
                                    toast('failed to add Product');

                                });

                        });
                }
            );
        }
    };
    const AddProductForm = () => (
        <Modal
            title='Add New Product'
            centered
            visible={isModalVisible}

            onOk={handleSubmit}
            confirmLoading={courseCreateLoading}
            okText='Add New Product'
            onCancel={handleModalVisible}
            width={"70vw"}
            okButtonProps={{
                style: {
                    backgroundColor: '#413960', // Replace with your desired color
                },
            }}
        >
            <form onSubmit={handleSubmit}>
                <Row gutter={[10, 10]}>
                    <Col xs={24} md={12}>
                        <label>
                            Title
                            <Input
                                value={title}
                                placeholder='Type Product title'
                                onChange={e => setTitle(e.target.value)}
                                size='large'
                            />
                        </label>
                    </Col>

                    <Col xs={24} md={12}>
                        <label>
                            Electricity Consumption (KWH)
                            <Input
                                value={electricityConsumption}
                                placeholder='Type  Electricity consumption (KWH)'
                                onChange={e => setElectricityConsumption(e.target.value)}
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={24}>
                        <label>
                            <hr />
                            <center> Actions</center>
                            <hr />
                            <ul>
                                {actions.map((action, index) => (
                                    <li key={index}>
                                        {action}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ float: "right", margin: "15px" }}>

                                <Button type='primary' style={{ backgroundColor: "#413960", marginRight: "20px" }} onClick={removeSwitchAction}>Remove Switch</Button>
                                <Button type='primary' style={{ backgroundColor: "#413960", marginRight: "20px" }} onClick={addSwitchAction}>Add Switch</Button>
                            </div>

                        </label>
                    </Col>

                </Row>
                <hr />
                <Row>
                    <Col xs={24} md={12}>
                        <label>
                            Product Image
                            <ImageUploader setSelectedImage={setSelectedImage} />

                            {/* <Input
                                value={description}
                                placeholder='Type course description'
                                onChange={e => setDescription(e.target.value)}
                                size='large'
                            /> */}
                        </label>
                    </Col>
                </Row>
            </form>
        </Modal >
    );

    return (
        <AdminLayout>
            <CreateCoursePage>
                <Heading level={4}>Products</Heading>
                <Description type='secondary'>
                    Create and filter products
                </Description>
                <Row gutter={[10, 10]} justify='space-between'>
                    <div>
                        <Input
                            value={searchTerm}
                            style={{ width: "55vw" }}
                            placeholder='Type a search keyword'
                            onChange={e => setSearchTerm(e.target.value)}
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div>
                        <Button
                            type='primary'
                            style={{ backgroundColor: "#413960" }}
                            icon={<PlusOutlined />}
                            onClick={handleModalVisible}
                        >
                            Add Product
                        </Button>
                        {AddProductForm()}
                    </div>
                </Row>
                <ProductsList key={productsListKey} localSearch={localSearch} searchTerm={searchTerm} />
            </CreateCoursePage>
        </AdminLayout>
    );
};

export default AddProductForm;

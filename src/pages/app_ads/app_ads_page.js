import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import localSearch from '../../utils/localSearch';

import AdminLayout from '../../components/AdminLayout';
import { CreateCoursePage } from '../../styles/pages';
import { Description, Heading } from '../../styles/titles';
import { Row, Modal, Button, Input, Select, Col, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import AdImageUploader from './ad_image_uploader';
import firebase from 'firebase/compat';
import { toast } from 'react-toastify';
import sendFCMNotification from '../../services/send_notifcation';
import AdList from './ad_list';

const AppAds = () => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setURL] = useState('');
    const [adsListKey, setAdsListKey] = useState(0); // Initialize the key state

    // * states
    const {
        courseCreateLoading,
    } = useSelector(state => state.course);

    const handleModalVisible = () => {
        if (!isModalVisible) {
            closeModel();
        }
        setIsModalVisible(!isModalVisible);

    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!title || !message || !selectedFile) return;
        handleUpload()
    }


    const handleUpload = () => {
        if (selectedFile) {
            const currentTime = new Date();
            let file_name = `${currentTime.toISOString()}_${selectedFile.name}`;
            let isVideo = file_name.split(".")[file_name.split(".").length - 1] == "mp4";
            const uploadTask = firebase.storage()
                .ref(`ad_files/${file_name}`)
                .put(selectedFile);

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Error uploading image: ', error);
                },
                () => {
                    firebase.storage()
                        .ref('ad_files')
                        .child(file_name)
                        .getDownloadURL()
                        .then(async (file_url) => {
                            let data = {
                                name: title,
                                message: message,
                                url: url,
                                image: isVideo ? null : file_url,
                                video: isVideo ? file_url : null
                            };
                            await firebase.firestore().collection('ads').add(data)
                                .then((docRef) => {
                                    closeModel();
                                    sendFCMNotification(title, message);
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

    const closeModel = () => {
        setTitle('');
        setMessage('');
        setURL('');
        setSelectedFile(null);
        setIsModalVisible(false);
        setAdsListKey(adsListKey + 1);

    }

    const AppAds = () => (
        <Modal
            title='Add New Ad'
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
                                placeholder='Type Ad title'
                                onChange={e => setTitle(e.target.value)}
                                size='large'
                            />
                        </label>
                    </Col>
                </Row>

                <Row gutter={[10, 10]} style={{ marginTop: "1rem" }}>
                    <Col xs={24} md={12}>
                        <label>
                            Ad Message
                            <Input
                                value={message}
                                placeholder='Type Ad Message'
                                onChange={e => setMessage(e.target.value)}
                                size='large'
                            />
                        </label>
                    </Col>
                </Row>
                <Row gutter={[10, 10]} style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <Col xs={24} md={12}>
                        <label>
                            URL For new Product
                            <Input
                                value={url}
                                placeholder='Type Product URL'
                                onChange={e => setURL(e.target.value)}
                                size='large'
                            />
                        </label>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col xs={24} md={12}>
                        <label>
                            Ad Image or Video (Aspect Ratio 1920 * 1080 (Aspect Ratio: 16/9 ))
                            <AdImageUploader setSelectedFile={setSelectedFile} />

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
                <Heading level={4}>App Ads</Heading>
                <Description type='secondary'>
                    Create and filter app ads
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
                            Add Ad
                        </Button>
                        {AppAds()}
                    </div>
                </Row>
                <AdList key={adsListKey} localSearch={localSearch} searchTerm={searchTerm} />
            </CreateCoursePage>
        </AdminLayout>
    );

};
export default AppAds;
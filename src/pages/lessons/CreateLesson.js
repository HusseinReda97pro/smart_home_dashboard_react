import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLesson } from '../../state/actions/lesson';
import Modal from 'antd/lib/modal/Modal';
import { Col, Input, message, Row } from 'antd';

const CreateLesson = ({ isModalVisible, handleModalVisible, courseId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [pdfUrl, setPdfUrl] = useState('');
    const [maxCount, setMaxCount] = useState('');

    const dispatch = useDispatch();

    // * state
    const {
        lessonCreateSuccess,
        lessonCreateLoading,
        lessonCreateError,
        lessonEditError,
        lessonEditSuccess,
    } = useSelector(state => state.lesson);

    const handleCreateLesson = e => {
        e.preventDefault();

        dispatch(createLesson({
            courseId, 
            title,   
            description,
            videoUrl,
            price,
            imageUrl,
            pdfUrl,
            maxCount,
        }));
    }

    useEffect(() => {
        if (lessonCreateSuccess) {
            message.success('Lesson created successfully', 3);
        }

        if (lessonCreateError) {
            message.error(lessonCreateError, 3);
        }

        if (lessonEditSuccess) {
            message.success('Lesson updated successfully', 3);
        }

        if (lessonEditError) {
            message.error(lessonEditError, 3);
        }
    }, [lessonCreateSuccess, lessonEditSuccess, lessonEditError, lessonCreateError]);

    return (
        <Modal
            title='Create new lesson'
            centered
            visible={isModalVisible}
            onOk={handleCreateLesson}
            confirmLoading={lessonCreateLoading}
            okText='Create'
            onCancel={handleModalVisible}
            width={1000}
        >
            <form onSubmit={handleCreateLesson}>
                <Row gutter={[10, 10]}>
                    <Col xs={24} md={12}>
                        <label>
                            Description
                            <Input
                                value={description}
                                placeholder='Type lesson description'
                                onChange={e => setDescription(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            Title
                            <Input
                                value={title}
                                placeholder='Type lesson title'
                                onChange={e => setTitle(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            Video URL
                            <Input
                                value={videoUrl}
                                placeholder='Type lesson video url'
                                onChange={e => setVideoUrl(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            Price
                            <Input
                                value={price}
                                placeholder='Type lesson price'
                                onChange={e => setPrice(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            Image URL
                            <Input
                                value={imageUrl}
                                placeholder='Type lesson image url'
                                onChange={e => setImageUrl(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            PDF URL
                            <Input
                                value={pdfUrl}
                                placeholder='Type lesson pdf path'
                                onChange={e => setPdfUrl(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                    <Col xs={24} md={12}>
                        <label>
                            Max Count
                            <Input
                                value={maxCount}
                                placeholder='Type lesson max count'
                                onChange={e => setMaxCount(e.target.value)} 
                                size='large'
                            />
                        </label>
                    </Col>
                </Row>
            </form>
        </Modal>
    )
}

export default CreateLesson;
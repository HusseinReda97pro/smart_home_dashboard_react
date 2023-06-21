import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getSingleCourse } from '../../state/actions/courses';
import { Description, Heading } from '../../styles/titles';
import { CourseDetails } from '../../styles/pages';
import CourseLessonList from '../lessons/CourseLessonList';
import { Button, Input, Row } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CreateLesson from '../lessons/CreateLesson';

const SingleCourse = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleModalVisible = () => setIsModalVisible(!isModalVisible);

    const { courseId } = useParams();
    const dispatch = useDispatch();

    const { course } = useSelector(state => state.course);

    useEffect(() => {
        dispatch(getSingleCourse(courseId));
    }, [dispatch, courseId]);

    const localSearch = term => lesson => {
        return lesson.title.toLowerCase().includes(term);
     }

    return (
        <AdminLayout>
            <CourseDetails>
                <Heading level={4}>
                    {course?.title}
                </Heading>
                <Description type='secondary'>
                    {`${course?.description?.substring(0, 30)}...`}
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
                    <div>
                        <Button
                            type='primary'
                            icon={<PlusOutlined />}
                            onClick={() => handleModalVisible()}
                        >Create</Button>
                        <CreateLesson 
                            isModalVisible={isModalVisible} 
                            handleModalVisible={handleModalVisible}
                            courseId={courseId}
                        />
                    </div>
                </Row>
                <CourseLessonList 
                    searchTerm={searchTerm} 
                    localSearch={localSearch} 
                    courseId={courseId} 
                />
            </CourseDetails>
        </AdminLayout>
    )
}

export default SingleCourse;
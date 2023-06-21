import { Button, Card, Col, Input, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLesson } from "../../state/actions/lesson";
import LessonStudents from "./LessonStudents";

const SingleLesson = ({ lesson, courseId }) => {
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [imageUrl, setImageUrl] = useState(lesson.imageUrl);
  const [videoUrl, setVideoUrl] = useState(lesson.videoUrl);
  const [price, setPrice] = useState(lesson.price);
  const [pdfUrl, setPdfUrl] = useState(lesson.pdfUrl);
  const [maxCount, setMaxCount] = useState(lesson.maxCount);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleModalVisible = () => setIsModalVisible(!isModalVisible);

  const handleEditLesson = (e) => {
    e.preventDefault();

    dispatch(
      editLesson({
        courseId,
        lessonId: lesson._id,
        title,
        description,
        imageUrl,
        videoUrl,
        price,
        pdfUrl,
        maxCount,
      })
    );
  };

  const { lessonEditLoading } = useSelector((state) => state.lesson);

  const lessonEditForm = () => (
    <Modal
      title="Edit this lesson"
      centered
      visible={isModalVisible}
      onOk={handleEditLesson}
      confirmLoading={lessonEditLoading}
      okText="Edit"
      onCancel={handleModalVisible}
      width={1000}
    >
      <form onSubmit={handleEditLesson}>
        <Row gutter={[10, 10]}>
          <Col xs={24} md={12}>
            <label>
              Title
              <Input
                value={title}
                placeholder="Type title"
                onChange={(e) => setTitle(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Description
              <Input
                value={description}
                placeholder="Type description"
                onChange={(e) => setDescription(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Image URL
              <Input
                value={imageUrl}
                placeholder="Type image url"
                onChange={(e) => setImageUrl(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Video URL
              <Input
                value={videoUrl}
                placeholder="Type video url"
                onChange={(e) => setVideoUrl(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Price
              <Input
                value={price}
                placeholder="Type price"
                onChange={(e) => setPrice(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              PDF URL
              <Input
                value={pdfUrl}
                placeholder="Type pdf pathname"
                onChange={(e) => setPdfUrl(e.target.value)}
                size="large"
              />
            </label>
          </Col>
          <Col xs={24} md={12}>
            <label>
              Max Count
              <Input
                value={maxCount}
                placeholder="Type max count"
                onChange={(e) => setMaxCount(e.target.value)}
                size="large"
              />
            </label>
          </Col>
        </Row>
      </form>
    </Modal>
  );

  return (
    <Card
      style={{ width: "100%" }}
      cover={<img alt={lesson.title} src={lesson.imageUrl} />}
      actions={[
        <LessonStudents courseId={courseId} lessonId={lesson._id} />,
        <Button onClick={handleModalVisible}>Edit</Button>,
      ]}
    >
      <Meta title={lesson.title} description={lesson.description} />
      {lessonEditForm()}
    </Card>
  );
};

export default SingleLesson;

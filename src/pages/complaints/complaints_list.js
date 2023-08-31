import { useEffect, useState } from 'react';
import { Row, Spin, Alert, Table, } from 'antd';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

import firebase from 'firebase/compat';
import { toast } from 'react-toastify';
import { SendOutlined } from "@ant-design/icons";

import { Heading } from '../../styles/titles';
import AdminLayout from '../../components/AdminLayout';

const ComplaintsList = () => {
    const [complaintsList, setComplaintsList] = useState([]);
    const [complaintsListError, setComplaintsListError] = useState();
    const [complaintsListLoading, setComplaintsListLoading] = useState(false);

    const fetchComplaints = async () => {
        try {

            const collectionRef = firebase.firestore().collection('complaints');
            const snapshot = await collectionRef.get();
            const complaints = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(complaints);
            setComplaintsList(complaints);



        } catch (error) {
            setComplaintsListError(error);
            toast("error loading complaints")
        }
    };


    const handleReplyChange = (value, index) => {
        const updatedComplaints = [...complaintsList];
        updatedComplaints[index].reply = value;
        setComplaintsList(updatedComplaints);
    };


    const updateStatus = (com) => {
        try {
            let newStatus = com.status == "close" ? "open" : "close";

            const collectionRef = firebase.firestore().collection('complaints/').doc(`${com.id}`);
            collectionRef
                .update({
                    status: newStatus
                })
                .then(() => {
                    com.status = newStatus;
                    setComplaintsList([...complaintsList]);
                    if (newStatus == "open") {

                        toast("Complaint Opened", 1);

                    } else {
                        toast("Complaint Closed", 1);
                    }
                })
                .catch((error) => {
                    toast("something went wrong", 0.5);
                });
        } catch (e) {
            toast("something went wrong", 0.5);
        }

    }
    const sendReply = (com) => {
        try {
            const collectionRef = firebase.firestore().collection('complaints/').doc(`${com.id}`);
            collectionRef
                .update({
                    "reply": com.reply
                })
                .then(() => {
                    setComplaintsList([...complaintsList]);
                    toast("Reply Sent", 1);
                })
                .catch((error) => {
                    toast("something went wrong", 0.5);
                });
        } catch (e) {
            toast("something went wrong", 0.5);
        }

    }




    useEffect(async () => {
        setComplaintsListError(null);
        setComplaintsListLoading(true);
        await fetchComplaints();
        setComplaintsListLoading(false);
    }, []);

    ;

    const items = () => (
        <AdminLayout>

            <Heading style={{ marginTop: "2rem" }} level={4}>Complaints</Heading>


            <Row gutter={[10, 10]} style={{ marginTop: "2rem", marginBottom: "4rem" }} >

                {complaintsList?.length === 0 ? (
                    <Alert message='No complaints' type='warning' />
                )

                    : <table border="3" style={{ width: "90vw", borderCollapse: "collapse" }}>
                        <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                            <tr>
                                <th style={{ width: "20px" }}>status</th>
                                <th><center>Complaint ID</center></th>
                                <th><center>user name</center></th>
                                <th><center>phone number</center></th>
                                <th><center>subject</center></th>
                                <th><center>message</center></th>
                                <th><center>reply</center></th>


                            </tr>
                        </thead>
                        <tbody>
                            {complaintsList.map((com, index) => (
                                <tr key={com.id} style={{ paddingTop: "2rem", backgroundColor: com.status == "close" ? "#A2CDB0" : index % 2 == 0 ? "#fff" : "#eee" }}>
                                    <td style={{ width: "20px" }}>{<center><input type="checkbox" checked={com.status == "close"} onChange={() => updateStatus(com)} /></center>}</td>
                                    <td><center>{com.id}</center> </td>
                                    <td><center>{com.userName} </center></td>
                                    <td><center>{com.phoneNumber} </center></td>
                                    <td><center>{com.title} </center></td>
                                    <td><center>{com.content} </center></td>
                                    <td><center> <input value={com.reply} onChange={(e) => { handleReplyChange(e.target.value, index); }} /> <button onClick={() => sendReply(com)}> <SendOutlined /></button> </center></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                }
            </Row >
            <div style={{ height: "2rem" }} />
        </AdminLayout>
    );

    return (
        <div style={{ marginTop: '25px' }}>


            {complaintsListLoading ? (
                <Spin />
            ) : complaintsListError ? (
                <Alert message={complaintsListError} type='error' />
            ) : (
                items()
            )}
        </div>
    );
};

export default ComplaintsList;

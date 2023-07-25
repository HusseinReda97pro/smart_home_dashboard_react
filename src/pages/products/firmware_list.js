import { useEffect, useState } from 'react';
import { Row, Spin, Alert, Table, } from 'antd';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

import firebase from 'firebase/compat';
import { toast } from 'react-toastify';
import sendFCMNotification from '../../services/send_notifcation';


const FirmwareList = ({ key, localSearch, searchTerm }) => {
    const [updatesList, setUpdatesList] = useState([]);
    const [updatesListError, setUpdatesListError] = useState();
    const [updatesListLoading, setUpdatesListLoading] = useState(false);
    const { productId } = useParams();
    const [product, setProduct] = useState(false);

    let base_storage_url = "https://firebasestorage.googleapis.com/v0/b/smart-home-666d6.appspot.com/o/";
    let token = "?alt=media&token=53c48746-f136-4746-920d-8489860acd59";
    const fetchProductUpdates = async () => {
        try {
            const productData = await firebase.firestore().collection('products').doc(`${productId}`).get();
            if (productData.exists) {
                setProduct(productData.data());
                console.log(productData.data());

                if (productData.data().updates) {
                    setUpdatesList(productData.data().updates);
                } else {
                    setUpdatesList([]);
                }

                console.log("updates");
                console.log(updatesList);
            }

        } catch (error) {
            setUpdatesList(error);
            toast("error loading items")
        }
    };





    useEffect(async () => {
        setUpdatesListError(null);
        setUpdatesListLoading(true);
        await fetchProductUpdates();
        setUpdatesListLoading(false);
    }, []);

    const handleImageChange = (e) => {
        let files = e.target.files;
        if (files[0]) {
            // setSelectedImage(files[0]);
            if (FileReader && files && files.length) {
                if (files[0]) {
                    try {
                        let list = files[0].name.split('.');
                        let type = list[list.length - 1];
                        if (type != 'bin') {
                            toast("file type error, only .bin file is allowed", 0.5);
                            return;
                        } else {
                            handleUpload(files[0]);
                        }
                    } catch (_) { }

                }
            }
        }
    };



    const handleUpload = (file) => {
        if (file) {
            const currentTime = new Date();
            let file_name = `${currentTime.toISOString()}_${file.name}`;
            const uploadTask = firebase.storage()
                .ref(`products_firmwares/${productId}/${file_name}`)
                .put(file);

            uploadTask.on(
                'state_changed',
                null,
                (error) => {
                    console.error('Error uploading file ', error);
                    toast("Error uploading file", 0.5);

                },
                async () => {

                    let last_version = (product.last_version ?? 0) + 1
                    let all_updates = product.updates ?? [];
                    all_updates.push({
                        version: last_version,
                        url: `products_firmwares/${productId}/${file_name}`
                    })
                    let data = {
                        last_version: last_version,
                        last_version_url: `products_firmwares/${productId}/${file_name}`,
                        updates: all_updates

                    };

                    const docRef = firebase.firestore().collection('products').doc(productId);
                    // Perform the update operation
                    await docRef.update(data).then((_) => {
                        toast('update added successfully');
                        fetchProductUpdates();
                    })
                        .catch((error) => {
                            console.log(error);
                            toast('failed to add update');

                        });


                }
            );
        }
    };


    const rollback = async (version, url) => {
        const docRef = firebase.firestore().collection('products').doc(productId);
        // Perform the update operation
        let data = {
            last_version: version,
            last_version_url: url,
        };

        await docRef.update(data).then((_) => {
            toast('Rollback successfully');
            fetchProductUpdates();
        })
            .catch((error) => {
                console.log(error);
                toast('failed to Rollback');

            });
        sendFCMNotification(version, url, productId);
        sendFCMNotification(product.name, "has new update for device software, do it now!", `mobile_${productId}`);

    }

    const onClick = (event) => {
        event.preventDefault();
        document.getElementById("file_chooser").click();
    }

    const updates = () => (
        <>

            <div style={{ marginTop: "6rem", }}>
                <center>  <img height={"300px"} src={product.image}></img></center>
                <center>  <h1 style={{ marginTop: "2rem" }}>{product.name + " (Firmware)"}</h1></center>
                {product.last_version && <center>  <h3 style={{ marginTop: "0.25rem" }}>{"Current Version: " + product.last_version}</h3></center>}
            </div>

            <Row>
                <div style={{ display: "flex", justifyContent: "flex-end", float: "right", width: "90%", height: "30px", margin: "auto" }}>
                    <span>only .bin file is allowed</span>
                    <Button type='primary' style={{ backgroundColor: "#413960", marginLeft: "0.5rem" }} onClick={onClick}>Add New Update</Button>
                    <input style={{ display: "none" }} id='file_chooser' type="file" onChange={handleImageChange} />

                </div>
            </Row>

            <Row gutter={[10, 10]} style={{ marginLeft: "6rem", marginRight: "6rem", marginTop: "0.5rem", marginBottom: "4rem" }}>

                {updatesList?.length === 0 ? (
                    <Alert message='No Updates Yet' type='warning' />
                )

                    : <table border="3" style={{ width: "90vw", borderCollapse: "collapse" }}>
                        <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                            <tr>
                                <th style={{ width: "20px" }}>version</th>
                                <th><center>Firmware File</center></th>
                                <th><center>Rollback</center></th>
                            </tr>
                        </thead>
                        <tbody>
                            {updatesList.map((update, index) => (
                                <tr key={"update.id"} style={{ paddingTop: "2rem", backgroundColor: index % 2 == 0 ? "#fff" : "#eee" }}>
                                    <td style={{ width: "60px" }}>{<center>{update.version}</center>}</td>
                                    <td><center><a target='blank' href={base_storage_url + (update.url.replaceAll("/", "%2F") + token)}>File</a></center> </td>
                                    <td>
                                        <center>
                                            <Button type='primary' style={{ margin: "10px 0", backgroundColor: "#413960" }} onClick={() => { rollback(update.version, update.url) }}>Rollback To this update</Button>

                                        </center>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                }
            </Row >
            <div style={{ height: "2rem" }} />
        </>
    );

    return (
        <div style={{ marginTop: '25px' }}>


            {updatesListLoading ? (
                <Spin />
            ) : updatesListError ? (
                <Alert message={updatesListError} type='error' />
            ) : (
                updates()
            )}
        </div>
    );
};

export default FirmwareList;

import { useEffect, useRef, useState } from 'react';
import { Row, Spin, Alert, Table, } from 'antd';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';

import firebase from 'firebase/compat';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';
import ItemLabel from './item_label';
import jsPDF from 'jspdf';
import { useReactToPrint } from 'react-to-print';

const ItemList = ({ key, localSearch, searchTerm }) => {
    const [itemList, setItemList] = useState([]);
    const [itemListError, setItemListError] = useState();
    const [itemListLoading, setItemListLoading] = useState(false);
    const { productId } = useParams();
    const [product, setProduct] = useState(false);
    const [itemsCountToAdd, setItemsCountToAdd] = useState(1);
    const ref = useRef();
    const [LabelsToPrint, set] = useState([]);


    const fetchProductItems = async () => {
        try {
            const productData = await firebase.firestore().collection('products').doc(`${productId}`).get();
            if (productData.exists) {
                setProduct(productData.data());
            }


            const db = firebase.database();
            let ref = db.ref('smart_home/items');
            ref = ref.orderByChild('productId').equalTo(`${productId}`);

            // Attach a listener to the 'value' event for real-time updates
            ref.on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Convert the data object to an array
                    const dataArray = Object.entries(data).map(([id, item]) => ({
                        // id: id.replace(/-/g, ''),
                        id: id,
                        ...item
                    }));
                    console.log("dataArray");
                    console.log(dataArray);
                    setItemList(dataArray);
                } else {
                    setItemList([]);
                }
            });
            console.log(productData.data());
        } catch (error) {
            setItemListError(error);
            toast("error loading items")
        }
    };



    const addItems = () => {
        if (itemsCountToAdd < 1) return;

        let item = { productId: productId, isAssigned: false, users: [], actions: product.actions };
        // const itemsToAdd = Array(5).fill(item);
        const itemsToAdd = Array.from({ length: itemsCountToAdd }, () => item);

        // console.log(itemsToAdd);
        // return;
        const db = firebase.database();
        const ref = db.ref("smart_home/items");
        for (let i of itemsToAdd) {


            ref.push(i)
                .then(() => {
                    console.log('Item added successfully.');
                    // toast("Items added successfully");
                })
                .catch((error) => {
                    console.error('Error adding item:', error);
                    // toast("error adding items");

                });
        }
        toast("Items added successfully");
    }

    const updateAssigned = (item) => {
        try {
            const db = firebase.database();
            const docRef = db.ref(`smart_home/items/${item.id}`);
            docRef
                .update({
                    isAssigned: !item.isAssigned
                })
                .then(() => {
                    console.log('Document successfully updated!');
                    // item.isAssigned = !item.isAssigned;

                    // setItemList([...itemList]);
                    if (!item.isAssigned) {
                        toast("Assigned to device", 1);

                    } else {
                        toast("Unassigned to device", 1);

                    }
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                    // item.isAssigned = !item.isAssigned;

                    toast("something went wrong", 0.5);
                });
        } catch (e) {
            console.log(e);
            toast("something went wrong", 0.5);
        }

    }

    const printPDF =
        // const doc = new jsPDF({
        //     orientation: "landscape",
        //     unit: "in",
        //     format: [4, 2]
        // });

        // doc.addJS();
        // doc.save("products_label_" + Date.now() + ".pdf");

        useReactToPrint({
            content: function () {
                ref.current.removeAttribute('hidden');
                return ref.current;
            }
        });


    useEffect(async () => {
        setItemListError(null);
        setItemListLoading(true);
        await fetchProductItems();
        setItemListLoading(false);
    }, []);

    ;

    const items = () => (
        <>

            <div style={{ marginTop: "6rem" }} >
                <center>  <img src={product.image}></img></center>
                <center>  <h1 style={{ marginTop: "2rem" }}>{product.name}</h1></center>
            </div>

            <Row>

                <div style={{ display: "flex", justifyContent: "flex-end", float: "right", width: "90vw", height: "30px", margin: "auto" }}>
                    <input type="number" pattern="\d*" inputMode="numeric" value={itemsCountToAdd} onChange={(e) => {
                        if (e.target.value < 0) return;
                        setItemsCountToAdd(e.target.value)
                    }} style={{ textAlign: "center" }} />
                    <Button type='primary' style={{ backgroundColor: "#413960", width: "110px", marginLeft: "0.5rem" }} onClick={addItems}>Add Items</Button>

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", float: "right", width: "90vw", height: "40px", margin: "auto" }}>
                    <Button type='primary' style={{ backgroundColor: "#413960", width: "140px", marginTop: "0.5rem", marginRight: "0.5rem", }} onClick={() => {
                        printPDF();
                        ref.current.setAttribute('hidden', '');

                    }}>Print Item Labels</Button>
                </div>

            </Row>
            <Row gutter={[10, 10]} style={{ marginLeft: "6rem", marginRight: "6rem", marginTop: "0.5rem", marginBottom: "4rem" }}>

                {itemList?.length === 0 ? (
                    <Alert message='No Items' type='warning' />
                )

                    : <table border="3" style={{ width: "90vw", borderCollapse: "collapse" }}>
                        <thead style={{ backgroundColor: "#000", color: "#fff" }}>
                            <tr>
                                <th style={{ width: "20px" }}>Assigned to device</th>
                                <th><center>Item ID</center></th>
                                <th><center>Item Label</center></th>
                                <th><center>users number</center></th>

                            </tr>
                        </thead>
                        <tbody >
                            {itemList.map((item, index) => (
                                <tr key={item.id} style={{ paddingTop: "2rem", backgroundColor: item.isAssigned ? "#A2CDB0" : index % 2 == 0 ? "#fff" : "#eee" }}>
                                    <td style={{ width: "20px" }}>{<center><input type="checkbox" checked={item.isAssigned} onChange={() => updateAssigned(item)} /></center>}</td>
                                    <td><center>{item.id}</center> </td>
                                    <td ><ItemLabel item={item} productName={product.name} /></td>
                                    {/* <td><center><Barcode value={item.id} height={30} width={1} />, </center></td> */}


                                    <td><center>{item.users?.length ?? 0} </center></td>
                                </tr>
                            ))}
                        </tbody>

                        <tbody ref={ref} hidden>
                            {itemList.map((item, index) => (
                                < div style={{ paddingBottom: "1cm", }}>
                                    <tr key={item.id} style={{ margin: "2cm", backgroundColor: "#fff" }}>
                                        <td  > <ItemLabel item={item} productName={product.name} /> </td>

                                    </tr>
                                </div>
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


            {itemListLoading ? (
                <Spin />
            ) : itemListError ? (
                <Alert message={itemListError} type='error' />
            ) : (
                items()
            )}
        </div>
    );
};

export default ItemList;

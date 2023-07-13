import { useEffect, useState } from 'react';
import { Row, Spin, Alert, } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import firebase from 'firebase/compat';
import { toast } from 'react-toastify';

const AdList = ({ key, localSearch, searchTerm }) => {
    const [ads, setAds] = useState([]);
    const [adsListError, setAdsListError] = useState();
    const [adsListLoading, setAdsListLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            const usersCollection = await firebase.firestore().collection('ads').get();
            const adsData = usersCollection.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAds(adsData);
        } catch (error) {
            setAdsListError(error);
            toast("error loading ads")
        }
    };


    const deleteAd = async (adID) => {
        try {
            await firebase.firestore().collection('ads').doc(adID).delete();
            toast("Ad deleted successfully!");
            const updatedList = ads.filter(ad => ad.id !== adID);
            setAds(updatedList);
        } catch (error) {
            toast('Error deleting ad');
        }
    }


    useEffect(async () => {
        setAdsListError(null);
        setAdsListLoading(true);
        await fetchProducts();

        setAdsListLoading(false);
    }, []);

    ;

    const AdList = () => (
        <Row gutter={[10, 10]}>
            {ads?.length === 0 ? (
                <Alert message='No Ads' type='warning' />
            )
                // : products?.filter(localSearch(searchTerm)).length === 0 ? (
                // 	<Alert message='No products matched your keywords' type='warning' />)
                : (
                    // products?.filter(localSearch(searchTerm))
                    <>
                        <table border="3" style={{ width: "90vw", borderCollapse: "collapse" }}>
                            <thead style={{ backgroundColor: "#eee", color: "#000" }}>
                                <tr>
                                    <th style={{ width: "20px" }}>Ad.No</th>
                                    <th><center>ad ID</center></th>
                                    <th><center>title</center></th>
                                    <th><center>message</center></th>
                                    <th><center>url</center></th>
                                    <th><center>file</center></th>
                                    <th><center>delete</center></th>


                                </tr>
                            </thead>

                            <tbody>
                                {ads.map((ad, index) => (
                                    <tr key={ad.id} style={{ paddingTop: "2rem", backgroundColor: index % 2 == 0 ? "#fff" : "#eee" }}>
                                        <td style={{ width: "20px", padding: "1rem" }}>{<center>{index + 1}</center>}</td>
                                        <td><center>{ad.id}</center> </td>
                                        <td><center>{ad.name}</center></td>
                                        <td><center>{ad.message}</center></td>
                                        <td><center>{ad.url && <a href={ad.url} target='blank'> AD URL</a>}</center></td>
                                        <td><center>{ad.url && <a href={ad.image ?? ad.video} target='blank'> File</a>}</center></td>
                                        <td><center>
                                            <Button
                                                type='danger'
                                                // style={{ backgroundColor: "#413960" }}
                                                icon={<DeleteOutlined />}
                                                onClick={() => deleteAd(ad.id)}
                                            >
                                                Delete Ad
                                            </Button>
                                        </center></td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
        </Row >
    );

    return (
        <div style={{ marginTop: '25px' }}>


            {adsListLoading ? (
                <Spin />
            ) : adsListError ? (
                <Alert message={adsListError} type='error' />
            ) : (
                AdList()
            )}
        </div>
    );
};

export default AdList;

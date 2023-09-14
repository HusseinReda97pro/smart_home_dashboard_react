import { Col, Row } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import QRCode from 'react-qr-code';

const ItemLabel = ({ item, productName }) => {
    return (
        <center>
            <div style={{ backgroundColor: "white", width: "5cm", height: "3cm", fontSize: "0.2cm", padding: "0.2cm" }}>

                <Col style={{ textAlign: "left", }} >
                    <div>{productName} </div>
                    <div>Model: {"TLL331041"} </div>
                    <div>Power:{"100-240V AC"} </div>
                    <div>Power Frequency: {"50/60Hz"} </div>
                    <div>Load: {"1000W/gang Max"} </div>
                    <Row>
                        <div style={{ paddingRight: "1cm", height: "2cm", width: "2cm" }}>

                            <QRCode value={item.id}
                                style={{ height: "1cm", width: "1cm", }} />
                        </div>

                        <Col style={{ textAlign: "left", }} >
                            <div>Designed in Egypt</div>
                            <div>Made In Egypt</div>
                            <img style={{ width: "0.5cm", height: "0.5cm" }} src='/ce.png' />
                            <img style={{ width: "0.5cm", height: "0.5cm" }} src='/trash.png' />
                        </Col>
                    </Row>

                </Col>
            </div>

        </center >
    );
};

export default ItemLabel;
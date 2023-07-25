import { toast } from 'react-toastify';

const sendFCMNotification = async (title, body, topic = "allDevices") => {
    console.log("sendFCMNotification");
    const url = 'https://fcm.googleapis.com/fcm/send';
    const serverKey = 'AAAAhkVYSOk:APA91bEDmuFY8z9z_BVEVbFQUfCsZ1Gxoyk46V3-iP7f-f7ZDomUxvso2KEhoNAe8w90Mg_IyCmEdnMJ58TRpBAy8NLvLqNHki3iBZqMAC_a_KQgv4vzLXb5OtaK-vtsvBZ2gGPdHmj3';

    console.log("topic");
    console.log(`/topics/${topic}`);
    const notification = {
        to: `/topics/${topic}`,
        // to: `/topics/allDevices`,
        notification: {
            title: title,
            body: body,
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `key=${serverKey}`,
            },
            body: JSON.stringify(notification),
        });

        if (response.ok) {
            toast('send Notification successfully');
            // Handle the response if needed
        } else {
            console.error('Failed to send FCM notification');
            // Handle the error response if needed
        }
    } catch (error) {
        console.error('Error sending FCM notification:', error);
        // Handle the error if the request fails
    }
};


export default sendFCMNotification;
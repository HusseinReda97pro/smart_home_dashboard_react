import { HomePage } from '../styles/pages';
import firebase from '../firebase';
// const admin = require('firebase-admin');
// import { admin } from 'firebase/compat/firebaseAdmin';
async function test() {
    // const userSnapshot = await firebase.app().auth().;
    // console.log(userSnapshot);
    // // const users = await firebase.auth().listUsers;
    // firebase.auth().listUsers(1000) // lists up to 1000 users
    //     .then((listUsersResult) => {

    //         let users = JSON.stringify(listUsersResult);
    //         console.log(users);

    //         // const date = new Date();
    //         // const day = date.getDate();
    //         // const month = date.getMonth() + 1;

    //         // fs.writeFileSync(__dirname + `/../my-backups/authentication-backup_${day}_${month}_2020.json`, users);
    //     })
    //     .catch(function (error) {
    //         console.log('Oh no! Firebase listUsers Error:', error);
    //     });

}

const Home = () => {

    return (

        <HomePage>

            <div style={{ alignItems: 'baseline;', display: 'flex' }}>
                <img src="/smart_logo.png" alt="logo" width="300" />
                <h6 style={{ marginLeft: '10px;' }}>APP Ads</h6>
            </div>

            {/* <button onClick={test}>
                Test
            </button> */}

        </HomePage>
    )
}



export default Home;
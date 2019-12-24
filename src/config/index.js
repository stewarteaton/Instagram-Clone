import { Dimensions } from 'react-native';

// this helps us prevent having to require each icon when used and all compiled together during bundle
export default {
    images: {
        heartIcon: require('../../assets/heart.png'),
        chatIcon: require('../../assets/chat.png'),
        paperIcon: require('../../assets/paper-plane.png'),
        heartFullIcon: require('../../assets/heartFull.png'),
    },
    styleConstants: {
        rowHeight: 50,
        oneThirdWidth: Dimensions.get('window').width / 3,
    },
    // baseUrl: 'https://us-central1-insta-clone-57141.cloudfunctions.net/api',
    // Test local server
    baseUrl: 'http://localhost:5000/insta-clone-57141/us-central1/api',

};

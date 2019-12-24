
import constants from '../constants';

// export default {
//     userRecieved: (user) => {
//         return {
//             type: constants.USER_RECIEVED,
//             data: user,
//         },
//     }
// }
var userRecieved = (user) => ({
        type: constants.USER_RECIEVED,
        data: user,
});

export default {
    userRecieved,
}
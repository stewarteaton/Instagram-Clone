/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
import config from '../../config';
import axios from 'axios';

export class Profile extends Component {

    constructor(){
        super();
            this.state = {
                profilePics: [],
            };
            this.picWidth = Dimensions.get('window').width / 3;
    }

    componentDidMount(){
        console.log(this.props.state);

        axios.get(config.baseUrl + `/users/${this.props.user.id}/photos`).then((response) => {
            console.log('worked');
            console.log(response.data);
            this.setState({ profilePics: response.data });
            console.log(this.state.profilePics);
          })
          .catch((error) => {
            console.log('did not work');
            console.log(error);
        });
    }

    login(){
        // navigate to main feed by key when clicked
        this.props.navigation.navigate('main');
    }

    render() {
        return (
            <ScrollView>
                <View style={{ height:100 + '%', width:100 + '%', flex:1, justifyContent:'center', alignItems:'center' }}>
                <View style={styles.nav} >
                        <Text >Instagram</Text>
                </View>
                <View style={styles.profileInfo}>
                    <View style={{flexDirection: 'row', width: 100 + '%'}} >
                        <View style={{ flex: 3, height: 100, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={styles.userPic} source={{uri: 'https://www.groundlings.com/img/containers/main/headshots/archive/1537492224_Ferrell,%20Will%20%28PP%29.jpg/3d021391ef63944b7431dfd7959d983e.jpg'}} />
                        </View>
                        <View style={{ flex: 7, height: 100 }}>
                            <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={styles.statColumn}>
                                    <Text>130</Text>
                                    <Text>Posts</Text>
                                </View>
                                <View style={styles.statColumn}>
                                    <Text>2,589</Text>
                                    <Text>Followers</Text>
                                </View>
                                <View style={styles.statColumn}>
                                    <Text>832</Text>
                                    <Text>Following</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', width:100 + '%', justifyContent:'center', alignItems: 'center', flex: 1, backgroundColor: 'grey'}}>
                                <Text>Edit Profile</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', width: 100 + '%', marginTop: 4 + '%'}} >
                        <Text style={styles.fontBold}>Stewart Eaton</Text>
                        <Text style={styles.fontSm}>Buy the ticket, take the ride</Text>
                    </View>
                </View>
                {/* Nave bar above photos */}
                <View style={styles.topNavBar} >
                    <View style={styles.topBarIcon}  />
                    <View style={styles.topBarIcon}  />
                    <View style={styles.topBarIcon}  />
                    <View style={styles.topBarIcon}  />
                </View>
                <View style={{ height: 100 + '%' , width: 100 + '%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style= {styles.profilePicContainer} >
                        {this.state.profilePics.map((pic, i) => {
                            // modify image url to scale picutre to screens size
                            var modifiedURL = pic.picURL.slice(0,49) + 'w_' + this.picWidth + ',c_scale' + pic.picURL.slice(60);
                            return <Image key={pic.picURL} style={styles.profilePicThumb} source={{uri: modifiedURL}} />;
                        })}

                    </View>
                </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    profilePicContainer: {
        width: 100 + '%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profilePicThumb: {
        width: config.styleConstants.oneThirdWidth,
        height: config.styleConstants.oneThirdWidth,
    },
    profileInfo: {
        width: 100 + '%',
        height: 200,
        paddingTop: 4 + '%',
        display: 'flex',
        flexDirection: 'column',
    },
    fontSm: {
        fontSize: 14,
    },
    fontBold: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userPic: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    nav: {
        width: 100 + '%', height: 60, backgroundColor: 'rgb(250,250,250)', marginTop: 40,
        borderBottomColor: 'rgb(220,220,220)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statColumn: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topNavBar: {
        height: config.styleConstants.rowHeight,
        width:100 + '%',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgb(239,239,239)',
        flexDirection: 'row',
    },
    topBarIcon: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: 'red',
        flex: 1,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.account.user,
    }
};

const dispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, dispatchToProps)(Profile);


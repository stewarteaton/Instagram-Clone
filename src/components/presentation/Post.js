/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
// React Native libraries
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from '../../config';

class Post extends Component {

    constructor(){
        super();
        this.state = {
            liked: false,
            screenWidth: Dimensions.get('window').width,
        };
    }
    componentDidMount() {
        // this.setState({
        // })
    }

    likeToggled(){
        this.setState({
            liked: !this.state.liked,
        });
    }

    render(){
        const imageHeight = Math.floor(this.state.screenWidth * 1.1);
        const imageSelection = this.props.item % 2 === 0 ? 'https://res.cloudinary.com/dmgp6exro/image/upload/hvc4mnbekozrc2ih59im.jpg' : 'https://res.cloudinary.com/dmgp6exro/image/upload/v1544298283/oeo8zr9aqgsmfp7ii5bt.jpg';
        const imageUri = imageSelection;
        // heart icon color
        const heartIconColor = (this.state.liked) ? 'rgb(252,61,57)' : null;
        const heartToggleIcon = (this.state.liked) ? config.images.heartFullIcon : config.images.heartIcon;

        return (
            <View style={{ flex: 1, width: 100 + '%'}}>
                <View style={styles.userBar}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{uri:'https://res.cloudinary.com/dmgp6exro/image/upload/v1564460812/profile-pic.jpg'}} style={styles.userPic}/>
                        <Text style={{marginLeft: 10}}>Stewart Eaton</Text>
                    </View>
                    <View style={{alignItems: 'center', marginRight: 10}}>
                        <Text style={{fontSize: 30}}>...</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{ this.likeToggled(); }}  activeOpacity={0.8}>
                    <Image source={{uri: imageUri}} style={{width: this.state.screenWidth, height: imageHeight}} />
                </TouchableOpacity>

                <View style={styles.iconBar}>
                    <Image style={[styles.icon, {height: 35, width:35, tintColor: heartIconColor }]} source={heartToggleIcon} />
                    <Image style={[styles.icon, {height: 34, width:34}]} source={config.images.chatIcon} />
                    <Image style={[styles.icon, {height: 30, width:30}]} source={config.images.paperIcon} />
                </View>
                <View style={styles.iconBar}>
                    <Image style={[styles.icon, {height: 28, width:28}]} source={config.images.heartFullIcon} />
                    <Text >120 Likes</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    nav: {
        width: 100 + '%', height: 60, backgroundColor: 'rgb(250,250,250)', marginTop: 40,
        borderBottomColor: 'rgb(220,220,220)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userBar: {
        width: 100 + '%',
        height: config.styleConstants.rowHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    userPic:{
        height:40,
        width:40,
        borderRadius:50,
    },
    iconBar: {
        height: config.styleConstants.rowHeight,
        width: 100 + '%',
        borderColor: 'rgb(233,233,233)',
        // borderBottomWidth: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        // vertical align
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 5,
    },
    commentBar: {
        height: config.styleConstants.rowHeight,
        width: 100 + '%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
});

export default Post;

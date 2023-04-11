/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, PureComponent } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    Text
} from 'react-native';
import { Constants, PathHelper, Scale, Tools } from 'common';
import FastImage from 'react-native-fast-image';
import { ProgressiveImage } from 'components/UI';
const { width, height } = Dimensions.get('window');

class ImageModule extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            imageWH: {
                width: 10,
                height: 10
            },
            imagesData: [],
            imageRealH: 10
        };
        // this.currency = axiosClient.getCurrency();
    }

    render() {
        let data = this.props.data?.webModuleCollections;
        let parentArray = [];
        // console.log('renderiiiiiing image module ...', data[0].collectionId);

        //  console.log('data::::::::::', this.props.data.webModuleCollections);

        if (data.length >= 1 && data.length < 4) {
            parentArray.push(data);
        }
        else {
            const chunkData = Tools.convertArrayToChunk(data, 2);
            //  console.log('befor parentArray: ', parentArray);
            for (let index = 0; index < chunkData.length; index++) {
                const chunk = chunkData[index];
                let arr = [];
                arr.push(chunk);
                parentArray.push(arr);
            }
            //  console.log('after parentArray: ', parentArray);
        }

        let h = 10;

        const imageurl = PathHelper.getModuleCollectionImagePath(data[0]?.responsiveImageUrl, data[0]?.fkIModuleId, data[0]?.collectionId);
        Image.getSize(imageurl, (widthImg, heightImg) => {
            // setImageWH({
            //     width: widthImg, height: heightImg
            // });
            // this.setState({imagereal})
            // this.state()

            let targetWidth = (width / 2) - Scale.moderateScale(6);

            if (data.length == 1)
                targetWidth = (width) - Scale.moderateScale(6); // substract margin
            else if (data.length == 2)
                targetWidth = (width / 2) - Scale.moderateScale(6);
            else if (data.length == 3)
                targetWidth = (width / 3) - Scale.moderateScale(6);
            else if (data.length == 4)
                targetWidth = (width / 2) - Scale.moderateScale(6);
            else if (data.length == 6)
                targetWidth = (width / 2) - Scale.moderateScale(6);

            h = Tools.getImageHeight(targetWidth, widthImg, heightImg);

            // setImageRealH(h);
            this.setState({ imageRealH: h })

        });

        // setImagesData(parentArray);
        if (this.state.imageRealH == 10) {
            return (
                <></>
            )
        }

        return (
            <View style={styles.moduleWrapper}>
                {
                    parentArray.map((item, index) => {

                        return (
                            <View key={index} style={styles.imageContainer}>
                                {
                                    item.map((item2, index) => {

                                        const imageurl = PathHelper.getModuleCollectionImagePath(item2.responsiveImageUrl, item2?.fkIModuleId, item2?.collectionId);
                                        // if (imageWH.width == 10 && !Array.isArray(item2))
                                        //     Image.getSize(imageurl, (width, height) => { setImageWH({ width: width, height: height }) });
                                        // console.log(imageurl);
                                        return (Array.isArray(item2) ?
                                            item2.map((item3, index) => {
                                                const imageurl2 = PathHelper.getModuleCollectionImagePath(item3.responsiveImageUrl, item3?.fkIModuleId, item3?.collectionId);
                                                // console.log(imageurl2);

                                                // if (imageWH.width == 10)
                                                //     Image.getSize(imageurl2, (width, height) => { setImageWH({ width: width, height: height }) });

                                                return (
                                                    <TouchableOpacity
                                                        // disabled={item3.haveLink != true}
                                                        onPress={() => this.props.onPressItem(item3, Constants.SearchScreenTypes.Module)}
                                                        activeOpacity={0.8}
                                                        style={[styles.imageItemContainer]}
                                                        key={item3?.collectionId}>
                                                        {/* {imageWH != 10 && imageRealH != 10 ? */}
                                                        <ProgressiveImage
                                                            borderRadius={Scale.moderateScale(1)}
                                                            imageStyle={{ width: '100%' }}
                                                            height={this.state.imageRealH}
                                                            source={imageurl2}
                                                            resizeMode={FastImage.resizeMode.contain}
                                                        />
                                                        {/* :
                                                            null} */}

                                                    </TouchableOpacity>
                                                )
                                            })
                                            :
                                            (
                                                <TouchableOpacity
                                                    // disabled={item2.haveLink != true}
                                                    onPress={() => this.props.onPressItem(item2, Constants.SearchScreenTypes.Module)}
                                                    activeOpacity={0.8}
                                                    style={[styles.imageItemContainer]}
                                                    key={item2?.collectionId}>
                                                    {/* {imageWH != 10 && imageRealH != 10 ? */}
                                                    <ProgressiveImage
                                                        borderRadius={Scale.moderateScale(1)}
                                                        imageStyle={{ width: '100%' }}
                                                        height={this.state.imageRealH}
                                                        source={imageurl}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                    />
                                                    {/* :
                                                        null
                                                    } */}
                                                </TouchableOpacity>
                                            )
                                        )
                                    })
                                }
                            </View>)
                    })
                }
            </View>
        );
    }
};


const styles = StyleSheet.create({
    moduleWrapper: {
        flexDirection: "column",
        // backgroundColor: 'blue'
    },
    imageContainer: {
        // backgroundColor: 'red',
        flexDirection: "row",
        // paddingHorizontal: Scale.moderateScale(5)
    },
    imageItemContainer: {
        flex: 1,
        marginHorizontal: Scale.moderateScale(3),
        marginBottom: Scale.moderateScale(10)
    }
});


export default ImageModule;

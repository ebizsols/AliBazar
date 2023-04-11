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
} from 'react-native';
import { Scale } from 'common';

import {
    CategoryCarousel,
    ProductCarousel,
    ImageModule,
    HomeSlider
} from 'components'
import { ShadowWrapper } from 'components/UI';
import axiosClient from 'api/axios';

class ModuleSelection extends PureComponent {
    constructor(props) {
        super(props);
        // this.state = {
        //     counter: 0,
        //     message: 'hello',
        // };
        this.currency = axiosClient.getCurrency();
    }

    // const currency = axiosClient.getCurrency();
    // const [renderModule, setRenderModule] = useState(null);



    onCategoryItemPress = (item, type) => {
        this.props.onCategoryItemPress(item, type);
    }

    onPressSliderItem = (item, type) => {
        this.props.onSliderItemPress(item, type);
    }

    onImageItemPress = (item, type) => {
        this.props.onImageItemPress(item, type);
    }

    onProductItemPress = (item) => {
        this.props.onProductItemPress(item);
    }

    // useEffect(() => {


    // setRenderModule(_renderModule);

    // }, []);

    // shouldComponentUpdate() {
    //     return false
    // }

    render() {
        console.log('Rendering ModuleSelection ...');
        let _renderModule = null;

        if (this.props.data.fkModuleId == 0) {
            if (this.props.data.sliders?.length > 0)
                _renderModule = <HomeSlider onPressItem={this.onPressSliderItem} data={this.props.data} />
        } else if (this.props.data.fkModuleId == 1) {
            _renderModule = <CategoryCarousel onPressItem={this.onCategoryItemPress} data={this.props.data} />
        } else if (this.props.data.fkModuleId == 2) {

            if (this.props.data.webModuleCollections?.length > 0)
                _renderModule = <ShadowWrapper>
                    <ProductCarousel title={this.props.data?.webModuleCollections[0]?.collectionTitle}
                        goods={this.props.data?.webModuleCollections[0]?.goods}
                        currency={this.currency} onPressItem={this.onProductItemPress}
                        data={this.props.data} />
                </ShadowWrapper>
        } else if (this.props.data.fkModuleId == 3 ||
            this.props.data.fkModuleId == 4 ||
            this.props.data.fkModuleId == 5 ||
            this.props.data.fkModuleId == 6 ||
            this.props.data.fkModuleId == 7) {
            console.log('imaggeeeedata', this.props.data)
            _renderModule = <ImageModule onPressItem={this.onImageItemPress} data={this.props.data} />
        }

        return (
            <View style={[styles.moduleWrapper, { marginBottom: this.props.data.moduleType == 3 ? 0 : Scale.verticalScale(10) }]}>
                {_renderModule}
            </View>
        );
    }
}

export default ModuleSelection;

const styles = StyleSheet.create({
    moduleWrapper: {
        marginBottom: Scale.verticalScale(10)
    }
});

// const data =
// {
//     "discountAmount": 0,
//     "discountPercentage": 0,
//     "finalPrice": 1000,
//     "goodsId": 11,
//     "goodsImage": "6a4343ec-9245-4f1a-93ee-209b40c8e6c3.jpg",
//     "goodsLiked": true,
//     "haveVariation": true,
//     "inCart": false,
//     "inventoryCount": 12,
//     "likedCount": 1,
//     "price": 1000,
//     "providerId": 10,
//     "saleWithCall": false,
//     "shippingPossibilities": true,
//     "surveyCount": 5,
//     "surveyScore": 3,
//     "title": "iphone 11"
// }
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ScrollView
} from 'react-native';
import HTML from "react-native-render-html";
import { clientHome } from 'api/client';

import { Languages, Scale } from 'common'
import { Colors, Typography } from 'styles';
import LottieView from 'lottie-react-native';
import CloseIcon from 'assets/icons/close-gray.svg';
import { RequestLoader } from 'components/UI';

const SpecificationsScreen = props => {

    const [specifications, setSpecifications] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { goodsId } = props.route?.params;

    const getGoodsSpecifications = () => {
        setIsLoading(true);
        clientHome.getGoodsSpecifications(goodsId)
            .then((response) => {
                const res = response.data;
                console.log(res.result);
                // res.result[0].specification[0].tGoodsSpecification.push({
                //     "gsid": 60,
                //     "fkGoodsId": 11,
                //     "fkSpecId": 12,
                //     "specValueText": "extra",
                //     "tGoodsSpecificationOptions": []
                // })
                // res.result[1].specification[0].tGoodsSpecification.push({
                //     "gsid": 60,
                //     "fkGoodsId": 11,
                //     "fkSpecId": 12,
                //     "specValueText": null,
                //     "tGoodsSpecificationOptions": [{
                //         fkGsid: 63,
                //         fkSpecOptionId: 2,
                //         optionTitle: "op3",
                //         specOptionId: 4
                //     }]
                // })
                // res.result[1].specification[0].tGoodsSpecification[0].tGoodsSpecificationOptions.push({
                //     fkGsid: 65,
                //     fkSpecOptionId: 2,
                //     optionTitle: "op2",
                //     specOptionId: 4
                // })
                setIsLoading(false);
                // console.log(res.result[1].specification[0].tGoodsSpecification[0].tGoodsSpecificationOptions);
                setSpecifications(res.result);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getGoodsSpecifications();
    }, []);

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <View style={styles.container} >
                <ScrollView style={styles.contentScrollView}>
                    <View style={styles.closeContainer}>
                        <Text style={styles.title}>{Languages.GoodsDetail.Specifications}</Text>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.closeIconWrapper}>
                            <CloseIcon
                                width={Scale.moderateScale(30)}
                                height={Scale.moderateScale(30)}
                            />
                        </TouchableOpacity>
                    </View>

                    {specifications?.map((spec, index) => {

                        return (
                            <>
                                <View style={styles.specGroupContainer}>
                                    <View style={styles.specGroupCircle}></View>
                                    <Text style={styles.specGroupText}>{spec.specGroupTitle}</Text>
                                </View>
                                {
                                    spec.specification?.map((specification, index) => {


                                        return (
                                            <View style={[styles.specContainer]} key={specification.specIdF}>
                                                <View style={styles.specTitleContainer}>
                                                    <View style={styles.specTitleWrapper}>
                                                        <Text style={styles.specTitleText}>{specification.specTitle}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.specValueContainer}>
                                                    {specification.tGoodsSpecification.map((item, index2) => {
                                                        if (item.specValueText) {
                                                            return (
                                                                <View style={[styles.specItemValueTextsContainer, index2 > 0 ? { marginTop: Scale.moderateScale(5) } : {}]}>
                                                                    <Text style={styles.specValueText}>{item.specValueText}</Text>
                                                                </View>
                                                            )
                                                        }
                                                        else {
                                                            return (
                                                                <View style={[
                                                                    styles.specItemValueTextsContainer,
                                                                    styles.specItemValueOptions, index > 0 || index2 > 0 ? { marginTop: Scale.moderateScale(5) } : {},
                                                                ]}>
                                                                    {item.tGoodsSpecificationOptions.map((specOption, index3) => {
                                                                        return (
                                                                            <Text style={[styles.specValueText]}>
                                                                                {specOption.optionTitle}
                                                                                {item.tGoodsSpecificationOptions.length - 1 == index3 ? '' : ', '}
                                                                            </Text>
                                                                        )
                                                                    })}
                                                                </View>
                                                            )
                                                        }
                                                    })}
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </>
                        )
                    })}
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        flex: 1,
        paddingVertical: Scale.moderateScale(20)
    },
    title: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    contentScrollView: {

    },
    specContainer: {
        // flexDirection: "row",
        paddingHorizontal: Scale.moderateScale(20),
        paddingVertical: Scale.moderateScale(2),
        // marginTop: Scale.moderateScale(5)
    },
    specTitleContainer: {
        flex: 1,
        paddingRight: Scale.moderateScale(2)
    },
    specTitleWrapper: {
        // backgroundColor: '#F4F4F4',
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(5),
        borderRadius: Scale.moderateScale(5)
    },
    specValueContainer: {
        flex: 1,
        paddingLeft: Scale.moderateScale(1)
        // flexDirection: "row"
        // alignItems: "flex-end"
    },
    specTitleText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        textAlign: "left"
    },
    specItemValueTextsContainer: {
        backgroundColor: '#F4F4F4',
        paddingVertical: Scale.moderateScale(10),
        paddingHorizontal: Scale.moderateScale(5),
        borderRadius: Scale.moderateScale(5),
        textAlign: "left",
        // alignItems: "flex
        // justifyContent: "center",
        flexDirection: "row",
        flexWrap: 'wrap'
    },
    specItemValueOptions: {
        flexDirection: 'row'
    },
    specValueText: {
        alignItems: "flex-end",
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    evenStyle: {
        backgroundColor: Colors.WHITE
    },
    oddStyle: {
        backgroundColor: '#F4F4F4'
    },
    specGroupContainer: {
        paddingHorizontal: Scale.moderateScale(20),
        marginTop: Scale.moderateScale(15),
        marginBottom: Scale.moderateScale(0),
        flexDirection: "row",
        alignItems: "center"
    },
    specGroupText: {
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    specGroupCircle: {
        backgroundColor: '#f0b440',
        width: Scale.moderateScale(11),
        height: Scale.moderateScale(11),
        borderRadius: Scale.moderateScale(10),
        marginRight: Scale.moderateScale(8)
    },
    //
    closeContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row',
        paddingTop: Scale.moderateScale(8),
        marginBottom: Scale.moderateScale(25),
        paddingHorizontal: Scale.moderateScale(15)
    },
    closeIconWrapper: {

    },
});

export default SpecificationsScreen;
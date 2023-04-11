/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState, useRef, useCallback, useReducer } from 'react';
import {
    View,
    FlatList,
    Platform,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Animated as ReactAnimated,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import {
    clientAuth,
    clientForm,
    clientProfile,
    clientUserOrder
} from 'api/client';
import {
    ModuleSelection,
    HomeHeader,
    AddressesHeader,
    BottomSheetHeader,
    BottomSheetBackView,
    CommonHeader
} from 'components';
import {
    IconRow,
    ShadowWrapper,
    MainInput,
    MainButton,
    SnackBar,
    RequestLoader,
    ProductItemSec,
    TextWithRadio,
    FloatButtonWrapper,
    DropdownPickerInput
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";

import OfficeIcon from 'assets/icons/office.svg';
import MenuIcon from 'assets/icons/dots-menu.svg';
import ArrowIcon from 'assets/icons/up-arrow.svg';
import CloseBlackIcon from 'assets/icons/close-black.svg';
import { CommonActions } from '@react-navigation/native';
import PlusIcon from 'assets/icons/plus.svg';
import CloseIcon from 'assets/icons/close-gray.svg';
import RequestAddressItem from './RequestAddressItem';
import LogoIcon from 'assets/icons/logo-white.svg';
import Animated from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import AddresssWithRadio from './AddresssWithRadio';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const ReturnsRequestSecondStepScreen = (props) => {

    const [addresses, setAddresses] = useState([{ isPrimary: true }, { isPrimary: false }]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReason, setSelectedReason] = useState(null);
    const [selectedReturningActionId, setSelectedReturningActionId] = useState(null);
    const [quantityOption, setQuantityOption] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(null);
    const [firstAddress, setFirstAddresses] = useState([{ isPrimary: true }]);
    const [reasons, setReasons] = useState([]);
    const [retrunGoodsItem, setRetrunGoodsItem] = useState(null);
    const [returningActions, setReturningActions] = useState([]);
    const [showCollapse, setShowCollapse] = useState(false);
    const _animatedRotate = useRef(new ReactAnimated.Value(showCollapse ? 1 : 0)).current;
    const [formSubmitted, setFormSubmitted] = useState(false);
    const snackBarRef = useRef(null);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            comment: null
        },
        inputValidities: {
            comment: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    const { itemId } = props.route.params;

    const currency = axiosClient.getCurrency();

    useEffect(() => {
        ReactAnimated.timing(_animatedRotate, {
            toValue: (showCollapse) ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [showCollapse]);

    useEffect(() => {
        getProfileProductReturned(itemId);
        getReturningReason();
        getReturningAction();
        // setDropQuanyityOPtions();
        // setSelectedQuantity(item.quantity);
    }, []);

    const setDropQuanyityOPtions = () => {
        let options = [];
        for (let index = 0; index < item.quantity; index++) {
            console.log(index);
            const model = {
                id: index + 1,
                title: (index + 1).toString()
            }
            options.unshift(model);
        }
        setQuantityOption(options)
    };

    const getProfileProductReturned = (orderItemId) => {
        setIsLoading(true);
        clientProfile.getProfileProductReturned(orderItemId)
            .then((response) => {
                const res = response.data;
                console.log(res.result);
                setIsLoading(false);
                setRetrunGoodsItem(res.result);
            }).catch((err) => {
                setIsLoading(false);
                console.log('err', err);
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const getReturningReason = () => {
        setIsLoading(true);
        clientForm.getReturningReason()
            .then((response) => {
                // {
                //     reasonId: 6
                //     reasonTitle: "Lorem Ipsum is simply dummy text"
                //     returnCondition: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                // }
                const res = response.data;
                console.log(res.result);
                setIsLoading(false);
                setReasons(res.result);
            }).catch((err) => {
                setIsLoading(false);
                console.log('err', err);
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const getReturningAction = () => {
        setIsLoading(true);
        clientForm.getReturningAction()
            .then((response) => {
                // {
                //     returningTypeId: number;
                //     returningTypeTitle: string;
                // }
                const res = response.data;
                console.log(res.result);
                setIsLoading(false);
                setReturningActions(res.result);
                if (res.result?.length > 0)
                    setSelectedReturningActionId(res.result[0].returningTypeId);
            }).catch((err) => {
                setIsLoading(false);
                console.log('err', err);
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const onReasonChange = (value, index) => {
        const findReasonIndex = reasons?.findIndex(x => x.reasonId == value);

        if (findReasonIndex !== -1) {
            setSelectedReason(reasons[findReasonIndex]);
        } else {
            setSelectedQuantity(null);
        }
    }

    const changeReturningActionType = (returningTypeId) => {
        setSelectedReturningActionId(returningTypeId);
    }

    const onQuantityChange = (value, index) => {
        setSelectedQuantity(value)
    }

    const returnOrder = () => {
        setIsLoading(true);
        clientUserOrder.returnOrder(itemId, selectedReason.reasonId, selectedReturningActionId, formState.inputValues.comment, selectedQuantity)
            .then((response) => {
                const res = response.data;
                console.log(res.result);
                Keyboard.dismiss();
                props.navigation.navigate('Returns', { screen: 'ReturnsRequsted', params: { fireChange: Math.random() + 1 } })
            }).catch((err) => {
                setIsLoading(false);
                console.log('err', err);
                Keyboard.dismiss();
                console.log(err.response?.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const rotateStyle = {
        transform: [
            {
                rotate: _animatedRotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '0deg'],
                }),
            }
        ]
    };

    const submitHandler = () => {
        if (!formSubmitted) {
            setFormSubmitted(true);
        }

        if (!formState.formIsValid) {
            console.log('error', formState.inputValidities);
            return;
        }

        if (selectedReason == null || selectedReturningActionId == null) {
            return;
        }
        

        returnOrder();
    };

    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <CommonHeader onPressBack={() => props.navigation.goBack()} title={Languages.Returns.ReturnsRequest} showBackIcon={true} />

            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
                enabled={Platform.OS == 'ios'}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        style={styles.container}>

                        <View style={styles.screenPadding}>
                            <View style={styles.productContainer}>
                                {retrunGoodsItem && (
                                    <ProductItemSec
                                        titleTextStyle={styles.productTitleText}
                                        modelNumber={retrunGoodsItem?.modelNumber}
                                        data={retrunGoodsItem}
                                        title={retrunGoodsItem?.title}
                                        showItemCount={true}
                                        itemCount={retrunGoodsItem?.quantity}
                                        // showMarketOrExpress={item.method == 1} // true market, false express, null dont't show
                                        currency={currency}
                                        provider={retrunGoodsItem?.shopName}
                                        showPrice={retrunGoodsItem?.totalPrice}
                                        discountPercent={retrunGoodsItem?.discountPercent}
                                        discountAmount={retrunGoodsItem?.discountAmount}
                                        offLineLabelPrice={retrunGoodsItem?.unitPrice * retrunGoodsItem?.quantity}
                                    />
                                )}
                            </View>

                            <View style={styles.inputContainer}>
                                <DropdownPickerInput
                                    selectedValue={selectedReason ? selectedReason.reasonId : null}
                                    // enabled={false}
                                    // showRequireStart={true}
                                    formSubmitted={formSubmitted}
                                    showLabel={true}
                                    lableText={Languages.InputLabels.WhyReturnItem}
                                    required={true}
                                    placeholder={Languages.Placeholder.SelectReason}
                                    items={reasons}
                                    itemTitle={'reasonTitle'}
                                    itemValue={'reasonId'}
                                    onValueChange={onReasonChange}
                                />
                            </View>

                            {selectedReason && (
                                <View style={styles.commentHintCotnainer}>
                                    <View style={styles.commentHintWrapper}>
                                        <Text style={styles.commentHintText}>{selectedReason?.returnCondition}</Text>
                                    </View>
                                </View>
                            )}

                            <View style={styles.commentInputContainer}>
                                <MainInput
                                    showLabel={false}
                                    inputStyle={styles.commentInputStyle}
                                    placeholder={Languages.Placeholder.TypeDescriptionAboutItem}
                                    id="comment"
                                    initialValue={''}
                                    // maxLength={50}
                                    multiline={true}
                                    editable={true}
                                    required={true}
                                    enableRealTimeTextChangeListener={true}
                                    onInputChange={inputChangeHandler}
                                    formSubmitted={formSubmitted}
                                />
                            </View>

                            <View style={styles.radiosContainer}>
                                <Text style={styles.radioTitleText}>{Languages.Returns.ChooseRequestType}</Text>
                                {returningActions?.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => changeReturningActionType(item.returningTypeId)} key={item.returningTypeId} style={styles.radioWrapper}>
                                            <TextWithRadio
                                                onPress={() => changeReturningActionType(item.returningTypeId)}
                                                isSelected={selectedReturningActionId == item.returningTypeId}
                                                containerStyle={styles.radioContainerStyle}
                                                textStyle={styles.radioText}
                                                title={item.returningTypeTitle} />
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                        </View>

                        {/* // Todo bind this. */}
                        {/* <View style={[styles.refundCotnainer, styles.screenPadding]}>
                        <View style={styles.refundCotnainer}>
                            <View style={styles.rowContainer}>
                                <View style={styles.iconContainer}>
                                    <LogoIcon
                                        width={Scale.moderateScale(40)}
                                        height={Scale.moderateScale(30)}
                                    />
                                </View>
                                <Text style={styles.rowText}>Refund to Wallet</Text>
                            </View>
                            <Text style={styles.rowBottomText}>The amount of returned or canceled purchases will be refunded to your wallet</Text>
                        </View>
                    </View> */}

                        <View style={[styles.refundCotnainer, styles.screenPadding]}></View>

                    </ScrollView>
                </View>

                <FloatButtonWrapper>
                    <MainButton onPress={submitHandler}>
                        {Languages.Common.SubmitRequest}
                    </MainButton>
                </FloatButtonWrapper>
            </KeyboardAvoidingView>

            <SnackBar
                ref={snackBarRef}
            />
        </>
    );
};

const styles = StyleSheet.create({

    //
    container: {
        backgroundColor: Colors.WHITE,
        // flex: 1,
        // flexGrow: 1,
        // flexShrink: 1,
        // height: "100%",
        // minHeight: '100%',
        paddingVertical: Scale.moderateScale(10),
        // paddingBottom: Scale.moderateScale(50),
        // marginBottom: Scale.moderateScale(100)
    },
    screenPadding: {
        paddingHorizontal: Scale.moderateScale(20),
    },
    productTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    itemLine: {
        height: Scale.moderateScale(1.5),
        width: '100%',
        alignSelf: "center",
        backgroundColor: Colors.GALLERY,
        borderRadius: Scale.moderateScale(3)
    },
    body: {

    },
    productContainer: {
        marginTop: Scale.moderateScale(20)
    },
    //
    inputContainer: {
        marginBottom: Scale.moderateScale(10),
        marginTop: Scale.moderateScale(5)
    },
    //
    commentInputContainer: {

    },
    commentInputStyle: {
        height: Scale.moderateScale(150),
        textAlignVertical: "top",
    },
    //
    commentHintCotnainer: {
        minHeight: Scale.moderateScale(30)
    },
    commentHintWrapper: {
        backgroundColor: Colors.ALABASTER,
        paddingHorizontal: Scale.moderateScale(8),
        paddingVertical: Scale.moderateScale(8),
        marginVertical: Scale.moderateScale(12),
        borderRadius: Scale.moderateScale(5)
    },
    commentHintText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        lineHeight: Scale.moderateScale(18),
        textAlign: 'left'
    },
    //
    radiosContainer: {

    },
    radioTitleText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(5),
        marginTop: Scale.moderateScale(15),
        textAlign: 'left'
    },
    radioWrapper: {

    },
    radioContainerStyle: {
        paddingVertical: Scale.moderateScale(7)
    },
    radioText: {
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        fontSize: Typography.FONT_SIZE_16,
        color: Colors.BIGSTONE
    },
    //
    refundCotnainer: {
        backgroundColor: Colors.ALABASTER,
        paddingVertical: Scale.moderateScale(12),
        // marginVertical: Scale.moderateScale(10)
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: Colors.BIGSTONE,
        justifyContent: "center",
        alignItems: "center",
        width: Scale.moderateScale(50),
        borderRadius: Scale.moderateScale(5),
        marginRight: Scale.moderateScale(10)
    },
    rowText: {
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    rowBottomText: {
        marginTop: Scale.moderateScale(8),
        color: Colors.FIORD,
        fontSize: Typography.FONT_SIZE_14,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
    //
    shipToText: {
        marginTop: Scale.moderateScale(8),
        marginBottom: Scale.moderateScale(15),
        color: Colors.BIGSTONE,
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect()
    },
    addressWrapper: {
        paddingVertical: Scale.moderateScale(20),
        // backgroundColor: 'red'
    },
    otherOfferContainer: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: Scale.moderateScale(5),
        flexDirection: "row",
        marginTop: Scale.moderateScale(15),

    },
    otherOfferText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.FIORD,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        marginRight: Scale.moderateScale(10)
    },
    lessText: {
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.LOCHMARA,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect()
    },
});


export default ReturnsRequestSecondStepScreen;


const reasonsData = [
    {
        reasonId: 1,
        reasonTitle: 'bad product',
        returnCondition: 'dsfdsfss'
    }
]
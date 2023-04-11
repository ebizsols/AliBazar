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
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import {
    clientAuth,
    clientProfile,
    clientUserActivity
} from 'api/client';
import {
    ModuleSelection,
    HomeHeader,
    AddressesHeader,
    BottomSheetHeader,
    BottomSheetBackView
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
    ScreenLoader
} from 'components/UI';
import { Languages, Scale, Constants, Tools } from 'common';
import { Colors, Typography } from 'styles';
import axiosClient from "api/axios";
import { DeviceStorage } from "services";


import CloseIcon from 'assets/icons/close-gray.svg';
import StarRating from 'react-native-star-rating';
import MultiAddInput from './MultiAddInput';

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

const ReviewProductScreen = (props) => {

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            comment: null
        },
        inputValidities: {
            comment: false
        },
        formIsValid: false
    });

    const snackBarRef = useRef(null);

    const currency = axiosClient.getCurrency();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [lockScreen, setLockScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [goodsComment, setGoodsComment] = useState(null);
    const [prosItems, setProsItems] = useState([]);
    const [consItems, setConsItems] = useState([]);

    const { goodsId, orderItemId } = props.route.params;

    const rateChange = (rating) => {
        // setRate(rating);
        setGoodsComment((prev) => ({
            ...prev,
            comment: {
                ...prev.comment,
                reviewPoint: rating
            }
        }))
    }

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

    const getCustomerGoodsComment = () => {
        setIsLoading(true);
        clientUserActivity.getCustomerGoodsComment(goodsId, orderItemId)
            .then((response) => {
                const res = response.data;
                setIsLoading(false);

                inputChangeHandler('comment', res.result?.comment?.commentText, true);
                // setGoodsComment(res.result);
                // setGoodsComment({
                //     goods: {
                //         goodsId: 12,
                //         title: 'iphone',
                //         image: 'dfdfdfs',
                //         category: 'category',
                //         brand: 'brand',
                //         serialNumber: '322dfnNOFODJF',
                //         categoryId: 10,
                //         haveVariation: false,
                //         saleWithCall: false,
                //         shopName: "shop name"
                //     },
                //     comment: {
                //         commentId: 1,
                //         commentText: null,
                //         commentDate: null,
                //         customerName: null,
                //         shopName: 'shop name',
                //         customerId: 0,
                //         orderItemId: 0,
                //         likeCount: 0,
                //         reviewPoint: 0,
                //         isAccepted: true,
                //         goodsCommentPoints: [
                //             // {
                //             //   pointId: 2,
                //             //   fkCommentId: 32,
                //             //   pointText: 'color',
                //             //   pointType: true
                //             // },
                //             // {
                //             //   pointId: 2,
                //             //   fkCommentId: 32,
                //             //   pointText: 'color 3',
                //             //   pointType: false
                //             // }
                //         ],
                //         shopSurveyAnswers: [
                //             // {
                //             //   ansId: 32,
                //             //   fkCommentId: 3,
                //             //   fkQuestionId: 4,
                //             //   fkCustomerId: 4,
                //             //   fkShopId: 4,
                //             //   ansValue: 4
                //             // }
                //         ]
                //     },
                //     questions: [
                //         {
                //             queId: 4,
                //             status: true,
                //             questionText: 'How are you?'
                //         },
                //         {
                //             queId: 4,
                //             status: true,
                //             questionText: 'How are you?'
                //         }
                //     ]
                // });
                setGoodsComment(res.result);

                const filterConsItems = res.result.comment.goodsCommentPoints?.filter(x => x.pointType == false);
                const filterProsItems = res.result.comment.goodsCommentPoints?.filter(x => x.pointType == true);
                if (res.result?.comment?.reviewPoint && res.result?.comment?.reviewPoint > 0) {
                    setLockScreen(true);
                };
                setConsItems(filterConsItems);
                setProsItems(filterProsItems);

            }).catch((err) => {
                setIsLoading(false)
                console.log('err', err.response.data);
                if (err.response?.data?.message)
                    snackBarRef.current.show(err.response?.data?.message, 2);
            });
    };

    const handleQuestionStarClick = (value, item) => {
        // if (this.state.lockPage)
        //   return;

        // console.log(value);
        const model = {
            ansId: 0,
            fkCommentId: 0,
            fkQuestionId: item.queId,
            fkCustomerId: 0,
            fkShopId: 0,
            ansValue: value
        }

        const findAnswerIndex = goodsComment?.comment?.shopSurveyAnswers?.findIndex(x => x.fkQuestionId == item.queId);
        if (findAnswerIndex != -1 && findAnswerIndex != undefined) {
            // answer exist edit value
            const answers = Array.isArray(goodsComment?.comment.shopSurveyAnswers) ? [...goodsComment?.comment.shopSurveyAnswers] : [];
            answers[findAnswerIndex].ansValue = value;

            setGoodsComment((prev) => ({
                ...prev,
                comment: {
                    ...prev.comment,
                    shopSurveyAnswers: answers
                }
            }));
        } else {
            // add new answer
            let answers = []
            if (goodsComment?.comment?.shopSurveyAnswers) {
                answers = [...goodsComment?.comment.shopSurveyAnswers];
            } else {

            }

            answers.push(model);

            setGoodsComment((prev) => ({
                ...prev,
                comment: {
                    ...prev.comment,
                    shopSurveyAnswers: answers
                }
            }));
        }
    };

    const handleAddClick = (text, pointType) => {
        // if (this.state.lockPage)
        //   return;

        const model = {
            pointId: 0,
            fkCommentId: 0,
            pointText: text,
            pointType: pointType
        }

        if (pointType == true) {
            // add pros
            let points = Array.isArray(prosItems) ? [...prosItems] : [];
            points.push(model);

            setProsItems(points);
        } else {
            // add const
            let points = Array.isArray(consItems) ? [...consItems] : [];
            points.push(model);

            setConsItems(points);
        }
    };

    const handleCloseClick = (index, pointType) => {
        // if (this.state.lockPage)
        //     return;
        if (pointType == true) {
            // delete pros
            const newProsItems = [...prosItems];
            newProsItems.splice(index, 1);
            // this.setState({ prosItems: prosItems });
            setProsItems(newProsItems);
        } else {
            // delete cons
            const newConsItems = [...consItems];
            newConsItems.splice(index, 1);
            // this.setState({ consItems: consItems });
            setConsItems(newConsItems);
        }
    };

    const submitHandler = useCallback(async () => {
        if (!formSubmitted) {
            setFormSubmitted(true);
        }

        if (!formState.formIsValid) {
            console.log('error', formState.inputValidities);
            return;
        }
        submitReview();
    }, [formState, goodsComment, prosItems, consItems]);

    const submitReview = () => {
        // if (this.state.lockPage)
        //     return;
        if (goodsComment?.comment?.reviewPoint == 0) {
            snackBarRef.current.show(Languages.Order.PleaseRateProduct, 2)
            return;
        }

        setIsLoading(true);
        const model = {
            commentId: goodsComment?.comment?.commentId || 0,
            commentText: formState.inputValues.comment || goodsComment?.comment?.commentText,
            commentDate: null,
            customerName: null,
            customerId: 0,
            orderItemId: orderItemId,
            likeCount: 0,
            reviewPoint: goodsComment?.comment.reviewPoint,
            isAccepted: null,

            tGoodsCommentPoints: [],
            shopSurveyAnswers: []
        };

        const surveyAnswers = [];

        for (let index = 0; index < goodsComment?.comment.shopSurveyAnswers?.length; index++) {
            const element = goodsComment?.comment.shopSurveyAnswers[index];
            const surveyModel = {
                ansId: 0,
                fkCommentId: 0,
                fkQuestionId: element.fkQuestionId,
                fkCustomerId: 0,
                fkShopId: 0,
                ansValue: element.ansValue,
                fkOrderItemId: orderItemId
            };

            surveyAnswers.push(surveyModel);
        }
        model.shopSurveyAnswers = surveyAnswers;

        const allPoints = prosItems?.concat(consItems);

        model.tGoodsCommentPoints = allPoints;

        console.log(model);

        try {
            clientUserActivity.addCustomerGoodsComment(model)
                .then((response) => {
                    const res = response.data;
                    setIsLoading(false);
                    setLockScreen(true);
                    Keyboard.dismiss();
                    if (res?.message)
                        snackBarRef.current.show(res?.message, 1);
                }).catch((err) => {
                    Keyboard.dismiss();
                    setIsLoading(false);
                    console.log('err', err.response.data);
                    if (err.response?.data?.message)
                        snackBarRef.current.show(err.response?.data?.message, 2);
                });
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCustomerGoodsComment();
    }, []);

    if (goodsComment == null) {
        return <ScreenLoader />
    }
    return (
        <>
            {isLoading == true ? <RequestLoader /> : null}

            <KeyboardAvoidingView
                behavior={'padding'}
                style={{ flex: 1 }}
                enabled={Platform.OS == 'ios'}>
                <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{Languages.Order.RateProduct}</Text>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={styles.headerIconContainer}>
                            <CloseIcon
                                width={Scale.moderateScale(25)}
                                height={Scale.moderateScale(25)}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.productContainer}>
                            <ProductItemSec
                                data={goodsComment?.goods}
                                modelNumber={goodsComment?.goods?.serialNumber}
                                titleTextStyle={styles.productTitleText}
                                title={goodsComment?.goods.title}
                                displayPrice={false}
                                image={goodsComment?.goods.image}
                                goodsId={goodsComment?.goods.goodsId}
                                showPrice={null}
                                discountPercent={0}
                                discountAmount={0}
                                provider={goodsComment?.goods.shopName}
                                offLineLabelPrice={0}
                                currency={currency}
                            />
                        </View>

                        <View style={styles.itemLine}></View>

                        <View style={styles.rateSection}>
                            <Text style={styles.rateText}>{Languages.Order.PleaseRateProduct}</Text>
                            <View style={styles.starsContainer}>
                                <StarRating
                                    disabled={lockScreen}
                                    animation={"jello"}
                                    activeOpacity={0.4}
                                    buttonStyle={styles.starItemContainer}
                                    emptyStar={require('./../../../assets/icons/star-gray.png')}
                                    fullStar={require('./../../../assets/icons/star-yellow.png')}
                                    halfStar={'ios-star-half'}
                                    iconSet={'Ionicons'}
                                    maxStars={5}
                                    rating={goodsComment?.comment?.reviewPoint}
                                    selectedStar={(rating) => rateChange(rating)}
                                />
                            </View>
                        </View>

                        <View style={styles.commentInputContainer}>
                            <MainInput
                                inputStyle={styles.commentInputStyle}
                                placeholder={Languages.Placeholder.TypeYourCommentHere}
                                id="comment"
                                initialValue={formState.inputValues.comment}
                                maxLength={40000}
                                editable={!lockScreen}
                                required={true}
                                multiline={true}
                                // showRequireStart={true}
                                enableRealTimeTextChangeListener={true}
                                onInputChange={inputChangeHandler}
                                formSubmitted={formSubmitted}
                            />
                        </View>

                        <MultiAddInput
                            disabled={lockScreen}
                            itemColor={Colors.SHAMROCK}
                            itemBgColor="#f0fdf4"
                            label={Languages.Order.Pros}
                            handleAddClick={(text) => handleAddClick(text, true)}
                            handleCloseClick={(index) => handleCloseClick(index, true)}
                            items={prosItems}
                            placeholder={Languages.Placeholder.EnterProductPros}
                        />

                        <MultiAddInput
                            disabled={lockScreen}
                            itemColor={Colors.JAFFA}
                            itemBgColor="#FEF0EB"
                            label={Languages.Order.Cons}
                            handleAddClick={(text) => handleAddClick(text, false)}
                            handleCloseClick={(index) => handleCloseClick(index, false)}
                            items={consItems}
                            placeholder={Languages.Placeholder.EnterProductCons}
                        />


                        <View style={styles.questionsSection}>
                            {goodsComment?.questions?.map((item, index) => {
                                let rateValue = null;
                                const findAnswerIndex = goodsComment?.comment?.shopSurveyAnswers?.findIndex(x => x.fkQuestionId == item.queId);
                                if (findAnswerIndex != -1 && findAnswerIndex != undefined) {
                                    rateValue = goodsComment?.comment?.shopSurveyAnswers[findAnswerIndex]?.ansValue;
                                }

                                return (
                                    <View style={styles.questionContainer}>
                                        <Text style={styles.questionText}>{item.questionText}</Text>
                                        <View style={styles.questionReadios}>
                                            <View style={styles.questionStarWrapper}>
                                                <StarRating
                                                    disabled={lockScreen}
                                                    animation={"jello"}
                                                    activeOpacity={0.4}
                                                    buttonStyle={styles.starItemContainer}
                                                    emptyStar={require('./../../../assets/icons/star-gray.png')}
                                                    fullStar={require('./../../../assets/icons/star-yellow.png')}
                                                    halfStar={'ios-star-half'}
                                                    iconSet={'Ionicons'}
                                                    maxStars={5}
                                                    starSize={25}
                                                    rating={rateValue}
                                                    selectedStar={(rating) => handleQuestionStarClick(rating, item)}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>

                    </View>
                </ScrollView>

                <FloatButtonWrapper>
                    <MainButton disabled={lockScreen} onPress={submitHandler}>
                        {lockScreen == true ?
                            Languages.Order.YouAlreadyReviewed
                            :
                            Languages.Order.SubmitReview
                        }
                    </MainButton>
                </FloatButtonWrapper>

            </KeyboardAvoidingView>

            <SnackBar
                // closeText={Languages.Common.Close}
                ref={snackBarRef}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        // flex: 1,
        paddingVertical: Scale.moderateScale(10),
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: Scale.moderateScale(15)
    },
    headerText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVABOLDSelect(),
        color: Colors.BIGSTONE
    },
    headerIconContainer: {

    },
    body: {

    },
    productContainer: {
        marginTop: Scale.moderateScale(20)
    },
    rateSection: {
        marginTop: Scale.moderateScale(40),
        justifyContent: "center",
        alignItems: "center",
    },
    rateText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE,
        marginBottom: Scale.moderateScale(15)
    },
    starContainer: {

    },
    starItemContainer: {
        marginRight: Scale.moderateScale(10)
    },
    commentInputContainer: {

    },
    commentInputStyle: {
        height: Scale.moderateScale(150),
        textAlignVertical: "top",
    },
    //
    questionsSection: {
        marginTop: Scale.moderateScale(20),
        marginBottom: Scale.moderateScale(20)
    },
    questionContainer: {

    },
    questionText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE,
        textAlign: 'left'
    },
    questionReadios: {
        flexDirection: "row",
    },
    questionStarWrapper: {
        marginRight: Scale.moderateScale(45)
    },
    radioText: {
        fontSize: Typography.FONT_SIZE_16,
        fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect(),
        color: Colors.BIGSTONE,
    }
});

export default ReviewProductScreen;
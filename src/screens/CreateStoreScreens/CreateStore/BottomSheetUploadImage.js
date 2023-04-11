import React, { } from 'react';
import {
    View,
    Text,
    TouchableOpacity as ReactNativeTouchableOpacity
} from 'react-native';
import { Scale, Languages } from "common";
import { Colors, Typography } from "styles";


import GalleryIcon from 'assets/icons/gallery.svg';
import TakePhotoIcon from 'assets/icons/take-photo.svg';

const BottomSheetUploadImage = (props) => {
    return (
        /* render */
        <View style={{ width: '100%', backgroundColor: '#fff', height: '100%', paddingHorizontal: Scale.moderateScale(20) }}>
            <ReactNativeTouchableOpacity onPress={() => props.onTakePhotoPress()}>
                <View style={{ paddingVertical: Scale.moderateScale(15) }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: Scale.moderateScale(15), alignItems: "center" }}>
                        <View>
                            <TakePhotoIcon width={Scale.moderateScale(22)} height={Scale.moderateScale(22)} />
                        </View>
                        <View style={{ marginLeft: Scale.moderateScale(20) }}>
                            <Text style={{ color: Colors.FIORD, fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect() }}>{Languages.Common.TakePhoto}</Text>
                        </View>
                    </View>
                </View>
            </ReactNativeTouchableOpacity>
            <View style={{
                height: Scale.moderateScale(1.5),
                width: '92%',
                alignSelf: "center",
                backgroundColor: Colors.GALLERY,
                borderRadius: Scale.moderateScale(3)
            }}></View>
            {/* <Divider color={'#E0E0E0'} marginTop={Scale.moderateScale(0)} marginLeft={Scale.moderateScale(0)} marginRight={Scale.moderateScale(10)} marginBottom={Scale.moderateScale(5)} /> */}
            <ReactNativeTouchableOpacity onPress={() => props.onOpenGallery()}>
                <View style={{ paddingVertical: Scale.moderateScale(15) }}>
                    <View style={{ flexDirection: "row", paddingHorizontal: Scale.moderateScale(15), alignItems: "center" }}>
                        <View>
                            <GalleryIcon width={Scale.moderateScale(22)} height={Scale.moderateScale(22)} />
                        </View>
                        <View style={{ marginLeft: Scale.moderateScale(20) }}>
                            <Text style={{ color: Colors.FIORD, fontSize: Typography.FONT_SIZE_14, fontFamily: Typography.FONT_FAMILY_PROXIMANOVA_REGULARSelect() }}>{Languages.Common.ChooseFromGallery}</Text>
                        </View>
                    </View>
                </View>
            </ReactNativeTouchableOpacity>
        </View>
    );
}

export default BottomSheetUploadImage;
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => width / guidelineBaseWidth * size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;


//iphone size 
const windowWidth=Dimensions.get('window').width;
const iphoneSize=()=>{
   
    if(windowWidth===320)
    {
        return 'small' ;
    }else if(windowWidth===414)
    {
        return 'large';
    }
    return 'medium';
};


const androidSize=()=>{

    
    
    

}
export default {scale, verticalScale, moderateScale,iphoneSize};
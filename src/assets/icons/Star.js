import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Star(props) {
  return (
    <Svg fill="none" width={10} height={10} scale={props.width / 24} viewBox={props.viewBox} {...props}>
      <Path d="M6.261,17.276,4.837,26.013a.843.843,0,0,0,1.239.874l7.4-4.1,7.4,4.1a.843.843,0,0,0,1.239-.874L20.7,17.277l6.02-6.18a.844.844,0,0,0-.475-1.423L17.954,8.406,14.239.482a.876.876,0,0,0-1.524,0L9,8.4.715,9.673A.844.844,0,0,0,.24,11.1Z" transform="translate(0 -0.039)" fill={props.fill} />
    </Svg>
  );
}

const MemoStar = React.memo(Star);
export default MemoStar;

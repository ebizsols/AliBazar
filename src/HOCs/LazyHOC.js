import React, { useEffect, useState } from 'react';
import { InteractionManager, } from 'react-native';
import { ScreenLoader } from 'components/UI';

const LazyHOC = (props) => {

    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setIsHidden(false);
        });
    }, []);

    if (isHidden) {
        return (
            <ScreenLoader />
        )
    } else {
        return (
            props.children
        );
    }
};

// const styles = StyleSheet.create({

// });

export default LazyHOC;
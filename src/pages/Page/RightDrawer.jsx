import React, {createContext} from 'react';
import {Drawer} from "react-native-drawer-layout";
import CustomDrawer from "./CustomDrawer";
import CustomDrawerContent from "./CustomDrawerContent";

const RightDrawerContext = createContext();
const RightDrawer = () => {
    const [rightDrawerOpen, setRightDrawerOpen] = React.useState(false);

    const value = React.useMemo(
        () => ({
            openRightDrawer: () => setRightDrawerOpen(true),
            closeRightDrawer: () => setRightDrawerOpen(false),
        }),
        []
    );
    
    return (
        <Drawer
            open={rightDrawerOpen}
            onOpen={() => setRightDrawerOpen(true)}
            onClose={() => setRightDrawerOpen(false)}
            drawerPosition="right"
            renderDrawerContent={() => <>{/* Right drawer content */}</>}
            //drawerContent={CustomDrawerContent}
            swipeEdgeWidth={5}
            swipeMinDistance={50}
            gestureHandlerProps={{
                activeOffsetX: -5, // Adjust the value as needed
            }}
        >
            <RightDrawerContext.Provider value={value}>
                <CustomDrawer />
            </RightDrawerContext.Provider>
        </Drawer>
    );
}

export default RightDrawer;
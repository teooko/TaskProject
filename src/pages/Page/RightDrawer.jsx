import React, {createContext, useEffect, useMemo, useState} from 'react';
import {Drawer} from "react-native-drawer-layout";
import CustomDrawer from "./CustomDrawer";
import CustomDrawerContent from "./CustomDrawerContent";
import RightDrawerContent from "./RightDrawerContent";

export const RightDrawerContext = createContext();
const RightDrawer = () => {
    const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
    const [activeOffsetX, setActiveOffsetX] = useState(-5);
    
    const value = useMemo(
        () => ({
            openRightDrawer: () => setRightDrawerOpen(true),
            closeRightDrawer: () => setRightDrawerOpen(false),
        }),
        []
    );
    
    useEffect(() => {
        if (rightDrawerOpen) {
            setActiveOffsetX(5); 
        } else {
            setActiveOffsetX(-5);
        }
    }, [rightDrawerOpen]);
    
    return (
        
        <Drawer
            open={rightDrawerOpen}
            onOpen={() => setRightDrawerOpen(true)}
            onClose={() => setRightDrawerOpen(false)}
            drawerPosition="right"
            renderDrawerContent={() => <RightDrawerContent />}
            drawerContent={CustomDrawerContent}
            swipeEdgeWidth={5}
            swipeMinDistance={50}
            gestureHandlerProps={{
                activeOffsetX: activeOffsetX, 
            }}
        >
            <RightDrawerContext.Provider value={value}>
                <CustomDrawer />
            </RightDrawerContext.Provider>
        </Drawer>
    );
}

export default RightDrawer;
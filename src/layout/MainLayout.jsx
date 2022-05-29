import React from 'react';
import classes from "./MainLayout.module.css"
import {Outlet} from "react-router-dom"

const MainLayout = () => {
    return (
        <div className={classes.mainLayout}>
            <div className={classes.mainLayoutColumnLeft}>
                Some left menu
            </div>
            <div className={classes.mainLayoutColumnMain}>

                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;

import React, {useState} from 'react';
import classes from "./MainPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getCharts, storeAddChart, storeRemoveChart, storeSetChartSide} from "../store/ChartSlice";
import WidgetColumn from "../components/dashboard/WidgetColumn";

const SIDE_LEFT = 'left';
const SIDE_RIGHT = 'right';

const MainPage = () => {
    const [dragChart, setDragChart] = useState({})

    const dispatch = useDispatch()
    const charts = useSelector(getCharts)

    const addChart = (newChart) => {
        dispatch(storeAddChart(newChart))
    }

    const removeChart = (id) => {
        dispatch(storeRemoveChart(id))
    }

    const setSide = (id, side) => {
        dispatch(storeSetChartSide({id, side}))
    }

    return (
        <div className={classes.mainPage}>
            <WidgetColumn
                charts={charts}
                side={SIDE_LEFT}
                addChart={addChart}
                removeChart={removeChart}
                setSide={setSide}
                dragChart={dragChart}
                setDragChart={setDragChart}
            />
            <WidgetColumn
                charts={charts}
                side={SIDE_RIGHT}
                addChart={addChart}
                removeChart={removeChart}
                setSide={setSide}
                dragChart={dragChart}
                setDragChart={setDragChart}
            />
        </div>
    );
};

export default MainPage;

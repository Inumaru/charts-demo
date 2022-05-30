import React, {useState} from 'react';
import classes from "./MainPage.module.css"
import {useDispatch, useSelector} from "react-redux";
import {getCharts, storeAddChart, storeRemoveChart, storeSetChartSide} from "../store/ChartSlice";
import WidgetColumn from "../components/dashboard/WidgetColumn";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const SIDE_LEFT = 'left';
const SIDE_RIGHT = 'right';

const MainPage = () => {
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
            <DndProvider backend={HTML5Backend}>
                <WidgetColumn
                    charts={charts}
                    side={SIDE_LEFT}
                    addChart={addChart}
                    removeChart={removeChart}
                    setSide={setSide}
                />
                <WidgetColumn
                    charts={charts}
                    side={SIDE_RIGHT}
                    addChart={addChart}
                    removeChart={removeChart}
                    setSide={setSide}
                />
            </DndProvider>
        </div>
    );
};

export default MainPage;

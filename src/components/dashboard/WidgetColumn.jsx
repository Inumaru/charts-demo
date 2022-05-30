import React, {useState} from 'react';
import {useCharts} from "../../hook/useCharts";
import classes from "./WidgetColumn.module.css"
import Modal from "../modal/Modal";
import AddChartForm from "../form/AddChartForm";
import Chart from "../chart/Chart";

const WidgetColumn = ({charts, side, addChart, removeChart, setSide, dragChart, setDragChart}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const sideCharts = useCharts(charts, side)

    const onAddChart = (newChart) => {
        addChart({...newChart, side})
        setIsModalVisible(false)
    }

    const onDragStart = (e, chart) => {
        setDragChart(chart)
    }

    const onDragEnd = (e) => {
    }

    const onDragOver = (e) => {
        e.preventDefault()
    }

    const onDrop = (e, chart) => {
        e.preventDefault()
        setSide(dragChart.id, side)
    }

    const onChartDrop = (e) => {
        e.preventDefault()

        setSide(dragChart.id, side)
    }

    return (
        <div
            className={classes.widgetColumn}
            onDragOver={(e) => onDragOver(e)}
            onDrop={onChartDrop}
        >
            <Modal visible={isModalVisible} setVisible={setIsModalVisible}>
                <AddChartForm onAddChart={onAddChart} isVisible={isModalVisible}/>
            </Modal>
            {sideCharts.map(chart =>
                <Chart
                    draggable
                    onDragStart={(e) => onDragStart(e, chart)}
                    onDragLeave={(e) => onDragEnd(e)}
                    onDragEnd={(e) => onDragEnd(e)}
                    onDragOver={(e) => onDragOver(e)}
                    onDrop={onDrop}
                    removeChart={removeChart}
                    key={chart.id}
                    chart={chart}
                />
            )}
            <button className={classes.widgetColumnAddButton} onClick={() => setIsModalVisible(true)}>Add chart</button>
        </div>
    );
};

export default WidgetColumn;

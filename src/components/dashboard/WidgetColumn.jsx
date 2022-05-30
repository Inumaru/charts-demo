import React, {useState} from 'react';
import {useCharts} from "../../hook/useCharts";
import classes from "./WidgetColumn.module.css"
import Modal from "../modal/Modal";
import AddChartForm from "../form/AddChartForm";
import Chart from "../chart/Chart";
import {useDrop} from "react-dnd";

const WidgetColumn = ({charts, side, addChart, removeChart, setSide}) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "chart",
        drop: (item) => {
            setSide(item.id, side)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const isActive = canDrop && isOver
    let backgroundColor = 'white'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    const sideCharts = useCharts(charts, side)

    const onAddChart = (newChart) => {
        addChart({...newChart, side})
        setIsModalVisible(false)
    }

    return (
        <div
            className={classes.widgetColumn}
            ref={drop}
            style={{backgroundColor}}
        >
            <Modal visible={isModalVisible} setVisible={setIsModalVisible}>
                <AddChartForm onAddChart={onAddChart} isVisible={isModalVisible}/>
            </Modal>
            {sideCharts.map(chart =>
                <Chart
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

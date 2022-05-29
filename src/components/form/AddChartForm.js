import React, {useEffect, useState} from 'react';
import classes from "./AddChartFrom.module.css"
import {
    CHART_TYPE_PIE,
    CHART_TYPE_COLUMN,
} from "../chart/Chart";
import {CHART_DATA_SOURCE_BROWSERS} from "../../hook/useCharts";

const AddChartForm = ({onAddChart, isVisible}) => {
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")
    const [withDrilldown, setWithDrilldown] = useState(false)
    const [dataSource, setDataSource] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        const newChart = {
            title,
            type,
            dataSource,
            withDrilldown,
            id: Date.now(),
        }

        onAddChart(newChart)
    }

    useEffect(() => {
        if (!isVisible) {
            setTitle("")
            setType("")
            setDataSource("")
            setWithDrilldown(false)
        }
    }, [isVisible])

    return (
        <form className={classes.chartForm} onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    minLength="3"
                    required
                />
            </div>
            <div>
                <select required value={dataSource} onChange={(e) => setDataSource(e.target.value)}>
                    <option value="">Select data source...</option>
                    <option value={CHART_DATA_SOURCE_BROWSERS}>Browsers usage</option>
                </select>
            </div>
            <div>
                <select required value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select type...</option>
                    <option value={CHART_TYPE_COLUMN}>Column</option>
                    <option value={CHART_TYPE_PIE}>Pie</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={withDrilldown}
                        onChange={() => setWithDrilldown(!withDrilldown)}
                    />
                    <span>With Drilldown</span>
                </label>
            </div>
            <div>
                <button>Add chart</button>
            </div>
        </form>
    );
};

export default AddChartForm;

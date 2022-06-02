import React, {useEffect} from 'react';
import classes from "./AddChartFrom.module.css"
import {CHART_TYPE_COLUMN, CHART_TYPE_PIE,} from "../chart/Chart";
import {CHART_DATA_SOURCE_BROWSERS, CHART_DATA_SOURCE_FOREIGN_COMPANIES} from "../../hook/useCharts";
import {useCheckbox, useInput} from "../../hook/useInput";
import {foreignCompanies} from "../../data";

const AddChartForm = ({onAddChart, isVisible}) => {
    const title = useInput()
    const type = useInput()
    const dataSource = useInput()
    const withDrilldown = useCheckbox()
    const field = useInput()

    const onSubmit = (e) => {
        e.preventDefault()

        const newChart = {
            title: title.value,
            type: type.value,
            dataSource: dataSource.value,
            withDrilldown: withDrilldown.checked,
            field: field.value,
            id: Date.now(),
        }

        onAddChart(newChart)
    }

    useEffect(() => {
        if (!isVisible) {
            title.resetValue()
            type.resetValue()
            dataSource.resetValue()
            withDrilldown.resetChecked()
            field.resetValue()
        }
    }, [isVisible])

    return (
        <form className={classes.chartForm} onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    value={title.value}
                    onChange={title.onChange}
                    placeholder="Title"
                    minLength="3"
                    required
                />
            </div>
            <div>
                <select required value={dataSource.value} onChange={dataSource.onChange}>
                    <option value="">Select data source...</option>
                    <option value={CHART_DATA_SOURCE_BROWSERS}>Browsers usage</option>
                    <option value={CHART_DATA_SOURCE_FOREIGN_COMPANIES}>Foreign companies revenue</option>
                </select>
            </div>
            {dataSource.value === CHART_DATA_SOURCE_FOREIGN_COMPANIES &&
                <div>
                    <select
                        value={field.value}
                        onChange={field.onChange}
                    >
                        <option value="">Select field...</option>
                        {foreignCompanies.allowedColumns.map(field =>
                            <option key={field} value={field}>{foreignCompanies.columnMapping[field]}</option>
                        )}
                    </select>
                </div>
            }
            <div>
                <select required value={type.value} onChange={type.onChange}>
                    <option value="">Select type...</option>
                    <option value={CHART_TYPE_COLUMN}>Column</option>
                    <option value={CHART_TYPE_PIE}>Pie</option>
                </select>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={withDrilldown.checked}
                        onChange={withDrilldown.onChange}
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

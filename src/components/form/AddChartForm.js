import React, {useEffect} from 'react';
import classes from "./AddChartFrom.module.css"
import {CHART_TYPE_COLUMN, CHART_TYPE_PIE,} from "../chart/Chart";
import {CHART_DATA_SOURCE_BROWSERS, CHART_DATA_SOURCE_FOREIGN_COMPANIES} from "../../hook/useCharts";
import {foreignCompanies} from "../../data";
import {useForm} from "react-hook-form";

const AddChartForm = ({onAddChart, isVisible}) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            type: "",
            dataSource: "",
            field: "",
            withDrilldown: [],
        }
    })

    const dataSource = watch('dataSource')

    const titlePlaceholder = "Введите название"
    const dataSourcePlaceholder = "Выберите источник данных"
    const fieldPlaceholder = "Выберите поле для отображения"
    const typePlaceholder = "Выберите тип отображения"

    const onSubmit = (data) => {
        const newChart = {
            ...data,
            withDrilldown: data.dataSource.length !== 0,
            id: Date.now(),
        }

        onAddChart(newChart)
    }

    useEffect(() => {
        reset()
    }, [isVisible])

    return (
        <form className={classes.chartForm} onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    placeholder={titlePlaceholder}
                    {...register("title", {
                        required: titlePlaceholder,
                        minLength: {
                            value: 3,
                            message: "Минимальная длина 3"
                        }
                    })}
                />
            </div>
            {errors.title &&
                <div className={classes.error}>{errors.title.message}</div>
            }
            <div>
                <select
                    {...register("dataSource", {required: dataSourcePlaceholder})}
                >
                    <option value="">{dataSourcePlaceholder}...</option>
                    <option value={CHART_DATA_SOURCE_BROWSERS}>Browsers usage</option>
                    <option value={CHART_DATA_SOURCE_FOREIGN_COMPANIES}>Foreign companies revenue</option>
                </select>
            </div>
            {errors.dataSource &&
                <div className={classes.error}>{errors.dataSource.message}</div>
            }
            {dataSource === CHART_DATA_SOURCE_FOREIGN_COMPANIES &&
                <div>
                    <select
                        {...register("field", {required: fieldPlaceholder})}
                    >
                        <option value="">{fieldPlaceholder}...</option>
                        {foreignCompanies.allowedColumns.map(field =>
                            <option key={field} value={field}>{foreignCompanies.columnMapping[field]}</option>
                        )}
                    </select>
                </div>
            }
            {dataSource === CHART_DATA_SOURCE_FOREIGN_COMPANIES && errors.field &&
                <div className={classes.error}>{errors.field.message}</div>
            }
            <div>
                <select
                    {...register("type", {required: typePlaceholder})}
                >
                    <option value="">{typePlaceholder}...</option>
                    <option value={CHART_TYPE_COLUMN}>Column</option>
                    <option value={CHART_TYPE_PIE}>Pie</option>
                </select>
            </div>
            {errors.type &&
                <div className={classes.error}>{errors.type.message}</div>
            }
            <div>
                <label>
                    <input
                        type="checkbox"
                        {...register("withDrilldown")}
                    />
                    <span>С проваливанием</span>
                </label>
            </div>
            <div>
                <button>Добавить виджет</button>
            </div>
        </form>
    );
};

export default AddChartForm;

import React from 'react';
import classes from "./Chart.module.css"
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from "highcharts-react-official";
import {CHART_DATA_SOURCE_BROWSERS, useDataset} from "../../hook/useCharts";
import drilldown from 'highcharts/modules/drilldown'
import {useDrag} from "react-dnd";

const Chart = ({chart, removeChart, ...props}) => {
    drilldown(Highcharts)

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "chart",
        item: { ...chart, name: chart.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }))
    const opacity = isDragging ? 0.4 : 1

    const data = useDataset(chart.dataSource, chart.withDrilldown)

    const options = {
        chart: {
            type: chart.type,
        },
        subtitle: {
            text: 'Click on item to view data per year'
        },
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        ...data
    }

    if (chart.type === CHART_TYPE_COLUMN) {
        switch (chart.dataSource) {
            case CHART_DATA_SOURCE_BROWSERS:
                options.xAxis = {
                    labels: {
                        enabled: false,
                    }
                }
                break;
        }
    }

    return (
        <div
            {...props}
            className={classes.chart}
            ref={drag}
            style={{opacity}}
        >
            <div className={classes.chartTitleLine}>
                <div className={classes.title}>{chart.title}</div>
                <button onClick={() => removeChart(chart.id)}>X</button>
            </div>
            <HighchartsReact
                highcharts={Highcharts}
                constructorType={'chart'}
                options={options}
            />
        </div>
    );
};

export default Chart;

export const CHART_TYPE_PIE = 'pie'
export const CHART_TYPE_COLUMN = 'column'

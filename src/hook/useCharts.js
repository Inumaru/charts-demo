import {useMemo} from "react";
import {browsersUsage} from "../data";

export const useCharts = (charts, side) => {
    return useMemo(() => {
        return charts.filter(chart => chart.side === side)
    }, [charts, side])
}

export const CHART_DATA_SOURCE_BROWSERS = 'browsers'

export const useDataset = (dataset, withDrilldown) => {
    return useMemo(() => {
        const result = {
            series: [],
        }

        const lastYearData = browsersUsage.slice(-1).pop()

        switch (dataset) {
            case CHART_DATA_SOURCE_BROWSERS:
                const browserSeries = {
                    name: "Browsers",
                    colorByPoint: true,
                    data: [],
                }
                Object.keys(lastYearData).map(key => {
                    if (key !== "Date") {
                        const item = {
                            name: key,
                            y: lastYearData[key],
                        }
                        if (withDrilldown) {
                            item.drilldown = key
                        }

                        browserSeries.data.push(item)
                    }
                })

                result.series.push(browserSeries)
                break;
        }

        if (withDrilldown) {
            result.drilldown = {
                series: []
            };

            Object.keys(lastYearData).map(key => {
                if (key !== "Date") {
                    const item = {
                        name: key,
                        id: key,
                        data: [],
                    }

                    browsersUsage.map(month => {
                        item.data.push([month.Date, month[key]])
                    })

                    result.drilldown.series.push(item)
                }
            })
        }

        return result
    }, [dataset, withDrilldown])
}

import {useMemo} from "react";
import {browsersUsage, foreignCompanies} from "../data";

export const useCharts = (charts, side) => {
    return useMemo(() => {
        return charts.filter(chart => chart.side === side)
    }, [charts, side])
}

export const CHART_DATA_SOURCE_BROWSERS = 'browsers'
export const CHART_DATA_SOURCE_FOREIGN_COMPANIES = 'foreign-companies'

const pseudoMonthPercents = [
    {"name": "Январь", percent: 5},
    {"name": "Февраль", percent: 2},
    {"name": "Март", percent: 9},
    {"name": "Апрель", percent: 11},
    {"name": "Май", percent: 7},
    {"name": "Июнь", percent: 3},
    {"name": "Июль", percent: 9},
    {"name": "Август", percent: 12},
    {"name": "Сентябрь", percent: 8},
    {"name": "Октябрь", percent: 6},
    {"name": "Ноябрь", percent: 8},
    {"name": "Декабрь", percent: 20},
]

export const useDataset = (chart) => {
    return useMemo(() => {
        const result = {
            series: [],
        }

        const lastYearData = browsersUsage.slice(-1).pop()

        switch (chart.dataSource) {
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
                        if (chart.withDrilldown) {
                            item.drilldown = key
                        }

                        browserSeries.data.push(item)
                    }
                })

                result.series.push(browserSeries)
                break
            case CHART_DATA_SOURCE_FOREIGN_COMPANIES:
                const foreignSeries = {
                    name: foreignCompanies.title,
                    colorByPoint: true,
                    data: [],
                }

                foreignCompanies.data.map(company => {
                    const item = {
                        name: company[foreignCompanies.legendField],
                        y: company[chart.field],
                    }
                    if (chart.withDrilldown) {
                        item.drilldown = company[foreignCompanies.legendField]
                    }

                    foreignSeries.data.push(item)
                })

                result.series.push(foreignSeries)
                break
        }

        if (chart.withDrilldown) {
            result.drilldown = {
                series: []
            }

            foreignCompanies.data.map(company => {
                const item = {
                    name: "Pseudo per month",
                    id: company[foreignCompanies.legendField],
                    data: [],
                }

                pseudoMonthPercents.map(month => {
                    item.data.push([
                        month.name,
                        Math.ceil(company[chart.field] / 100 * month.percent)
                    ])
                })

                result.drilldown.series.push(item)
            })
        }

        if (foreignCompanies.columnSuffixes[chart.field]) {
            const suffix = foreignCompanies.columnSuffixes[chart.field]
            result.plotOptions = {
                series: {
                    dataLabels: {
                        enabled: true,
                            format: '{point.name}: {point.y:.1f} ' + suffix
                    }
                }
            }
            result.accessibility = {
                point: {
                    valueSuffix:suffix
                }
            }
            result.tooltip = {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}' + suffix + '</b> of total<br/>'
            }
        }

        return result
    }, [chart])
}

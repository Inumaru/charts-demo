import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    charts: [
        {
            title: "Популярность браузеров на 2016",
            type: "column",
            dataSource: "browsers",
            withDrilldown: true,
            id: 1653843457615,
            side: "left",
            sort: 0,
        },
        {
            title: "Выручка иностранных компаний в России в 2020г",
            type: "pie",
            dataSource: "foreign-companies",
            field: 'revenue',
            withDrilldown: true,
            id: 1653843457616,
            side: "right",
            sort: 1,
        },
        {
            title: "Процент выручки иностранных компаний в России в 2020г",
            type: "pie",
            dataSource: "foreign-companies",
            field: 'percent',
            withDrilldown: true,
            id: 1653843457617,
            side: "left",
            sort: 2,
        },
    ],
};

export const chartsSlice = createSlice({
    name: 'charts',
    initialState,

    reducers: {
        storeAddChart: (state, action) => {
            state.charts = [...state.charts, action.payload]
        },
        storeRemoveChart: (state, action) => {
            state.charts = state.charts.filter(chart => chart.id !== action.payload)
        },
        storeSetChartSide: (state, action) => {
            state.charts.map(chart => {
                if (chart.id === action.payload.id) {
                    chart.side = action.payload.side
                }
            })
        },
    },
});

export const { storeAddChart, storeRemoveChart, storeSetChartSide } = chartsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getCharts = (state) => state.charts.charts;


export default chartsSlice.reducer;

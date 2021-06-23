import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { NasaData } from "../../interfaces/Models";
import "./ColumnChart.scss";

type ChartsData = {
  chartData: NasaData[];
};

const ColumnChart = (props: ChartsData) => {
  useEffect(() => {
    const chartsData = props.chartData.map((cd: NasaData) => ({
      fullYear: new Date(cd.year).getFullYear(),
      year: cd.year,
      mass: +cd.mass,
      name: cd.name,
    }));

    am4core.useTheme(am4themes_dark);
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = chartsData;
    chart.fontSize = 16;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.minZoomCount = 5;

    chart.yAxes.push(new am4charts.ValueAxis());

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "mass";
    series.dataFields.categoryX = "fullYear";
    series.dataFields.dateX = "year";
    series.dataFields.categoryY = "name";
    series.name = "Mass";
    series.columns.template.tooltipText = "[bold]Name:[/] {categoryY}, [bold]Weight:[/] {valueY}(g), [bold]Year:[/] {categoryX}";
    series.columns.template.fillOpacity = 0.8;

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    let scrollbarX = new am4core.Scrollbar();
    scrollbarX.marginBottom = 20;
    chart.scrollbarX = scrollbarX;
    let scrollbarY = new am4core.Scrollbar();
    scrollbarY.marginLeft = 20;
    chart.scrollbarY = scrollbarY;

  }, [props.chartData]);

  return (
    <React.Fragment>
      <div className="chartDiv" id="chartdiv"></div>
    </React.Fragment>
  );
};

export default ColumnChart;



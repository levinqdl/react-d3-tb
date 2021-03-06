'use strict';

var React = require('react');
var d3 = require('d3');
var $__0=      require('../common'),Chart=$__0.Chart,XAxis=$__0.XAxis,YAxis=$__0.YAxis,Tooltip=$__0.Tooltip;
var DataSeries = require('./DataSeries');
var utils = require('../utils');
var $__1=       require('../mixins'),CartesianChartPropsMixin=$__1.CartesianChartPropsMixin,DefaultAccessorsMixin=$__1.DefaultAccessorsMixin,ViewBoxMixin=$__1.ViewBoxMixin,TooltipMixin=$__1.TooltipMixin;

module.exports = React.createClass({

  mixins: [ CartesianChartPropsMixin, DefaultAccessorsMixin, ViewBoxMixin, TooltipMixin ],

  displayName: 'ScatterChart',

  propTypes: {
    circleRadius:     React.PropTypes.number,
    className:        React.PropTypes.string,
    hoverAnimation:   React.PropTypes.bool,
    margins:          React.PropTypes.object,
    xAxisClassName:   React.PropTypes.string,
    xAxisStrokeWidth: React.PropTypes.number,
    yAxisClassName:   React.PropTypes.string,
    yAxisStrokeWidth: React.PropTypes.number
 },

  getDefaultProps:function() {
    return {
      circleRadius:     3,
      className:        'rd3-scatterchart',
      hoverAnimation:   true,
      margins:          {top: 10, right: 20, bottom: 50, left: 45},
      xAxisClassName:   'rd3-scatterchart-xaxis',
      xAxisStrokeWidth: 1,
      yAxisClassName:   'rd3-scatterchart-yaxis',
      yAxisStrokeWidth: 1
    };
  },

  _calculateScales: utils.calculateScales,

  render:function() {

    var props = this.props;
    var data  = props.data;

    if (!data || data.length < 1) {
      return null;
    }

    var $__0=     this.getDimensions(),innerWidth=$__0.innerWidth,innerHeight=$__0.innerHeight,trans=$__0.trans,svgMargins=$__0.svgMargins;
    var yOrient = this.getYOrient();

    // Returns an object of flattened allValues, xValues, and yValues
    var flattenedData = utils.flattenData(data, props.xAccessor, props.yAccessor);

    var allValues = flattenedData.allValues,
        xValues   = flattenedData.xValues,
        yValues   = flattenedData.yValues;

    var scales  = this._calculateScales(innerWidth, innerHeight, xValues, yValues);
    var xScale  = scales.xScale;
    var yScale  = scales.yScale;

    return (
      React.createElement("span", {onMouseLeave: this.onMouseLeave}, 
        React.createElement(Chart, {
          colors: props.colors, 
          colorAccessor: props.colorAccessor, 
          data: data, 
          height: props.height, 
          legend: props.legend, 
          margins: props.margins, 
          title: props.title, 
          viewBox: this.getViewBox(), 
          width: props.width
        }, 
          React.createElement("g", {
            className: props.className, 
            transform: trans
          }, 
            React.createElement(XAxis, {
              data: data, 
              height: innerHeight, 
              horizontalChart: props.horizontal, 
              margins: svgMargins, 
              stroke: props.axesColor, 
              strokeWidth: props.xAxisStrokeWidth.toString(), 
              tickFormatting: props.xAxisFormatter, 
              width: innerWidth, 
              xAxisClassName: props.xAxisClassName, 
              xAxisLabel: props.xAxisLabel, 
              xAxisLabelOffset: props.xAxisLabelOffset, 
              xAxisOffset: props.xAxisOffset, 
              xAxisTickInterval: props.xAxisTickInterval, 
              xAxisTickValues: props.xAxisTickValues, 
              xOrient: props.xOrient, 
              yOrient: yOrient, 
              xScale: xScale, 
              gridVertical: props.gridVertical, 
              gridVerticalStroke: props.gridVerticalStroke, 
              gridVerticalStrokeWidth: props.gridVerticalStrokeWidth, 
              gridVerticalStrokeDash: props.gridVerticalStrokeDash}
            ), 
            React.createElement(YAxis, {
              data: data, 
              width: innerWidth, 
              height: innerHeight, 
              horizontalChart: props.horizontal, 
              margins: svgMargins, 
              stroke: props.axesColor, 
              strokeWidth: props.yAxisStrokeWidth.toString(), 
              tickFormatting: props.yAxisFormatter, 
              yAxisClassName: props.yAxisClassName, 
              yAxisLabel: props.yAxisLabel, 
              yAxisLabelOffset: props.yAxisLabelOffset, 
              yAxisOffset: props.yAxisOffset, 
              yAxisTickValues: props.yAxisTickValues, 
              yAxisTickCount: props.yAxisTickCount, 
              yScale: yScale, 
              xOrient: props.xOrient, 
              yOrient: yOrient, 
              gridHorizontal: props.gridHorizontal, 
              gridHorizontalStroke: props.gridHorizontalStroke, 
              gridHorizontalStrokeWidth: props.gridHorizontalStrokeWidth, 
              gridHorizontalStrokeDash: props.gridHorizontalStrokeDash}
            ), 
            React.createElement(DataSeries, {
              circleRadius: props.circleRadius, 
              colors: props.colors, 
              colorAccessor: props.colorAccessor, 
              data: allValues, 
              height: innerHeight, 
              hoverAnimation: props.hoverAnimation, 
              width: innerWidth, 
              xAccessor: props.xAccessor, 
              xScale: xScale, 
              yAccessor: props.yAccessor, 
              yScale: yScale, 
              onMouseOver: this.onMouseOver}
              )
          )
        ), 
        (props.showTooltip ? React.createElement(Tooltip, React.__spread({},  this.state.tooltip)) : null)
      )
    );
  }

});

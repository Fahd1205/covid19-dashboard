import React from 'react'
import PropTypes from 'prop-types'
import {Bar} from 'react-chartjs-2'

import colors from '../../styles/colors'

const options = {
  legend: {
    display: false
  },
  tooltips: {
    mode: 'index'
  },
  scales: {
    xAxes: [{
      type: 'time',
      time: {
        unit: 'day',
        displayFormats: {
          day: 'DD/MM'
        },
        tooltipFormat: 'DD/MM'
      },
      gridLines: {
        offsetGridLines: true
      },
      offset: true
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

const formatData = data => {
  const datasets = []

  if (data.some(h => h.deces)) {
    datasets.push({
      label: 'Décès à l’hôpital',
      data: data.map(h => h.deces).slice(1).map((cumul, i) => cumul - data[i].deces),
      backgroundColor: colors.red
    })
  }

  return {
    labels: data.map(h => new Date(h.date)),
    datasets
  }
}

const VariationsDecesChart = ({data, height}) => (
  <Bar data={formatData(data)} options={options} height={height} />
)

VariationsDecesChart.defaultProps = {
  height: null
}

VariationsDecesChart.propTypes = {
  data: PropTypes.array.isRequired,
  height: PropTypes.number
}

export default VariationsDecesChart

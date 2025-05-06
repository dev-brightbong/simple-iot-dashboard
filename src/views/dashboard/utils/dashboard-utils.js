export const labels = ['wh40batt', 'baromrelin', 'soilad1', 'rainratein']

export const convertDeviceStatusData = (data) => {
  if (!data) return { labels: [], datasets: [] }

  const firstKey = Object.keys(data).find((key) => key !== 'interval')
  if (!firstKey) return { labels: [], datasets: [] }

  const colors = {
    wh40batt: { bg: 'rgba(220, 53, 69, 0.2)', border: 'rgba(220, 53, 69, 1)' },
    baromrelin: { bg: 'rgba(32, 201, 151, 0.2)', border: 'rgba(32, 201, 151, 1)' },
    soilad1: { bg: 'rgba(51, 153, 255, 0.2)', border: 'rgba(51, 153, 255, 1)' },
    rainratein: { bg: 'rgba(153, 102, 255, 0.2)', border: 'rgba(153, 102, 255, 1)' },
  }
  const datasets = []

  Object.keys(data).forEach((key) => {
    if (key !== 'interval') {
      const values = data[key].map((item) => parseFloat(item.value))

      datasets.push({
        label: key,
        data: values,
        backgroundColor: colors[key]?.bg || 'rgba(0, 123, 255, 0.2)',
        borderColor: colors[key]?.border || 'rgba(0, 123, 255, 1)',
        pointBackgroundColor: colors[key]?.border || 'rgba(0, 123, 255, 1)',
        fill: false,
      })
    }
  })

  return {
    labels,
    datasets,
  }
}

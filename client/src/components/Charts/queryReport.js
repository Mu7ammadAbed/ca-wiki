import { format } from 'date-fns';
import axios from 'axios';

const queryReport = async (props) => {
  const { startDate, endDate, metrics, dimensions, orderBy, filter } = props;
  const {
    data: {
      data: { REACT_APP_VIEW_ID },
    },
  } = await axios.get('/api/v1/secrets');
  const requestDimensions = (dimension) => {
    const result = [];
    dimension.forEach((item) => {
      result.push({
        name: item,
      });
    });
    return result;
  };
  return window.gapi.client.request({
    path: '/v4/reports:batchGet',
    root: 'https://analyticsreporting.googleapis.com/',
    method: 'POST',
    body: {
      reportRequests: [
        {
          viewId: REACT_APP_VIEW_ID,
          filtersExpression: filter,
          dateRanges: [
            {
              startDate: format(new Date(startDate), 'yyyy-MM-dd'),
              endDate: format(new Date(endDate), 'yyyy-MM-dd'),
            },
          ],
          metrics: [
            {
              expression: metrics,
            },
          ],
          dimensions: requestDimensions(dimensions),
          orderBys: orderBy
            ? [
                {
                  fieldName: orderBy.fieldName,
                  sortOrder: orderBy.order,
                },
              ]
            : [],
        },
      ],
    },
  });
};

export default queryReport;

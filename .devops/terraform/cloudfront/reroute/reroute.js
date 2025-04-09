const path = require('path');

function buildRedirectToWWW({ uri, headers }) {
  const location = [{ key: 'Location', value: `https://www.${headers.host[0].value}${uri}` }];
  return { status: '301', headers: { location } };
}

exports.handler = async (evt) => {
  const { request } = evt.Records[0].cf;
  if (!path.extname(request.uri)) request.uri = '/index.html';
  return !request.headers.host[0].value.startsWith('www')
    ? buildRedirectToWWW(request)
    : request;
};

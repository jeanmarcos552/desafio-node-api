// ?search=Jean&page=2
// {searh: 'jean': page: '2'}
export function extractQueryParam(param) {
  return param
    .substr(1)
    .split('&')
    .reduce((objParam, param) => {
      const [key, value] = param.split('=');
      objParam[key] = value;
      return objParam;
    }, {});
}

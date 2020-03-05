const API_KEY = process.env.REACT_APP_API_KEY;

export const SERVICE_URL = {
  "TOP_HEADLINE_US_BUSINESS": "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + API_KEY,
  "TOP_HEADLINE_TECHCRUNCH": "http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" + API_KEY,
  "ARTICLES_BITCOIN_SORT_BY_MONTH": "http://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&from=2020-02-02&apiKey=" + API_KEY,
  "ARTICLES_APPLE_SORT_BY_PUBLISHERS": "http://newsapi.org/v2/everything?q=apple&sortBy=popularity&from=2020-03-01&to=2020-03-01&apiKey=" + API_KEY,
  "ARTICLES_PUBLISHED_BY_WALLSTREET": "http://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + API_KEY
}

/**
 * 
 * @param oFilter {
 *  isTop: true | false, // required
 *  topNews: {
 *    category: anystring,
 *    country: countryencoded,
 *    sources: anystring,
 *  },
 *  option: {
 *    q: bitcoin | apple,  // not mandatory
 *    sortBy: publishedAt | popularity, // not mandatory
 *    from: dateformat 'yyyy-mm-dd'
 *    to: dateformat 'yyyy-mm-dd',
 *    domain: anystring
 *  }
 * }  
 */
export const buildQueryByFilter = (oFilter) => {
  let urlString = "http://newsapi.org/v2/";
  let hasFilter = false;
  let queryString = "";
  urlString += (Boolean(oFilter.isTop) === true) ? "top-headlines?" : "everything?";
  //build query from object
  if (Boolean(oFilter.isTop) === true) {
    queryString = Object.keys(oFilter.topNews).map((key) => {
      hasFilter = true;
      return key + '=' + encodeURIComponent(oFilter.topNews[key]);
    }).join('&');
  } else {
    queryString = Object.keys(oFilter.optional).map((key) => {
      hasFilter = true;
      return key + '=' + encodeURIComponent(oFilter.optional[key]);
    }).join('&');
  }

  const apiKey = (hasFilter === true) ? ("&apiKey=" + API_KEY) : ("apiKey=" + API_KEY);
  return urlString + queryString + apiKey;
}
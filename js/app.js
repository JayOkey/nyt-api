;(function(d) {

  "use strict";
  /**
   * Variables
   */
  const key = '',
        url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=',
        app = d.querySelector('#app');

  /**
   * Functions
   */

  // return data in json format or error message
  const getJSON = function(response) {
    return (response.ok) ? response.json() : Promise.reject(response)
  }

  // populate article template with data returned
  const articleTemplate = function(article) {
    return `<article>
              <header>
                <h2 class="entry-title"><a href="${ article.url }">${ article.title }</a></h2>
                <div class="byline">
                  ${ article.byline }
                </div>
                <div class="post-meta">
                  <span class="posted-on">
                    <time datetime="${ article.published_date }">${ article.published_date }</time>
                  </span>
                </div>
              </header>
              <div class="entry-content">
                <p>${article.abstract }</p>
              </div>
            </article>`;
  };

  // convert the array article data into an array of article templates
  const generateTemplates = function(articles) {
    return articles.results.map(function(article) {
      return articleTemplate(article);
    });
  };

  // insert the articles into the DOM
  const renderArticles = function(articles) {
    app.innerHTML = generateTemplates(articles).join('');
  };

  // if something went wrong display and error
  const renderError = function(error) {
    app.innerHTML = `<p>Something went wront ${ error }</p>`;
  };

  const run = function() {
    fetch(url + key)
      .then(getJSON)
      .then(renderArticles)
      .catch(renderError);
  };

  run();

})(document);
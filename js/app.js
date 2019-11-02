;(function(d) {

  "use strict";
  /**
   * Variables
   */
  const key = 'RpQ2CoOGTql4vuZ5tBhGjZKOzEaGBt9j',
        sections = ['books', 'business', 'health', 'science', 'technology'],
        url = 'https://api.nytimes.com/svc/topstories/v2/',
        app = d.querySelector('#app');

  /**
   * Functions
   */

  // return data in json format or error message
  const getJSON = function(response) {
    return (response.ok) ? response.json() : Promise.reject(response)
  }

  const formatTime = function(published_date) {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let date = new Date(Date.parse(published_date));

    return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
  };

  // populate article template with data returned
  const articleTemplate = function(article) {
    return `<article>
              <header>
                <h3 class="entry-title">${ article.title }</h3>
                <div class="post-meta">
                  <span class="posted-on">
                    <time datetime="${ article.published_date }">${ formatTime(article.published_date) }</time>,
                  </span>
                  <span class="byline"> ${ article.byline }</span>
                </div>
              </header>
              <div class="entry-content">
                <p>${article.abstract }</p>
              </div>
              <div class="btn">
                <a href="${ article.url }">Tell Me More</a>
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
  const renderSection = function(articles) {
    const section = generateTemplates(articles).slice(0,5);

    section.unshift(`<section><h2>Section: <span class="section">${ articles.section.charAt(0).toUpperCase() + articles.section.slice(1) }</span></h2>`);
    section.push(`</section>`);

    app.innerHTML += section.join('');
  };

  // if something went wrong display and error
  const renderError = function(error) {
    app.innerHTML = `<p>Something went wront ${ error }</p>`;
  };

  // fetch a set of articles
  const run = function() {
    sections.forEach(section => {
      fetch(url + section + '.json?api-key=' + key)
        .then(getJSON)
        .then(renderSection)
        .catch(renderError);
    });
  };

  // start the script
  run();

})(document);
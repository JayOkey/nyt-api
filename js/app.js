;(function(d) {

  "use strict";
  /**
   * Variables
   */
  const key = 'RpQ2CoOGTql4vuZ5tBhGjZKOzEaGBt9j',
        url = 'https://api.nytimes.com/svc/topstories/v2/',
        sections = ['books', 'business', 'health', 'science', 'technology'],
        numOfArticles = 3;
        app = d.querySelector('#app');

  /**
   * Functions
   */

  // return data in json format or error message
  const getJSON = function(response) {
    return (response.ok) ? response.json() : Promise.reject(response)
  }

  // format the article date
  const formatTime = function(published_date) {
    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let date = new Date(Date.parse(published_date));

    return date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
  };

  // sanitizeHTML string
  const sanitizeHTML = function (str) {
    const temp = d.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  // populate article template with data returned
  const articleTemplate = function(article) {

    return `<article>
              <header>
                <h3 class="entry-title">${ sanitizeHTML(article.title) }</h3>
                <div class="post-meta">
                  <span class="byline"> ${ sanitizeHTML(article.byline) }, </span>
                  <span class="posted-on">
                    <time datetime="${ sanitizeHTML(article.published_date) }">${ formatTime(sanitizeHTML(article.published_date)) }</time>
                  </span>
                </div>
              </header>
              <div class="entry-content">
                <p>${ sanitizeHTML(article.abstract) }</p>
              </div>
              <div class="btn">
                <a href="${ sanitizeHTML(article.url) }">Tell Me More</a>
              </div>
            </article>`;
  };

  // convert the array article data into an array of article templates
  const generateTemplates = function(articles) {
    // convert each article in the articles results array into an article template
    return articles.results.map(function(article) {
      return articleTemplate(article);
    });
  };

  // insert the articles into the DOM
  const renderSection = function(articles) {
    // assign articles template array to section array
    const section = generateTemplates(articles).slice(0, numOfArticles);
    // prepend section opening to section array
    section.unshift(`<section><h2>Section: <span class="section">${ sanitizeHTML(articles.section) }</span></h2>`);
    // append closing section tag to the section array
    section.push(`</section>`);
    // convert section array to a string and append it to the app DOM element
    app.innerHTML += section.join('');
  };

  // if something went wrong display and error
  const renderError = function(error) {
    app.innerHTML = `<p>Something went wrong ${ error }</p>`;
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
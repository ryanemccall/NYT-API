const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //The actual API where the data comes from
const key = 'idwdcrq2o1KWWHrSA6ebPlLywYvH1dFO'; //my access key 
let url; //declaring the variable

//SEARCH FORM
const searchTerm = document.querySelector('.search'); 
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none';

let pageNumber = 0;
let displayNav = false;

 //1                     //2   
 searchForm.addEventListener('submit', fetchResults); 
 nextBtn.addEventListener('click', nextPage); //3
 previousBtn.addEventListener('click', previousPage); //3

 previousBtn.style.display = 'none' //it will not appear when the submit button is clicked

//  function fetchResults(e){
//     console.log(e);
// }
 
                    //1
function fetchResults(e) {
  e.preventDefault(); 
  // Assemble the full URL
  url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
//Start and End Date Conditionals
  if(startDate.value !== '') {
    console.log(startDate.value)
  url += '&begin_date=' + startDate.value; //tells the API to start with articles at this date
};

if(endDate.value !== '') {
  url += '&end_date=' + endDate.value; //tells the API to stop articles at this date
};
//The Fetch
  fetch(url)
    .then(function(result) {
    // console.log(result)
    return result.json(); //2
  }).then(function(json) {
    //   console.log(json);
      displayResults(json); //3
  });
}

// function displayResults(json) {
//     console.log(json.response.docs);
//  };

 function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild); //removes the old search before adding the new
  
    }
    let articles = json.response.docs;
    if(articles.length >= 10) {
        nav.style.display = 'block'; //shows the nav display if 10 items are in the array
      } else {
        nav.style.display = 'none'; //hides the nav display if less than 10 items are in the array
      }
    
  
    if(articles.length === 0) {
      console.log("No results");
    } else {
      for(let i = 0; i < articles.length; i++) {
        let article = document.createElement('article');
        let heading = document.createElement('h2');
        let link = document.createElement('a');
        let img = document.createElement('img');  //1
        let para = document.createElement('p');  
        let clearfix = document.createElement('div');
  
        let current = articles[i];
        console.log("Current:", current);
  
        link.href = current.web_url;
        link.textContent = current.headline.main;
  
        para.textContent = 'Keywords: '; //3
  
        //4
        for(let j = 0; j < current.keywords.length; j++) {
            let span = document.createElement('span');   
            span.textContent += current.keywords[j].value + ' ';   
            para.appendChild(span);
          }
    
            //2
          if(current.multimedia.length > 0) {
            //3
            img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
            //4
            img.alt = current.headline.main;
          }
    
          clearfix.setAttribute('class','clearfix');
    
          article.appendChild(heading);
          heading.appendChild(link);
          article.appendChild(img); //5
          article.appendChild(para);
          article.appendChild(clearfix);
          section.appendChild(article);
      }
    }
  };

  function nextPage(e) {
    pageNumber++; //1
    if (pageNumber >= 1){
      previousBtn.style.display = 'block' //once the next button is clicked the Previous button will appear
    } else {
      previousBtn.style.display = 'none'
    } 
    fetchResults(e);  //2
    console.log("Page number:", pageNumber); //3
   
 };

 
  function previousPage(e) {
    if(pageNumber === 0) { 
      pageNumber--; 
    } else if (pageNumber === 0){
      previousBtn.style.display = 'none' //when we click the previous button back to page 0 it will disappear again
    } else {
      return
    }
    fetchResults(e); 
    console.log("Page:", pageNumber); //5
  
  };
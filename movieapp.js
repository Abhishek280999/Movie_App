var typed = new Typed("header>span", {
    strings:["This is Movie", "Searching " , "Movie Site"],
    typeSpeed:100,
    backSpeed:200,
    loop: true
  })

function popularMovies() {
  let chge = Math.round(Math.random() * 50);
  fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=1447d4f737dd4971da82722a19bcddb6&language=en-US&page=${chge}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data.results)
      popularMovies_append(data.results);
    })
    .catch((error) => {
      console.log(error);
    });
}

function popularMovies_append(item) {
  item.forEach((element) => {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    div2.setAttribute("class", "div2");
    let poster_path = document.createElement("img");
    let original_title = document.createElement("h3");
    let release_date = document.createElement("h3");
    let vote_average = document.createElement("h3");

    poster_path.src = `https://image.tmdb.org/t/p/original/${element.poster_path}`;
    original_title.innerHTML = " Title : " + element.original_title;
    release_date.innerHTML =
      ' <i class="far fa-calendar-alt"></i>  ' + element.release_date;
    vote_average.innerHTML =
      ' <i class="fas fa-star"></i>  ' + element.vote_average + "/10";

    div1.append(poster_path);
    div2.append(original_title, release_date, vote_average);
    div.append(div1, div2);
    document.querySelector(".details").append(div);

    div.addEventListener("click", function () {
      getdetails(element);
    });
  });
}

popularMovies();

function getdetails(item) {
  localStorage.setItem("MovieDetails", JSON.stringify(item));
  window.location.href = "Moviedetails.html";
}

let bomb;

function debounce(func, delay) {
  clearTimeout(bomb);
  bomb = setTimeout(function () {
    func();
  }, delay);
}

async function Movie_Search() {
  try {
    let input = document.getElementById("name").value;
    console.log(input);
    let res = fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=10ac63d1d504ae240549f06c6cc417b4&query=${input}`
    );
    let data =  res.json();
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    console.log("worked finally");
  }
}

 function displayMovie() {
  let movie_data =  Movie_Search();

  if (movie_data === undefined) {
    return false;
  }

  showSearchMovies(movie_data.results);
}

function showSearchMovies(result) {
  document.getElementById("searchResult").innerHTML = "";
  document.getElementById("searchResult").style.display = "block";
  //console.log(result)
  result.forEach(function (item) {
    let div = document.createElement("div");
    div.setAttribute("id", "searchdiv");

    div.addEventListener("click", function () {
      getdetails(item);
    });
    let imgdiv = document.createElement("div");
    imgdiv.setAttribute("class", "imgdiv");
    let img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/original/${item.poster_path}`;
    let div1 = document.createElement("div");
    div1.setAttribute("id", "searchdiv1");
    let title1 = document.createElement("h3");
    title1.textContent = item.title;
    let year1 = document.createElement("h5");
    year1.textContent = item.release_date;
    year1.style.margin = "10px";

    imgdiv.append(img);
    div1.append(title1, year1);
    div.append(imgdiv, div1);
    document.getElementById("searchResult").append(div);
  });
}

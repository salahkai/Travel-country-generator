// to do :
// add images watermark(copyrights of api)
// accessibility
// semantics
// FIX THE BUGS

//toggle html element display propriety
function displayNonListener(className, btn) {
  btn.addEventListener("click", () => {
    className.classList.toggle("display-none");
  });
}

const mainActionWrapper = document.querySelector(".main-actions-wrap");
const mainHeader = document.getElementById("main-header");

const descriptionHeader = document.getElementById("description");
// toggle navbar
const toggleNavbarListBtn = document.getElementById("navbar-list-toggle");
const navbarList = document.getElementById("navbar-list");
displayNonListener(navbarList, toggleNavbarListBtn);

// add backgrounds to the bg list
// background name syntax : bg-"NUMBER".jpg
const backgroundsNumber = 2;
const backgroundList = [];
for (let i = 1; i <= backgroundsNumber; i++) {
  if (backgroundsNumber < 10) {
    backgroundList.push(`bg-0${i}.jpg`);
  } else {
    backgroundList.push(`bg-${i}.jpg`);
  }
}
const mainBg = document.querySelector(".main-background-image");
let homePage = true;

// set the background change function to  asynchronous code it wont block the browser
const backgroundTimeout = setTimeout(() => {
  mainBg.style.backgroundImage = `url('img/background/${
    backgroundList[Math.floor(Math.random() * backgroundList.length)]
  }')`;
}, 8000);

let basicCountryDataUrl = function generateCountryDataUrl() {
  return `https://restcountries.com/v3/alpha/${
    countries[Math.floor(Math.random() * countries.length)]
  }`;
};
const basicCountryPicturesUrl =
  "https://pixabay.com/api/?key=15643255-c14fd74146a2b3a7c702fd55d&image_type=photo&category=places&per_page=3&q=";
const basicCountryDescription =
  "https://en.wikivoyage.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&titles=";
const countryDataScoresUrl = "https://cost-of-living-data.vercel.app/";
const countryWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=,";
// const ClientIpUrl = "http://ip-api.com/json/";
// const countryFlightsUrl = "https://tequila-api.kiwi.com/v2/search";
const getCountryBasicData = async (url) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const {
      name,
      subregion,
      population,
      flags,
      currencies,
      languages,
      capital,
      maps,
      cca2,
    } = data[0];

    const countryBasicData = {
      name: name.common,
      subregion,
      population,
      flag: flags[0],
      currency: Object.keys(currencies)[0],
      language: languages[Object.keys(languages)[0]],
      map: maps[Object.keys(maps)[0]],
      code: cca2,
    };
    let capitals = "";
    capital.map((c) => {
      capitals = capitals + c;
    });
    countryBasicData.capitals = capitals;
    return countryBasicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};

const getCountryPictures = async (url, basicData) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const countryPictures = [];
    data.hits.map((c) => {
      countryPictures.push(c.largeImageURL);
    });
    basicData.pictures = countryPictures;

    return basicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};

const navbar = document.querySelector(".navbar");
const mainContent = document.querySelector(".main-content");
let activeHomepage = false;
const moreDetailsBtn = document.querySelector(".more-details-scroll");
const mainContentArea = document.querySelector(".main-content-area");
const sidebar = document.querySelector(".sidebar");
const cardCountryName = document.querySelector(".card-country-name");
const cardCountryFlag = document.querySelector(".card-country-flag");
const cardPopulation = document.querySelector(".card-population");
const cardLanguages = document.querySelector(".card-languages");
const cardCurrencies = document.querySelector(".card-currencies");
const cardCapitals = document.querySelector(".card-capitals");
const mapIframe = document.querySelector(".map-iframe");
const overallSection = document.getElementById("overall-section");
const budgetSection = document.getElementById("budget-section");

const getCountryDescription = async (url, basicData) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    let shortDescriptionSplit =
      data.query.pages[Object.keys(data.query.pages)[0]].extract.split(".");
    let extractedDescription = (
      shortDescriptionSplit[0] +
      "." +
      shortDescriptionSplit[1] +
      "."
    )
      .split(/\s?\(.*\)\s?/gi)
      .join("");

    basicData.description = extractedDescription;
    return basicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};

const getCountrySCores = async (url, basicData) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const safety = data.values[1];
    const cost = data.values[4];
    const healthCare = data.values[2];
    const climate = data.values[3];
    const traffic = data.values[6];
    const pollution = data.values[7];

    basicData.scores = {
      safety: {
        score: safety.value,
        level: safety.level,
      },
      cost: {
        score: cost.value,
        level: cost.level,
      },
      healthCare: {
        score: healthCare.value,
        level: healthCare.level,
      },
      climate: {
        score: climate.value,
        level: climate.level,
      },
      traffic: {
        score: traffic.value,
        level: traffic.level,
      },
      pollution: {
        score: pollution.value,
        level: pollution.level,
      },
    };
    return basicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};
const getCountryWeather = async (url, basicData) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    const { description, icon } = data.weather[0];
    basicData.weather = {
      description,
      icon: `http://openweathermap.org/img/w/${icon}.png`,
    };
    return basicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};
const getCountryPrices = async (url, basicData) => {
  const res = await fetch(url);
  try {
    const data = await res.json();
    basicData.prices = data;
    return basicData;
  } catch (error) {
    console.log(new Error(error.message));
  }
};
// const getCountryPlanePrices = async (url, basicData) => {
//   const res = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       apikey: "C_nu0I0leRGSgUVCCJ8aU3PL8RtaEG2l",
//     },
//   });
//   try {
//     const data = await res.json();
//     console.log(data);
//     return basicData;
//   } catch (error) {
//     console.log(new Error(error.message));
//   }
// };
// const getClientCountry = async (url, basicData) => {
//   const res = await fetch(url);
//   try {
//     const data = await res.json();
//     basicData.userCountryCode = data.countryCode;
//     console.log(basicData.userCountryCode);
//     return basicData;
//   } catch (error) {
//     console.log(new Error(error.message));
//   }
// };

function generateCountry() {
  generatBtn.innerHTML =
    '<i class="fa-solid fa-arrow-rotate-right"></i> Find again';
  if (!activeHomepage) {
    navbar.classList.toggle("navbar-active");
    mainContent.classList.toggle("active-main-content");
    mainContentArea.classList.toggle("main-content-area-active");
    moreDetailsBtn.classList.toggle("display-none");
    sidebar.classList.toggle("display-none");
    overallSection.classList.toggle("display-none-important");
    budgetSection.classList.toggle("display-none-important");
    activeHomepage = true;
  }

  getCountryBasicData(basicCountryDataUrl())
    .then((basicData) => {
      mainHeader.textContent = basicData.name;
      cardCountryName.textContent = basicData.name;
      cardCountryFlag.setAttribute("src", basicData.flag);
      cardPopulation.textContent = basicData.population;
      cardLanguages.textContent = basicData.language;
      cardCurrencies.textContent = basicData.currency;
      cardCapitals.textContent = basicData.capitals;
      mapIframe.setAttribute(
        "src",
        `https://www.google.com/maps/embed/v1/search?key=AIzaSyDLwwdjlq5oMGKnQ2gYEFGHx1sUyP7hcOc&q=${basicData.name}`
      );
      console.log(
        `${countryDataScoresUrl + basicData.name.replace(/\s/g, "+")}`
      );
      return getCountryDescription(
        basicCountryDescription + basicData.name,
        basicData
      );
    })
    .then((basicData) => {
      descriptionHeader.textContent = basicData.description;
      return basicData;
    })
    .then((basicData) => {
      return getCountryPictures(
        basicCountryPicturesUrl + basicData.name,
        basicData
      );
    })
    .then((basicData) => {
      mainBg.style.backgroundImage = `url(${basicData.pictures[0]})`;
      clearTimeout(backgroundTimeout);
      return basicData;
    })
    .then((basicData) => {
      return getCountrySCores(
        `${
          countryDataScoresUrl + basicData.name.replace(/\s/, "+")
        }?type=scores`,
        basicData
      );
    })
    .then((basicData) => {
      const internetSpeedRanking =
        (internetSpeed.indexOf(basicData.name) / internetSpeed.length) * 100;
      const safety = parseInt(basicData.scores.safety.score);
      const cost = parseInt(basicData.scores.cost.score);
      const overallRanking = (safety + cost + internetSpeedRanking) / 3;
      scoreBar(".overall-bar", overallRanking, true);
      scoreBar(".safety-bar", safety, true);
      scoreBar(".cost-bar", cost, false);
      scoreBar(".internet-bar", internetSpeedRanking, true);

      return basicData;
    })
    .then((basicData) => {
      return getCountryWeather(
        `${
          countryWeatherUrl + basicData.code
        }&appid=a4f8e8cc37bf4c25ffa0b6cdad70bf97`,
        basicData
      );
    })
    .then((basicData) => {
      const factsListClass = document.querySelector(".facts-list");
      const weatherLi = `The Sky in ${basicData.name} today has  ${basicData.weather.description}.`;
      const pollutionLi = `Its pollution is considered ${basicData.scores.pollution.level}.`;
      const healthLi = `${basicData.name} has a ${basicData.scores.healthCare.level} health care service`;
      const trafficLi = `Its traffic commute time is ${basicData.scores.traffic.level}`;
      const factsList = [weatherLi, pollutionLi, healthLi, trafficLi];

      factsList.map((li) => {
        const element = document.createElement("li");
        element.innerText = li;
        factsListClass.appendChild(element);
      });
      return basicData;
    })
    .then((basicData) => {
      return getCountryPrices(
        `${countryDataScoresUrl + basicData.name.replace(/\s/, "+")}`,
        basicData
      );
    })
    .then((basicData) => {
      budgetTableGenerate(basicData.prices);
    })
    .then((basicData) => {})
    // .then((basicData) => {
    //   return getClientCountry(ClientIpUrl, basicData);
    // })
    //
    // .then((basicData) => {
    //   return getCountryPlanePrices(
    //     `${countryFlightsUrl}#{countryHotelsUrl}fly_from=${basicData.userCountryCode}&fly_to${basicData.countryCode}&sort=price&limit=1&adults=1&children=0`,
    //     basicData
    //   );
    // })

    .catch((error) => {
      console.log(new Error(error.message));
    });
}

// create a progress bar for scores and set colors depending on its value
function scoreBar(divClass, value, isRankingDescending) {
  barDiv = document.querySelector(divClass);
  barDiv.style.width = `${value}%`;
  const colors = ["#DC3545", "#FFC107", "white", "#28A745"];
  let color;
  if (!isRankingDescending) {
    colors.reverse();
  }
  switch (true) {
    case value < 25:
      color = colors[0];
      break;
    case value >= 25 || value < 50:
      color = colors[1];
      break;
    case value >= 50 || value < 75:
      color = colors[2];
      break;
    case value > 75:
      color = colors[3];
      break;
  }
  barDiv.style.backgroundColor = color;
}

const budgetTable = document.querySelector(".budget-table");
function budgetTableGenerate(data) {
  const tableData = budgetTable.querySelectorAll("td");
  tableData.forEach((td) => {
    data.values.map((item) => {
      if (td.textContent === item.item) {
        const tdParent = td.parentNode;
        const tableData = document.createElement("td");
        tableData.textContent = `${item.value}$`;
        tdParent.appendChild(tableData);
      }
    });
  });
}

// get the closest section on the screen ( to the screen center)
function detectClosestSectionInView(...sections) {
  const yCoordinates = [];
  for (let section in sections) {
    const elementSelected = document.querySelector(sections[section]);
    const yCoordinate = Math.abs(elementSelected.getBoundingClientRect().y);
    yCoordinates.push([yCoordinate, sections[section]]);
  }
  const sortedYCoordinates = yCoordinates.sort((a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  });
  const closestSectionName = sortedYCoordinates[0][1];
  return closestSectionName;
}
let currentSidebarItem = document.querySelector("#country-sidebar");
const sectionSidebarListsCombinations = [
  ["#country-sidebar", "#main-section"],
  ["#overall-sidebar", "#overall-section"],
  ["#budget-sidebar", "#budget-section"],
];

const sectionSidebarList = [];
for (let i = 0; i < sectionSidebarListsCombinations.length; i++) {
  sectionSidebarList.push(sectionSidebarListsCombinations[i][1]);
}
// sidebar item auto color correspondent section
function selectSidebarItem() {
  const closestSectionName = detectClosestSectionInView(...sectionSidebarList);
  const correspondingSidebarItemName = sectionSidebarListsCombinations.filter(
    (c) => c[1] == closestSectionName
  )[0][0];
  const correspondingSidebarItem = document.querySelector(
    correspondingSidebarItemName
  );
  currentSidebarItem.classList.toggle("selected-sidebar-item");
  correspondingSidebarItem.classList.toggle("selected-sidebar-item");
  currentSidebarItem = correspondingSidebarItem;
}
document.addEventListener("scroll", selectSidebarItem);
const generatBtn = document.getElementById("search-btn");
generatBtn.addEventListener("click", generateCountry);

const cardImages = document.querySelector(".card-images");
const firstCardImage = document.getElementById("card-scores-image");
const cardBtns = document.querySelectorAll(".card-btn");

let previousCardBtn = document.getElementById("card-btn-scores");

// Card buttons select effect
function cardBtnsClick(btn) {
  const image = document.getElementById(btn.getAttribute("image"));
  const content = document.getElementById(btn.getAttribute("content"));
  const previousContent = document.getElementById(
    previousCardBtn.getAttribute("content")
  );

  const imagesDistance = firstCardImage.offsetLeft - image.offsetLeft;
  const ImageAnimation = [{}, { left: imagesDistance + "px" }];
  const ImageAnimationTiming = {
    duration: 800,
    iterations: 1,
    fill: "forwards",
    direction: "alternate",
  };
  currentCardBtn = document.getElementById(btn.id);

  if (previousCardBtn.id != currentCardBtn.id) {
    content.classList.toggle("display-none");
    previousContent.classList.toggle("display-none");
    currentCardBtn.classList.toggle("card-nav-selected");
    previousCardBtn.classList.toggle("card-nav-selected");
    previousCardBtn = currentCardBtn;
  }

  cardImages.animate(ImageAnimation, ImageAnimationTiming);
}
cardBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    cardBtnsClick(btn);
  });
});

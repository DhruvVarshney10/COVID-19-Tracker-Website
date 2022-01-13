const countrynameelement = document.querySelector(".country .countryname");
const totalcaseselement = document.querySelector(".totalcases .value");
const newcaseselem = document.querySelector(".totalcases .changingvalue");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .changingvalue");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .changingvalue");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];

  fetch("https://api.ipgeolocation.io/ipgeo?apiKey=14c7928d2aef416287e034ee91cd360d")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let country_code = data.country_code2;
    let user_country;
    country_list.forEach((country) => {
      if (country.code == country_code) {
        user_country = country.name;
      }
    });
    fetchData(user_country);
  });

console.log(user_country);

  function fetchData(country) {
	user_country = country;
	countrynameelement.innerHTML = "Loading...";
  
	(cases_list = []),
	  (recovered_list = []),
	  (deaths_list = []),
	  (dates = []),
	  (formatedDates = []);
  
	var requestOptions = {
	  method: "GET",
	  redirect: "follow",
	};
  
	const api_fetch = async (country) => {
	  await fetch(
		"https://api.covid19api.com/total/country/" + country + "/status/confirmed",
		requestOptions
	  )
		.then((res) => {
		  return res.json();
		})
		.then((data) => {
		  data.forEach((entry) => {
			dates.push(entry.Date);
			cases_list.push(entry.Cases);
		  });
		});
  
  
	  await fetch(
		"https://api.covid19api.com/total/country/" + country + "/status/deaths",
		requestOptions
	  )
		.then((res) => {
		  return res.json();
		})
		.then((data) => {
		  data.forEach((entry) => {
			deaths_list.push(entry.Cases);
		  });
		});
  
	  updateUI();
	};
  
	api_fetch(country);
  }
  
  // UPDATE UI FUNCTION
  function updateUI() {
	updateStats();
	axesLinearChart();
  }
  
  function updateStats() {
	const total_cases = cases_list[cases_list.length - 1];
	const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];
  
	 const total_recovered = recovered_list[recovered_list.length - 1];
	 const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];
  
	const total_deaths = deaths_list[deaths_list.length - 1];
	const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];
  
	countrynameelement.innerHTML = user_country;
	totalcaseselement.innerHTML = total_cases;
	newcaseselem.innerHTML = `+${new_confirmed_cases}`;
	recovered_element.innerHTML = total_recovered;
	new_recovered_element.innerHTML = `+${new_recovered_cases}`;
	deaths_element.innerHTML = total_deaths;
	new_deaths_element.innerHTML = `+${new_deaths_cases}`;
  
	// format dates
	dates.forEach((date) => {
	  formatedDates.push(formatDate(date));
	});
  }
  

  
  // FORMAT DATES
  const monthsNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
  ];
  
  function formatDate(dateString) {
	let date = new Date(dateString);
  
	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
  }
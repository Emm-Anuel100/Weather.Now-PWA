"use strict";

// initialize variables
var input_box = document.querySelector('#input-box');
var results_box = document.querySelector('.result-box');
var label = document.querySelector('.input-label'); // When clicked on the input form

input_box.addEventListener('click', function (event) {
  event.preventDefault(); // Add label class list

  label.classList.add('active');
}); // When clicked outside of the input box

document.addEventListener('click', function (event) {
  // Check if the click target is not the input box or the label and if there are no values in the input box
  if (event.target !== input_box && event.target !== label && input_box.value === "") {
    // Remove the active class from the label
    label.classList.remove('active');
  }
}); //##  auto-complete search bar starts here

var available_cities = new Array("New York", "London", "Paris", "Tokyo", "Los Angeles", "Beijing", "Shanghai", "Singapore", "Hong Kong", "Dubai", "Sydney", "Toronto", "San Francisco", "Chicago", "Bangkok", "Berlin", "Moscow", "Barcelona", "Madrid", "Rome", "Mumbai", "São Paulo", "Mexico City", "Istanbul", "Kuala Lumpur", "Jakarta", "Seoul", "Taipei", "Vancouver", "Melbourne", "Lisbon", "Dublin", "Cape Town", "Rio de Janeiro", "Buenos Aires", "Lagos", "Cairo", "Helsinki", "Stockholm", "Oslo", "Warsaw", "Prague", "Vienna", "Budapest", "Copenhagen", "Brussels", "Amsterdam", "Zurich", "Geneva", "Munich", "Frankfurt", "Hamburg", "Lyon", "Nice", "Marseille", "Lille", "Nantes", "Bordeaux", "Montreal", "Quebec City", "Ottawa", "Edmonton", "Calgary", "Winnipeg", "Halifax", "Charlottetown", "Fredericton", "Saint John", "Moncton", "St. John's", "Auckland", "Christchurch", "Wellington", "Dunedin", "Invercargill", "Hobart", "Adelaide", "Brisbane", "Perth", "Canberra", "Gold Coast", "Newcastle", "Sunshine Coast", "Wollongong", "Geelong", "Ballarat", "Bendigo", "Toowoomba", "Albury", "Mackay", "Townsville", "Cairns", "Bundaberg", "Hervey Bay", "Rockhampton", "Gladstone", "Devonport", "Burnie", "Launceston", "Darwin", "Alice Springs", "Port Vila", "Nouméa", "Honiara", "Apia", "Nuku'alofa", "Suva", "Port Moresby", "Wellington", "Christchurch", "Auckland", "Hamilton", "Tauranga", "Dunedin", "Palmerston North", "Nelson", "Rotorua", "New Plymouth", "Gisborne", "Napier", "Hastings", "Invercargill", "Whanganui", "Whangarei", "Kaitaia", "Masterton", "Paraparaumu", "Levin", "Te Awamutu", "Pukekohe", "Upper Hutt", "Lower Hutt", "Taupo", "Timaru", "Blenheim", "Porirua", "Whakatane", "Queenstown", "Oamaru", "Ashburton", "Greymouth", "Wanaka", "Waitara", "Gore", "Alexandra", "Feilding", "Waihi", "Thames", "Kaitaia", "Paihia", "Raglan", "Rangiora", "Kaitangata", "Milton", "Otematata", "Otorohanga", "Balclutha", "Waihi Beach", "Waiuku", "Wairoa", "Marton", "Hawera", "Tokoroa", "Turangi", "Otautau", "Ohakune", "Kaitaia", "Waikanae", "Kaitaia", "Levin", "Mangonui", "Kaitaia", "Kaikoura", "Mangere", "Ponsonby", "Ponsonby", "Mount Eden", "Mount Wellington", "Mount Albert", "Manurewa", "Papakura", "Botany Downs", "Manukau City", "Henderson", "Glen Eden", "New Lynn", "Mount Roskill", "Mount Roskill", "Saint Johns", "Ellerslie", "Epsom", "Ponsonby", "Takapuna", "Devonport", "North Shore City", "Albany", "Glenfield", "Browns Bay", "Forrest Hill", "Milford", "Glen Eden", "Glen Eden", "Glen Eden", "Te Atatu Peninsula", "Henderson", "Green Bay", "Blockhouse Bay", "Avondale", "Lynfield", "Mount Roskill", "Mount Albert", "Birkdale", "Beach Haven", "Sunnynook", "Torbay", "Northcote", "Birkenhead", "Glenfield", "Takapuna", "Devonport", "Albany", "Greenhithe", "Paremoremo", "Schnapper Rock", "Coatesville", "Riverhead", "Helensville", "Warkworth", "Puhoi", "Orewa", "Whangaparaoa", "Hibiscus Coast", "Red Beach", "Silverdale", "Stanmore Bay", "Whangaparaoa", "Warkworth", "Snells Beach", "Matakana", "Leigh", "Wellsford", "Kaiwaka", "Mangawhai", "Ruakaka", "Waipu", "Waipu Cove", "Marsden Point", "Hikurangi", "Kamo", "Whangarei Heads", "Onerahi", "Whangarei", "Dargaville", "Kaipara Harbour", "Rawene", "Kaikohe", "Kaitaia", "Kerikeri", "Paihia", "Russell", "Opua", "Mangonui", "Kaeo", "Ahipara", "Horeke", "Doubtless Bay", "Mangonui", "Coopers Beach", "Karikari Peninsula", "Karikari Beach", "Whatuwhiwhi", "Kaitaia", "Awanui", "Houhora", "Pukenui", "Kaitaia"); // when user starts inputing a value

input_box.oninput = function () {
  var result = new Array();
  var input = input_box.value;

  if (input.length) {
    result = available_cities.filter(function (keyword) {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
    console.log(result);
  }

  display_outputs(result);

  if (!result.length) {
    results_box.innerHTML = "";
  }
};

function display_outputs(result) {
  var content = result.map(function (list) {
    return "<li onclick=selectinput(this)>" + list + "</li>";
  });
  results_box.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectinput(list) {
  input_box.value = list.innerHTML;
  results_box.innerHTML = ""; // hide all elements when clicked on one
} //## auto-complete search bar ends here
// World Route Explorer — Shared Data Module
// All capitals, utility functions, TSP solver

export const CAPITALS = [
  ["Afghanistan","Kabul",34.5253,69.1783,"AF","Asia"],
  ["Albania","Tirana",41.3275,19.8187,"AL","Europe"],
  ["Algeria","Algiers",36.7538,3.0588,"DZ","Africa"],
  ["Andorra","Andorra la Vella",42.5063,1.5218,"AD","Europe"],
  ["Angola","Luanda",-8.839,13.2894,"AO","Africa"],
  ["Antigua and Barbuda","St. John's",17.1274,-61.8468,"AG","NAmerica"],
  ["Argentina","Buenos Aires",-34.6037,-58.3816,"AR","SAmerica"],
  ["Armenia","Yerevan",40.1792,44.4991,"AM","Europe"],
  ["Australia","Canberra",-35.2809,149.13,"AU","Oceania"],
  ["Austria","Vienna",48.2082,16.3738,"AT","Europe"],
  ["Azerbaijan","Baku",40.4093,49.8671,"AZ","Europe"],
  ["Bahamas","Nassau",25.048,-77.3554,"BS","NAmerica"],
  ["Bahrain","Manama",26.2285,50.586,"BH","Asia"],
  ["Bangladesh","Dhaka",23.8103,90.4125,"BD","Asia"],
  ["Barbados","Bridgetown",13.1132,-59.5988,"BB","NAmerica"],
  ["Belarus","Minsk",53.9006,27.559,"BY","Europe"],
  ["Belgium","Brussels",50.8503,4.3517,"BE","Europe"],
  ["Belize","Belmopan",17.251,-88.759,"BZ","NAmerica"],
  ["Benin","Porto-Novo",6.4969,2.6289,"BJ","Africa"],
  ["Bhutan","Thimphu",27.4728,89.639,"BT","Asia"],
  ["Bolivia","Sucre",-19.0196,-65.2619,"BO","SAmerica"],
  ["Bosnia and Herzegovina","Sarajevo",43.8563,18.4131,"BA","Europe"],
  ["Botswana","Gaborone",-24.6282,25.9231,"BW","Africa"],
  ["Brazil","Brasília",-15.7975,-47.8919,"BR","SAmerica"],
  ["Brunei","Bandar Seri Begawan",4.9031,114.9398,"BN","Asia"],
  ["Bulgaria","Sofia",42.6977,23.3219,"BG","Europe"],
  ["Burkina Faso","Ouagadougou",12.3714,-1.5197,"BF","Africa"],
  ["Burundi","Gitega",-3.4264,29.9246,"BI","Africa"],
  ["Cabo Verde","Praia",14.9331,-23.5133,"CV","Africa"],
  ["Cambodia","Phnom Penh",11.5564,104.9282,"KH","Asia"],
  ["Cameroon","Yaoundé",3.848,11.5021,"CM","Africa"],
  ["Canada","Ottawa",45.4215,-75.6972,"CA","NAmerica"],
  ["Central African Republic","Bangui",4.3947,18.5582,"CF","Africa"],
  ["Chad","N'Djamena",12.1348,15.0557,"TD","Africa"],
  ["Chile","Santiago",-33.4489,-70.6693,"CL","SAmerica"],
  ["China","Beijing",39.9042,116.4074,"CN","Asia"],
  ["Colombia","Bogotá",4.711,-74.0721,"CO","SAmerica"],
  ["Comoros","Moroni",-11.7172,43.2473,"KM","Africa"],
  ["Congo (DRC)","Kinshasa",-4.4419,15.2663,"CD","Africa"],
  ["Congo (Republic)","Brazzaville",-4.2634,15.2429,"CG","Africa"],
  ["Costa Rica","San José",9.9281,-84.0907,"CR","NAmerica"],
  ["Côte d'Ivoire","Yamoussoukro",6.8276,-5.2893,"CI","Africa"],
  ["Croatia","Zagreb",45.815,15.9819,"HR","Europe"],
  ["Cuba","Havana",23.1136,-82.3666,"CU","NAmerica"],
  ["Cyprus","Nicosia",35.1856,33.3823,"CY","Europe"],
  ["Czech Republic","Prague",50.0755,14.4378,"CZ","Europe"],
  ["Denmark","Copenhagen",55.6761,12.5683,"DK","Europe"],
  ["Djibouti","Djibouti",11.588,43.1456,"DJ","Africa"],
  ["Dominica","Roseau",15.301,-61.387,"DM","NAmerica"],
  ["Dominican Republic","Santo Domingo",18.4861,-69.9312,"DO","NAmerica"],
  ["East Timor","Dili",-8.5569,125.5603,"TL","Asia"],
  ["Ecuador","Quito",-0.1807,-78.4678,"EC","SAmerica"],
  ["Egypt","Cairo",30.0444,31.2357,"EG","Africa"],
  ["El Salvador","San Salvador",13.6929,-89.2182,"SV","NAmerica"],
  ["Equatorial Guinea","Malabo",3.7504,8.7371,"GQ","Africa"],
  ["Eritrea","Asmara",15.3229,38.9251,"ER","Africa"],
  ["Estonia","Tallinn",59.437,24.7536,"EE","Europe"],
  ["Eswatini","Mbabane",-26.3054,31.1367,"SZ","Africa"],
  ["Ethiopia","Addis Ababa",9.025,38.7469,"ET","Africa"],
  ["Fiji","Suva",-18.1416,178.4419,"FJ","Oceania"],
  ["Finland","Helsinki",60.1699,24.9384,"FI","Europe"],
  ["France","Paris",48.8566,2.3522,"FR","Europe"],
  ["Gabon","Libreville",0.4162,9.4673,"GA","Africa"],
  ["Gambia","Banjul",13.4549,-16.579,"GM","Africa"],
  ["Georgia","Tbilisi",41.7151,44.8271,"GE","Europe"],
  ["Germany","Berlin",52.52,13.405,"DE","Europe"],
  ["Ghana","Accra",5.6037,-0.187,"GH","Africa"],
  ["Greece","Athens",37.9838,23.7275,"GR","Europe"],
  ["Grenada","St. George's",12.0564,-61.7485,"GD","NAmerica"],
  ["Guatemala","Guatemala City",14.6349,-90.5069,"GT","NAmerica"],
  ["Guinea","Conakry",9.6412,-13.5784,"GN","Africa"],
  ["Guinea-Bissau","Bissau",11.8037,-15.1804,"GW","Africa"],
  ["Guyana","Georgetown",6.8013,-58.1551,"GY","SAmerica"],
  ["Haiti","Port-au-Prince",18.5944,-72.3074,"HT","NAmerica"],
  ["Honduras","Tegucigalpa",14.0723,-87.1921,"HN","NAmerica"],
  ["Hungary","Budapest",47.4979,19.0402,"HU","Europe"],
  ["Iceland","Reykjavik",64.1466,-21.9426,"IS","Europe"],
  ["India","New Delhi",28.6139,77.209,"IN","Asia"],
  ["Indonesia","Jakarta",-6.2088,106.8456,"ID","Asia"],
  ["Iran","Tehran",35.6892,51.389,"IR","Asia"],
  ["Iraq","Baghdad",33.3152,44.3661,"IQ","Asia"],
  ["Ireland","Dublin",53.3498,-6.2603,"IE","Europe"],
  ["Israel","Jerusalem",31.7683,35.2137,"IL","Asia"],
  ["Italy","Rome",41.9028,12.4964,"IT","Europe"],
  ["Jamaica","Kingston",18.0179,-76.8099,"JM","NAmerica"],
  ["Japan","Tokyo",35.6762,139.6503,"JP","Asia"],
  ["Jordan","Amman",31.9454,35.9284,"JO","Asia"],
  ["Kazakhstan","Astana",51.1694,71.4491,"KZ","Asia"],
  ["Kenya","Nairobi",-1.2921,36.8219,"KE","Africa"],
  ["Kiribati","Tarawa",1.4518,173.032,"KI","Oceania"],
  ["Kosovo","Pristina",42.6629,21.1655,"XK","Europe"],
  ["Kuwait","Kuwait City",29.3759,47.9774,"KW","Asia"],
  ["Kyrgyzstan","Bishkek",42.8746,74.5698,"KG","Asia"],
  ["Laos","Vientiane",17.9757,102.6331,"LA","Asia"],
  ["Latvia","Riga",56.9496,24.1052,"LV","Europe"],
  ["Lebanon","Beirut",33.8938,35.5018,"LB","Asia"],
  ["Lesotho","Maseru",-29.3142,27.4833,"LS","Africa"],
  ["Liberia","Monrovia",6.2907,-10.7605,"LR","Africa"],
  ["Libya","Tripoli",32.8872,13.1913,"LY","Africa"],
  ["Liechtenstein","Vaduz",47.141,9.5209,"LI","Europe"],
  ["Lithuania","Vilnius",54.6872,25.2797,"LT","Europe"],
  ["Luxembourg","Luxembourg City",49.6117,6.13,"LU","Europe"],
  ["Madagascar","Antananarivo",-18.8792,47.5079,"MG","Africa"],
  ["Malawi","Lilongwe",-13.9626,33.7741,"MW","Africa"],
  ["Malaysia","Kuala Lumpur",3.139,101.6869,"MY","Asia"],
  ["Maldives","Malé",4.1755,73.5093,"MV","Asia"],
  ["Mali","Bamako",12.6392,-8.0029,"ML","Africa"],
  ["Malta","Valletta",35.8989,14.5146,"MT","Europe"],
  ["Marshall Islands","Majuro",7.1164,171.1858,"MH","Oceania"],
  ["Mauritania","Nouakchott",18.0735,-15.9582,"MR","Africa"],
  ["Mauritius","Port Louis",-20.1609,57.5012,"MU","Africa"],
  ["Mexico","Mexico City",19.4326,-99.1332,"MX","NAmerica"],
  ["Micronesia","Palikir",6.9248,158.161,"FM","Oceania"],
  ["Moldova","Chișinău",47.0105,28.8638,"MD","Europe"],
  ["Monaco","Monaco",43.7384,7.4246,"MC","Europe"],
  ["Mongolia","Ulaanbaatar",47.8864,106.9057,"MN","Asia"],
  ["Montenegro","Podgorica",42.4304,19.2594,"ME","Europe"],
  ["Morocco","Rabat",34.0209,-6.8416,"MA","Africa"],
  ["Mozambique","Maputo",-25.9692,32.5732,"MZ","Africa"],
  ["Myanmar","Naypyidaw",19.7633,96.0785,"MM","Asia"],
  ["Namibia","Windhoek",-22.5609,17.0658,"NA","Africa"],
  ["Nauru","Yaren",-0.5477,166.9209,"NR","Oceania"],
  ["Nepal","Kathmandu",27.7172,85.324,"NP","Asia"],
  ["Netherlands","Amsterdam",52.3676,4.9041,"NL","Europe"],
  ["New Zealand","Wellington",-41.2865,174.7762,"NZ","Oceania"],
  ["Nicaragua","Managua",12.115,-86.2362,"NI","NAmerica"],
  ["Niger","Niamey",13.5127,2.1128,"NE","Africa"],
  ["Nigeria","Abuja",9.0579,7.4951,"NG","Africa"],
  ["North Korea","Pyongyang",39.0392,125.7625,"KP","Asia"],
  ["North Macedonia","Skopje",41.9973,21.428,"MK","Europe"],
  ["Norway","Oslo",59.9139,10.7522,"NO","Europe"],
  ["Oman","Muscat",23.588,58.3829,"OM","Asia"],
  ["Pakistan","Islamabad",33.6844,73.0479,"PK","Asia"],
  ["Palau","Ngerulmud",7.5006,134.6242,"PW","Oceania"],
  ["Panama","Panama City",8.9824,-79.5199,"PA","NAmerica"],
  ["Papua New Guinea","Port Moresby",-6.3149,147.1803,"PG","Oceania"],
  ["Paraguay","Asunción",-25.2637,-57.5759,"PY","SAmerica"],
  ["Peru","Lima",-12.0464,-77.0428,"PE","SAmerica"],
  ["Philippines","Manila",14.5995,120.9842,"PH","Asia"],
  ["Poland","Warsaw",52.2297,21.0122,"PL","Europe"],
  ["Portugal","Lisbon",38.7223,-9.1393,"PT","Europe"],
  ["Qatar","Doha",25.2854,51.531,"QA","Asia"],
  ["Romania","Bucharest",44.4268,26.1025,"RO","Europe"],
  ["Russia","Moscow",55.7558,37.6173,"RU","Europe"],
  ["Rwanda","Kigali",-1.9403,29.8739,"RW","Africa"],
  ["Saint Kitts and Nevis","Basseterre",17.3026,-62.7177,"KN","NAmerica"],
  ["Saint Lucia","Castries",14.0101,-60.9875,"LC","NAmerica"],
  ["Saint Vincent and the Grenadines","Kingstown",13.1587,-61.2248,"VC","NAmerica"],
  ["Samoa","Apia",-13.8333,-171.75,"WS","Oceania"],
  ["San Marino","San Marino",43.9424,12.4578,"SM","Europe"],
  ["São Tomé and Príncipe","São Tomé",0.1864,6.6131,"ST","Africa"],
  ["Saudi Arabia","Riyadh",24.7136,46.6753,"SA","Asia"],
  ["Senegal","Dakar",14.7167,-17.4677,"SN","Africa"],
  ["Serbia","Belgrade",44.7866,20.4489,"RS","Europe"],
  ["Seychelles","Victoria",-4.6191,55.4513,"SC","Africa"],
  ["Sierra Leone","Freetown",8.4657,-13.2317,"SL","Africa"],
  ["Singapore","Singapore",1.3521,103.8198,"SG","Asia"],
  ["Slovakia","Bratislava",48.1486,17.1077,"SK","Europe"],
  ["Slovenia","Ljubljana",46.0569,14.5058,"SI","Europe"],
  ["Solomon Islands","Honiara",-9.4456,159.9729,"SB","Oceania"],
  ["Somalia","Mogadishu",2.0469,45.3182,"SO","Africa"],
  ["South Africa","Pretoria",-25.7479,28.2293,"ZA","Africa"],
  ["South Korea","Seoul",37.5665,126.978,"KR","Asia"],
  ["South Sudan","Juba",4.8594,31.5713,"SS","Africa"],
  ["Spain","Madrid",40.4168,-3.7038,"ES","Europe"],
  ["Sri Lanka","Sri Jayawardenepura Kotte",6.9271,79.8612,"LK","Asia"],
  ["Sudan","Khartoum",15.5007,32.5599,"SD","Africa"],
  ["Suriname","Paramaribo",5.852,-55.2038,"SR","SAmerica"],
  ["Sweden","Stockholm",59.3293,18.0686,"SE","Europe"],
  ["Switzerland","Bern",46.948,7.4474,"CH","Europe"],
  ["Syria","Damascus",33.5138,36.2765,"SY","Asia"],
  ["Tajikistan","Dushanbe",38.5598,68.774,"TJ","Asia"],
  ["Tanzania","Dodoma",-6.163,35.7516,"TZ","Africa"],
  ["Thailand","Bangkok",13.7563,100.5018,"TH","Asia"],
  ["Togo","Lomé",6.1256,1.2254,"TG","Africa"],
  ["Tonga","Nukuʻalofa",-21.2087,-175.1982,"TO","Oceania"],
  ["Trinidad and Tobago","Port of Spain",10.6596,-61.5086,"TT","NAmerica"],
  ["Tunisia","Tunis",36.8065,10.1815,"TN","Africa"],
  ["Turkey","Ankara",39.9334,32.8597,"TR","Europe"],
  ["Turkmenistan","Ashgabat",37.9601,58.3261,"TM","Asia"],
  ["Tuvalu","Funafuti",-8.5211,179.1962,"TV","Oceania"],
  ["Uganda","Kampala",0.3476,32.5825,"UG","Africa"],
  ["Ukraine","Kyiv",50.4501,30.5234,"UA","Europe"],
  ["United Arab Emirates","Abu Dhabi",24.4539,54.3773,"AE","Asia"],
  ["United Kingdom","London",51.5074,-0.1278,"GB","Europe"],
  ["United States","Washington, D.C.",38.9072,-77.0369,"US","NAmerica"],
  ["Uruguay","Montevideo",-34.9011,-56.1645,"UY","SAmerica"],
  ["Uzbekistan","Tashkent",41.2995,69.2401,"UZ","Asia"],
  ["Vanuatu","Port Vila",-17.7334,168.3273,"VU","Oceania"],
  ["Vatican City","Vatican City",41.9029,12.4534,"VA","Europe"],
  ["Venezuela","Caracas",10.4806,-66.9036,"VE","SAmerica"],
  ["Vietnam","Hanoi",21.0278,105.8342,"VN","Asia"],
  ["Yemen","Sana'a",15.3694,44.191,"YE","Asia"],
  ["Zambia","Lusaka",-15.3875,28.3228,"ZM","Africa"],
  ["Zimbabwe","Harare",-17.8252,31.0335,"ZW","Africa"]
];

// Field indices
export const F = { NAME: 0, CAPITAL: 1, LAT: 2, LNG: 3, ISO: 4, CONTINENT: 5 };

export const CONTINENTS = ["All","Europe","Asia","Africa","NAmerica","SAmerica","Oceania"];

export function flag(iso) {
  return String.fromCodePoint(...[...iso.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
}

export function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function havIdx(i, j) {
  return haversine(CAPITALS[i][F.LAT], CAPITALS[i][F.LNG], CAPITALS[j][F.LAT], CAPITALS[j][F.LNG]);
}

export function totalDist(route) {
  let t = 0;
  for (let i = 0; i < route.length - 1; i++) t += havIdx(route[i], route[i + 1]);
  return t;
}

export function buildDistMatrix() {
  const n = CAPITALS.length, d = new Float64Array(n * n);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const v = havIdx(i, j);
    d[i * n + j] = v; d[j * n + i] = v;
  }
  return d;
}

export function nearestNeighbor(startIdx, dist) {
  const n = CAPITALS.length, vis = new Uint8Array(n), r = [startIdx];
  vis[startIdx] = 1;
  let cur = startIdx;
  for (let s = 1; s < n; s++) {
    let best = -1, bestD = Infinity;
    for (let j = 0; j < n; j++) {
      if (!vis[j]) { const dd = dist[cur * n + j]; if (dd < bestD) { bestD = dd; best = j; } }
    }
    vis[best] = 1; r.push(best); cur = best;
  }
  return r;
}

export function twoOpt(route, dist, maxIter = 80, matrixN = 0) {
  const n = matrixN || route.length, r = route.slice();
  let improved = true, iter = 0;
  while (improved && iter < maxIter) {
    improved = false; iter++;
    for (let i = 1; i < r.length - 2; i++) {
      for (let j = i + 1; j < r.length - 1; j++) {
        const d1 = dist[r[i - 1] * n + r[i]] + dist[r[j] * n + r[j + 1]];
        const d2 = dist[r[i - 1] * n + r[j]] + dist[r[i] * n + r[j + 1]];
        if (d2 < d1 - 0.01) {
          let l = i, m = j;
          while (l < m) { const t = r[l]; r[l] = r[m]; r[m] = t; l++; m--; }
          improved = true;
        }
      }
    }
  }
  return r;
}

// Generic solver for arbitrary [name, label, lat, lng, ...] arrays
export function solveGeneric(data, startIdx) {
  const n = data.length, dist = new Float64Array(n * n);
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const v = haversine(data[i][2], data[i][3], data[j][2], data[j][3]);
    dist[i * n + j] = v; dist[j * n + i] = v;
  }
  // Nearest neighbor from start
  function nn(si) {
    const vis = new Uint8Array(n), r = [si];
    vis[si] = 1; let cur = si;
    for (let s = 1; s < n; s++) {
      let b = -1, bd = Infinity;
      for (let j = 0; j < n; j++) { if (!vis[j]) { const d = dist[cur * n + j]; if (d < bd) { bd = d; b = j; } } }
      vis[b] = 1; r.push(b); cur = b;
    }
    return r;
  }
  function routeLen(r) { let t = 0; for (let i = 0; i < r.length - 1; i++) t += dist[r[i] * n + r[i + 1]]; return t; }
  // Scale iterations with dataset size
  const maxIter = n > 200 ? 300 : 100;
  const route = twoOpt(nn(startIdx), dist, maxIter, n);
  const totalD = routeLen(route);
  return { route, dist, totalD };
}

export function gcArc(lat1, lon1, lat2, lon2, segments = 15) {
  const toRad = d => d * Math.PI / 180, toDeg = r => r * 180 / Math.PI;
  const p1 = [toRad(lat1), toRad(lon1)], p2 = [toRad(lat2), toRad(lon2)];
  const d = 2 * Math.asin(Math.sqrt(Math.sin((p2[0] - p1[0]) / 2) ** 2 +
    Math.cos(p1[0]) * Math.cos(p2[0]) * Math.sin((p2[1] - p1[1]) / 2) ** 2));
  if (d < 1e-10) return [[lat1, lon1], [lat2, lon2]];
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const f = i / segments;
    const A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(p1[0]) * Math.cos(p1[1]) + B * Math.cos(p2[0]) * Math.cos(p2[1]);
    const y = A * Math.cos(p1[0]) * Math.sin(p1[1]) + B * Math.cos(p2[0]) * Math.sin(p2[1]);
    const z = A * Math.sin(p1[0]) + B * Math.sin(p2[0]);
    pts.push([toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]);
  }
  return pts;
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getStartCapital() {
  return localStorage.getItem('startCapital') || 'London';
}

export function setStartCapital(name) {
  localStorage.setItem('startCapital', name);
}

export function getStartIdx() {
  const name = getStartCapital();
  const idx = CAPITALS.findIndex(c => c[F.CAPITAL] === name);
  return idx >= 0 ? idx : CAPITALS.findIndex(c => c[F.CAPITAL] === 'London');
}

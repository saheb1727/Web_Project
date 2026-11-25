/**
 * Indian Postal PIN Code Lookup Utility
 * 
 * Provides instant 0-latency offline detection for all Indian States & Union Territories
 * and 100+ major cities, with automatic fallback and optional live postal API resolution.
 */

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  district?: string;
  source: "api" | "offline" | "fallback";
}

// 3-digit prefix mapping for high-accuracy major Indian cities and hubs
const CITY_PREFIX_MAP: Record<string, { city: string; state: string }> = {
  // Delhi NCR
  "110": { city: "New Delhi", state: "Delhi" },
  "121": { city: "Faridabad", state: "Haryana" },
  "122": { city: "Gurugram", state: "Haryana" },
  "201": { city: "Noida / Ghaziabad", state: "Uttar Pradesh" },

  // Haryana
  "124": { city: "Rohtak", state: "Haryana" },
  "125": { city: "Hisar", state: "Haryana" },
  "131": { city: "Sonipat", state: "Haryana" },
  "132": { city: "Panipat / Karnal", state: "Haryana" },
  "133": { city: "Ambala", state: "Haryana" },
  "134": { city: "Panchkula", state: "Haryana" },

  // Punjab & Chandigarh
  "160": { city: "Chandigarh", state: "Chandigarh" },
  "140": { city: "Mohali", state: "Punjab" },
  "141": { city: "Ludhiana", state: "Punjab" },
  "143": { city: "Amritsar", state: "Punjab" },
  "144": { city: "Jalandhar", state: "Punjab" },
  "147": { city: "Patiala", state: "Punjab" },
  "151": { city: "Bathinda", state: "Punjab" },

  // Himachal Pradesh & J&K
  "171": { city: "Shimla", state: "Himachal Pradesh" },
  "175": { city: "Mandi", state: "Himachal Pradesh" },
  "176": { city: "Dharamshala", state: "Himachal Pradesh" },
  "180": { city: "Jammu", state: "Jammu & Kashmir" },
  "190": { city: "Srinagar", state: "Jammu & Kashmir" },
  "194": { city: "Leh Ladakh", state: "Ladakh" },

  // Uttar Pradesh
  "202": { city: "Aligarh", state: "Uttar Pradesh" },
  "203": { city: "Bulandshahr", state: "Uttar Pradesh" },
  "208": { city: "Kanpur", state: "Uttar Pradesh" },
  "211": { city: "Prayagraj", state: "Uttar Pradesh" },
  "221": { city: "Varanasi", state: "Uttar Pradesh" },
  "226": { city: "Lucknow", state: "Uttar Pradesh" },
  "241": { city: "Hardoi", state: "Uttar Pradesh" },
  "243": { city: "Bareilly", state: "Uttar Pradesh" },
  "244": { city: "Moradabad", state: "Uttar Pradesh" },
  "247": { city: "Saharanpur", state: "Uttar Pradesh" },
  "250": { city: "Meerut", state: "Uttar Pradesh" },
  "273": { city: "Gorakhpur", state: "Uttar Pradesh" },
  "281": { city: "Mathura", state: "Uttar Pradesh" },
  "282": { city: "Agra", state: "Uttar Pradesh" },
  "284": { city: "Jhansi", state: "Uttar Pradesh" },

  // Uttarakhand
  "248": { city: "Dehradun", state: "Uttarakhand" },
  "249": { city: "Haridwar / Rishikesh", state: "Uttarakhand" },
  "262": { city: "Pithoragarh", state: "Uttarakhand" },
  "263": { city: "Nainital / Haldwani", state: "Uttarakhand" },

  // Rajasthan
  "301": { city: "Alwar", state: "Rajasthan" },
  "302": { city: "Jaipur", state: "Rajasthan" },
  "305": { city: "Ajmer", state: "Rajasthan" },
  "311": { city: "Bhilwara", state: "Rajasthan" },
  "313": { city: "Udaipur", state: "Rajasthan" },
  "324": { city: "Kota", state: "Rajasthan" },
  "334": { city: "Bikaner", state: "Rajasthan" },
  "342": { city: "Jodhpur", state: "Rajasthan" },

  // Gujarat
  "360": { city: "Rajkot", state: "Gujarat" },
  "361": { city: "Jamnagar", state: "Gujarat" },
  "364": { city: "Bhavnagar", state: "Gujarat" },
  "370": { city: "Bhuj / Kutch", state: "Gujarat" },
  "380": { city: "Ahmedabad", state: "Gujarat" },
  "382": { city: "Gandhinagar", state: "Gujarat" },
  "388": { city: "Anand", state: "Gujarat" },
  "390": { city: "Vadodara", state: "Gujarat" },
  "395": { city: "Surat", state: "Gujarat" },
  "396": { city: "Vapi / Valsad", state: "Gujarat" },

  // Maharashtra & Goa
  "400": { city: "Mumbai", state: "Maharashtra" },
  "401": { city: "Thane / Palghar", state: "Maharashtra" },
  "403": { city: "Panaji / Goa", state: "Goa" },
  "410": { city: "Lonavala / Navi Mumbai", state: "Maharashtra" },
  "411": { city: "Pune", state: "Maharashtra" },
  "413": { city: "Solapur", state: "Maharashtra" },
  "414": { city: "Ahmednagar", state: "Maharashtra" },
  "416": { city: "Kolhapur", state: "Maharashtra" },
  "422": { city: "Nashik", state: "Maharashtra" },
  "424": { city: "Dhule", state: "Maharashtra" },
  "425": { city: "Jalgaon", state: "Maharashtra" },
  "431": { city: "Chhatrapati Sambhajinagar", state: "Maharashtra" },
  "440": { city: "Nagpur", state: "Maharashtra" },
  "444": { city: "Amravati", state: "Maharashtra" },

  // Madhya Pradesh & Chhattisgarh
  "452": { city: "Indore", state: "Madhya Pradesh" },
  "456": { city: "Ujjain", state: "Madhya Pradesh" },
  "462": { city: "Bhopal", state: "Madhya Pradesh" },
  "474": { city: "Gwalior", state: "Madhya Pradesh" },
  "482": { city: "Jabalpur", state: "Madhya Pradesh" },
  "490": { city: "Bhilai / Durg", state: "Chhattisgarh" },
  "492": { city: "Raipur", state: "Chhattisgarh" },
  "495": { city: "Bilaspur", state: "Chhattisgarh" },

  // Telangana & Andhra Pradesh
  "500": { city: "Hyderabad", state: "Telangana" },
  "506": { city: "Warangal", state: "Telangana" },
  "515": { city: "Anantapur", state: "Andhra Pradesh" },
  "517": { city: "Tirupati", state: "Andhra Pradesh" },
  "518": { city: "Kurnool", state: "Andhra Pradesh" },
  "520": { city: "Vijayawada", state: "Andhra Pradesh" },
  "522": { city: "Guntur", state: "Andhra Pradesh" },
  "530": { city: "Visakhapatnam", state: "Andhra Pradesh" },
  "533": { city: "Kakinada", state: "Andhra Pradesh" },

  // Karnataka
  "560": { city: "Bengaluru", state: "Karnataka" },
  "570": { city: "Mysuru", state: "Karnataka" },
  "575": { city: "Mangaluru", state: "Karnataka" },
  "577": { city: "Shivamogga / Davanagere", state: "Karnataka" },
  "580": { city: "Hubballi / Dharwad", state: "Karnataka" },
  "585": { city: "Kalaburagi", state: "Karnataka" },
  "590": { city: "Belagavi", state: "Karnataka" },

  // Tamil Nadu & Puducherry
  "600": { city: "Chennai", state: "Tamil Nadu" },
  "605": { city: "Puducherry", state: "Puducherry" },
  "620": { city: "Tiruchirappalli", state: "Tamil Nadu" },
  "625": { city: "Madurai", state: "Tamil Nadu" },
  "627": { city: "Tirunelveli", state: "Tamil Nadu" },
  "629": { city: "Kanyakumari / Nagercoil", state: "Tamil Nadu" },
  "636": { city: "Salem", state: "Tamil Nadu" },
  "638": { city: "Erode", state: "Tamil Nadu" },
  "641": { city: "Coimbatore", state: "Tamil Nadu" },
  "642": { city: "Pollachi", state: "Tamil Nadu" },

  // Kerala & Lakshadweep
  "670": { city: "Kannur", state: "Kerala" },
  "673": { city: "Kozhikode", state: "Kerala" },
  "678": { city: "Palakkad", state: "Kerala" },
  "680": { city: "Thrissur", state: "Kerala" },
  "682": { city: "Kochi / Ernakulam", state: "Kerala" },
  "686": { city: "Kottayam", state: "Kerala" },
  "691": { city: "Kollam", state: "Kerala" },
  "695": { city: "Thiruvananthapuram", state: "Kerala" },
  "6825": { city: "Kavaratti", state: "Lakshadweep" },

  // West Bengal & Sikkim
  "700": { city: "Kolkata", state: "West Bengal" },
  "711": { city: "Howrah", state: "West Bengal" },
  "713": { city: "Durgapur / Asansol", state: "West Bengal" },
  "721": { city: "Kharagpur / Medinipur", state: "West Bengal" },
  "734": { city: "Siliguri / Darjeeling", state: "West Bengal" },
  "737": { city: "Gangtok", state: "Sikkim" },
  "744": { city: "Port Blair", state: "Andaman & Nicobar" },

  // Odisha
  "751": { city: "Bhubaneswar", state: "Odisha" },
  "752": { city: "Puri", state: "Odisha" },
  "753": { city: "Cuttack", state: "Odisha" },
  "760": { city: "Berhampur", state: "Odisha" },
  "768": { city: "Sambalpur", state: "Odisha" },
  "769": { city: "Rourkela", state: "Odisha" },

  // North East
  "781": { city: "Guwahati", state: "Assam" },
  "785": { city: "Jorhat", state: "Assam" },
  "786": { city: "Dibrugarh", state: "Assam" },
  "788": { city: "Silchar", state: "Assam" },
  "791": { city: "Itanagar", state: "Arunachal Pradesh" },
  "793": { city: "Shillong", state: "Meghalaya" },
  "795": { city: "Imphal", state: "Manipur" },
  "796": { city: "Aizawl", state: "Mizoram" },
  "797": { city: "Kohima / Dimapur", state: "Nagaland" },
  "799": { city: "Agartala", state: "Tripura" },

  // Bihar
  "800": { city: "Patna", state: "Bihar" },
  "801": { city: "Danapur / Patna", state: "Bihar" },
  "803": { city: "Nalanda / Bihar Sharif", state: "Bihar" },
  "805": { city: "Nawada", state: "Bihar" },
  "812": { city: "Bhagalpur", state: "Bihar" },
  "823": { city: "Gaya", state: "Bihar" },
  "841": { city: "Siwan / Chapra", state: "Bihar" },
  "842": { city: "Muzaffarpur", state: "Bihar" },
  "843": { city: "Sitamarhi / Vaishali", state: "Bihar" },
  "844": { city: "Hajipur", state: "Bihar" },
  "845": { city: "Motihari / Bettiah", state: "Bihar" },
  "846": { city: "Darbhanga", state: "Bihar" },
  "848": { city: "Samastipur", state: "Bihar" },
  "851": { city: "Begusarai", state: "Bihar" },
  "854": { city: "Purnia / Katihar", state: "Bihar" },

  // Jharkhand (MyPrintHub HQ & Circles)
  "834": { city: "Ranchi", state: "Jharkhand" },
  "831": { city: "Jamshedpur", state: "Jharkhand" },
  "832": { city: "Ghatshila / East Singhbhum", state: "Jharkhand" },
  "833": { city: "Chaibasa / West Singhbhum", state: "Jharkhand" },
  "835": { city: "Ranchi Rural / Khunti / Ramgarh", state: "Jharkhand" },
  "825": { city: "Hazaribagh", state: "Jharkhand" },
  "826": { city: "Dhanbad", state: "Jharkhand" },
  "827": { city: "Bokaro Steel City", state: "Jharkhand" },
  "828": { city: "Sindri / Dhanbad", state: "Jharkhand" },
  "829": { city: "Bermo / Ramgarh", state: "Jharkhand" },
  "814": { city: "Deoghar / Dumka", state: "Jharkhand" },
  "815": { city: "Giridih / Madhupur", state: "Jharkhand" },
  "816": { city: "Pakur / Sahibganj", state: "Jharkhand" },
  "822": { city: "Daltonganj / Palamu", state: "Jharkhand" },
};

// 2-digit Circle prefix fallback for all Indian States & UTs
const STATE_PREFIX_MAP: Record<string, { city: string; state: string }> = {
  "11": { city: "Delhi", state: "Delhi" },
  "12": { city: "Gurugram / Haryana", state: "Haryana" },
  "13": { city: "Ambala / Haryana", state: "Haryana" },
  "14": { city: "Amritsar / Punjab", state: "Punjab" },
  "15": { city: "Bathinda / Punjab", state: "Punjab" },
  "16": { city: "Chandigarh", state: "Chandigarh" },
  "17": { city: "Shimla", state: "Himachal Pradesh" },
  "18": { city: "Jammu", state: "Jammu & Kashmir" },
  "19": { city: "Srinagar", state: "Jammu & Kashmir" },
  "20": { city: "Noida / Aligarh", state: "Uttar Pradesh" },
  "21": { city: "Prayagraj", state: "Uttar Pradesh" },
  "22": { city: "Lucknow", state: "Uttar Pradesh" },
  "23": { city: "Faizabad / Ayodhya", state: "Uttar Pradesh" },
  "24": { city: "Bareilly / Dehradun", state: "Uttar Pradesh" },
  "25": { city: "Meerut", state: "Uttar Pradesh" },
  "26": { city: "Pilibhit / Kumaon", state: "Uttar Pradesh" },
  "27": { city: "Gorakhpur", state: "Uttar Pradesh" },
  "28": { city: "Agra / Jhansi", state: "Uttar Pradesh" },
  "30": { city: "Jaipur", state: "Rajasthan" },
  "31": { city: "Udaipur", state: "Rajasthan" },
  "32": { city: "Kota", state: "Rajasthan" },
  "33": { city: "Bikaner", state: "Rajasthan" },
  "34": { city: "Jodhpur", state: "Rajasthan" },
  "36": { city: "Rajkot", state: "Gujarat" },
  "37": { city: "Jamnagar / Kutch", state: "Gujarat" },
  "38": { city: "Ahmedabad", state: "Gujarat" },
  "39": { city: "Surat / Vadodara", state: "Gujarat" },
  "40": { city: "Mumbai", state: "Maharashtra" },
  "41": { city: "Pune", state: "Maharashtra" },
  "42": { city: "Nashik", state: "Maharashtra" },
  "43": { city: "Chhatrapati Sambhajinagar", state: "Maharashtra" },
  "44": { city: "Nagpur", state: "Maharashtra" },
  "45": { city: "Indore", state: "Madhya Pradesh" },
  "46": { city: "Bhopal", state: "Madhya Pradesh" },
  "47": { city: "Gwalior", state: "Madhya Pradesh" },
  "48": { city: "Jabalpur", state: "Madhya Pradesh" },
  "49": { city: "Raipur", state: "Chhattisgarh" },
  "50": { city: "Hyderabad", state: "Telangana" },
  "51": { city: "Tirupati / Rayalaseema", state: "Andhra Pradesh" },
  "52": { city: "Vijayawada", state: "Andhra Pradesh" },
  "53": { city: "Visakhapatnam", state: "Andhra Pradesh" },
  "56": { city: "Bengaluru", state: "Karnataka" },
  "57": { city: "Mangaluru / Mysuru", state: "Karnataka" },
  "58": { city: "Hubballi / Belagavi", state: "Karnataka" },
  "59": { city: "Belgaum Circle", state: "Karnataka" },
  "60": { city: "Chennai", state: "Tamil Nadu" },
  "61": { city: "Thanjavur", state: "Tamil Nadu" },
  "62": { city: "Madurai", state: "Tamil Nadu" },
  "63": { city: "Salem / Vellore", state: "Tamil Nadu" },
  "64": { city: "Coimbatore", state: "Tamil Nadu" },
  "67": { city: "Kozhikode / Kannur", state: "Kerala" },
  "68": { city: "Kochi / Ernakulam", state: "Kerala" },
  "69": { city: "Thiruvananthapuram", state: "Kerala" },
  "70": { city: "Kolkata", state: "West Bengal" },
  "71": { city: "Howrah / Hooghly", state: "West Bengal" },
  "72": { city: "Midnapore", state: "West Bengal" },
  "73": { city: "Siliguri / North Bengal", state: "West Bengal" },
  "74": { city: "Nadia / 24 Parganas", state: "West Bengal" },
  "75": { city: "Bhubaneswar", state: "Odisha" },
  "76": { city: "Berhampur / Southern Odisha", state: "Odisha" },
  "77": { city: "Rourkela / Sambalpur", state: "Odisha" },
  "78": { city: "Guwahati / Assam", state: "Assam" },
  "79": { city: "Shillong / North East", state: "Meghalaya" },
  "80": { city: "Patna", state: "Bihar" },
  "81": { city: "Bhagalpur / Deoghar", state: "Bihar / Jharkhand" },
  "82": { city: "Dhanbad / Gaya", state: "Jharkhand / Bihar" },
  "83": { city: "Ranchi / Jamshedpur", state: "Jharkhand" },
  "84": { city: "Muzaffarpur / Tirhut", state: "Bihar" },
  "85": { city: "Purnia / Koshi", state: "Bihar" },
};

// In-memory cache for ultra-fast repeated lookups
const pincodeCache = new Map<string, PincodeInfo>();

/**
 * Fast synchronous offline lookup using prefix heuristics.
 * Guarantees zero latency return for valid 6-digit Indian PIN codes.
 */
export function lookupOfflinePincode(pincode: string): PincodeInfo | null {
  const clean = (pincode || "").trim().replace(/\D/g, "");
  if (clean.length !== 6) return null;

  // 1. Exact 3-digit prefix lookup (Cities)
  const p3 = clean.substring(0, 3);
  if (CITY_PREFIX_MAP[p3]) {
    return {
      pincode: clean,
      city: CITY_PREFIX_MAP[p3].city,
      state: CITY_PREFIX_MAP[p3].state,
      source: "offline",
    };
  }

  // 2. 2-digit circle lookup (States/Regions)
  const p2 = clean.substring(0, 2);
  if (STATE_PREFIX_MAP[p2]) {
    return {
      pincode: clean,
      city: STATE_PREFIX_MAP[p2].city,
      state: STATE_PREFIX_MAP[p2].state,
      source: "offline",
    };
  }

  // 3. Fallback by initial zone digit
  const p1 = clean.charAt(0);
  const zoneDefaults: Record<string, { city: string; state: string }> = {
    "1": { city: "Northern Hub", state: "Delhi NCR" },
    "2": { city: "Central Hub", state: "Uttar Pradesh" },
    "3": { city: "Western Hub", state: "Rajasthan / Gujarat" },
    "4": { city: "Western Hub", state: "Maharashtra" },
    "5": { city: "Southern Hub", state: "Karnataka / Telangana" },
    "6": { city: "Southern Hub", state: "Tamil Nadu / Kerala" },
    "7": { city: "Eastern Hub", state: "West Bengal / Odisha" },
    "8": { city: "Ranchi Hub", state: "Jharkhand / Bihar" },
  };

  if (zoneDefaults[p1]) {
    return {
      pincode: clean,
      city: zoneDefaults[p1].city,
      state: zoneDefaults[p1].state,
      source: "fallback",
    };
  }

  return {
    pincode: clean,
    city: "India Hub",
    state: "India",
    source: "fallback",
  };
}

/**
 * Async lookup that queries Postal PIN Code API with timeout,
 * falling back gracefully to our rich offline database.
 */
export async function lookupPincode(pincode: string): Promise<PincodeInfo | null> {
  const clean = (pincode || "").trim().replace(/\D/g, "");
  if (clean.length !== 6) return null;

  // Return from in-memory cache if available
  if (pincodeCache.has(clean)) {
    return pincodeCache.get(clean)!;
  }

  // Get immediate offline baseline
  const offlineMatch = lookupOfflinePincode(clean);

  // Try fetching live precision data from official Postal API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2200);

    const response = await fetch(`https://api.postalpincode.in/pincode/${clean}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (
        Array.isArray(data) &&
        data.length > 0 &&
        data[0].Status === "Success" &&
        Array.isArray(data[0].PostOffice) &&
        data[0].PostOffice.length > 0
      ) {
        const po = data[0].PostOffice[0];
        const city = po.District || po.Block || po.Circle || po.Name || offlineMatch?.city || "Unknown";
        const state = po.State || offlineMatch?.state || "India";

        const result: PincodeInfo = {
          pincode: clean,
          city,
          state,
          district: po.District,
          source: "api",
        };

        pincodeCache.set(clean, result);
        return result;
      }
    }
  } catch {
    // In case of timeout or offline sandbox, silently fall back to offline match
  }

  if (offlineMatch) {
    pincodeCache.set(clean, offlineMatch);
    return offlineMatch;
  }

  return null;
}

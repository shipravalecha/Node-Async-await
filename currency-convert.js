
const axios = require('axios');

// normal fn
// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=53f5574217cc10dabacbeb6cfbde0ab7').then((response) => {
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   });
// };


// async fn
const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=53f5574217cc10dabacbeb6cfbde0ab7');
      const euro = 1 / response.data.rates[from];
      const rate = euro * response.data.rates[to];
      if(isNaN(rate)) {
        throw new Error();
      }
      return rate;
  } catch(e) {
    throw new Error (`unable to fetch exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
  } catch(e) {
    throw new Error(`unable to get countries that use ${currencyCode}`);
  }
};

// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });
//
// getCountries('CAD').then((countries) => {
//   console.log(countries);
// });

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from, to).then((rate) => {
//     convertedAmount = (amount * rate).toFixed(2);
//     return getCountries(to);
//   }).then((countries) => {
//   return `${amount} ${from} is worth ${convertedAmount} ${to}. you can spend these in following countries: ${countries.join(', ')}`;
//   });
// };

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (amount * rate).toFixed(2);
  const countries =  await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. you can spend these in following countries: ${countries.join(', ')}`;
};

convertCurrency('USD', 'CAD', 20).then((msg) => {
  console.log(msg);
}).catch((e) => {
  console.log(e.message);
});

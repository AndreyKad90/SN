import Country from '../../models/country';

let cache = {
  countries: null
};

export async function getCountries(req, res, next) {
  try {
    if (!cache.countries) {
      await Country.find().then(countries => cache.countries = countries);
    }
    res.json(cache.countries);
  } catch (err) {
    next(err);
  }
}

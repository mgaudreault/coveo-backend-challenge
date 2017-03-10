# How-to run
With a mongodb instance running, use `npm run start-dev` for developpement. For deployment, run `npm build` first then `npm start`.

To execute tests, run `npm test`.

To generate insert data in the database, use `script/importCities.py`. 

# Solution details
## Implementation
Implemented using ExpressJS as the router and Mongoose as the DB connector using es2015 syntax.

The score algorithm uses the equirectangular approximation for distance, the number of erroneous letters in the suggestion and checks if the query string is at the beginning of the suggestion.

## Extra implementation
 - Added a way to handle facets for the search suggestions. 
   - Right now the facet must have the same name as the DB key.
   - To enable a new facet, add it in /config/facets.js.
   - Facets are only used in an "$and" mongodb query, but could be upgraded for more uses.
   

## Not implemented ideas
 - Create a query cache
    - Reason : Might be to heavy / not really useful for a suggestion service


# Original README
# Coveo Backend Coding Challenge
(inspired by https://github.com/busbud/coding-challenge-backend-c)

## Requirements

Design an API endpoint that provides auto-complete suggestions for large cities.

- The endpoint is exposed at `/suggestions`
- The partial (or complete) search term is passed as a querystring parameter `q`
- The caller's location can optionally be supplied via querystring parameters `latitude` and `longitude` to help improve relative scores
- The endpoint returns a JSON response with an array of scored suggested matches
    - The suggestions are sorted by descending score
    - Each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident)
    - Each suggestion has a name which can be used to disambiguate between similarly named locations
    - Each suggestion has a latitude and longitude

## "The rules"

- *You can use the language and technology of your choosing.* It's OK to try something new (tell us if you do), but feel free to use something you're comfortable with. We don't care if you use something we don't; the goal here is not to validate your knowledge of a particular technology.
- End result should be deployed on a public Cloud (Heroku, AWS etc. all have free tiers you can use).

## Advices

- **Try to design and implement your solution as you would do for real production code**. Show us how you create clean, maintainable code that does awesome stuff. Build something that we'd be happy to contribute to. This is not a programming contest where dirty hacks win the game.
- Feel free to add more features! Really, we're curious about what you can think of. We'd expect the same if you worked with us.
- Documentation and maintainability is a plus.
- Don't you forget those unit tests.
- We don’t want to know if you can do exactly as asked (or everybody would have the same result). We want to know what **you** bring to the table when working on a project, what is your secret sauce. More features? Best solution? Thinking outside the box?

## Sample responses

These responses are meant to provide guidance. The exact values can vary based on the data source and scoring algorithm

**Near match**

    GET /suggestions?q=Londo&latitude=43.70011&longitude=-79.4163

```json
{
  "suggestions": [
    {
      "name": "London, ON, Canada",
      "latitude": "42.98339",
      "longitude": "-81.23304",
      "score": 0.9
    },
    {
      "name": "London, OH, USA",
      "latitude": "39.88645",
      "longitude": "-83.44825",
      "score": 0.5
    },
    {
      "name": "London, KY, USA",
      "latitude": "37.12898",
      "longitude": "-84.08326",
      "score": 0.5
    },
    {
      "name": "Londontowne, MD, USA",
      "latitude": "38.93345",
      "longitude": "-76.54941",
      "score": 0.3
    }
  ]
}
```

**No match**

    GET /suggestions?q=SomeRandomCityInTheMiddleOfNowhere

```json
{
  "suggestions": []
}
```

## References

- Geonames provides city lists Canada and the USA http://download.geonames.org/export/dump/readme.txt

## Getting Started

Begin by forking this repo and cloning your fork. GitHub has apps for [Mac](http://mac.github.com/) and
[Windows](http://windows.github.com/) that make this easier.

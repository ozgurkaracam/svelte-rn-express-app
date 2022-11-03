const axios = require("axios");
const cheerio = require("cheerio");

const baseLink = "https://www.cimri.com/";

async function getSuggestions(text) {
  return axios
    .post("https://www.cimri.com/api/cimri-api/", {
      query:
        "\n  query suggestion($keyword: String!, $limit: Int = 10) {\n    suggestion(keyword: $keyword, limit: $limit) {\n      products {\n        url\n        brandUrl\n        categoryName\n        brandName\n        id\n        imageId\n        categoryUrl\n        title\n        minPrice\n      }\n      categories {\n        id\n        slug\n        name\n      }\n      brands {\n        id\n        name\n        slug\n      }\n    }\n    marketSuggestion(keyword: $keyword, limit: 6) {\n      numFound\n      products {\n        categorySummary {\n          name\n        }\n        id\n        title\n        imageIds\n        offers {\n          price\n        }\n      }\n    }\n  }\n",
      variables: {
        graphqlQueryName: "suggestionQuery",
        keyword: text,
        limit: 6,
      },
    })
    .then((res) => {
      return res.data.data.suggestion.products;
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getDetails(link) {
  return axios
    .get(`${baseLink}/${link}`)
    .then((res) => {
      const $ = cheerio.load(res.data);
      const json = {
        title: $(".s1wytv2f-2.jTAVuj").text(),
        prices: $("div.s17f9cy4-19.heJchT")
          .map((i, e) => {
            return {
              title: $(e).find(".s17f9cy4-29.erRsVq").text(),
              img: $(e).find("img").attr("src"),
              cargo: $(e).find(".s17f9cy4-28.BNPWE").text(),
              price: parseFloat(
                $(e)
                  .find(".s17f9cy4-11.gkkxYN")
                  .text()
                  .split(" ")[0]
                  .replace(".", "")
                  .replace(",", ".")
              ),
              link: $(e).find("a").attr("href"),
              cargoTime: $(e).find(".s17f9cy4-28.gWiWYy").text(),
            };
          })
          .get()
          .sort((a, b) => {
            return a.price - b.price;
          }),
      };
      return json;
    })
    .catch((err) => {
      console.log(err);
    });
}

// (async function () {
//   //   const sugg = await getSuggestions("deneme");
//   //   console.log(sugg);
//   const items = await getDetails(
//     "bebek-bezi/en-ucuz-molfix-deneme-paketi-no4-maxi-108-adet-bebek-bezi-fiyatlari,106552133"
//   );
//   console.log(items);
// })();

module.exports = {
  getDetails,
  getSuggestions,
};

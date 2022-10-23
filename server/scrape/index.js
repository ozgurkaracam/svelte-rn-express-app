const axios=require('axios')
const cheerio=require('cheerio')

const baseLink="https://www.cimri.com/"

async function getSuggestions(text){
    return axios.post("https://www.cimri.com/api/cimri-api/",
    {
        query:"\n  query suggestion($keyword: String!, $limit: Int = 10) {\n    suggestion(keyword: $keyword, limit: $limit) {\n      products {\n        url\n        brandUrl\n        categoryName\n        brandName\n        id\n        imageId\n        categoryUrl\n        title\n        minPrice\n      }\n      categories {\n        id\n        slug\n        name\n      }\n      brands {\n        id\n        name\n        slug\n      }\n    }\n    marketSuggestion(keyword: $keyword, limit: 6) {\n      numFound\n      products {\n        categorySummary {\n          name\n        }\n        id\n        title\n        imageIds\n        offers {\n          price\n        }\n      }\n    }\n  }\n",
        variables: {
            "graphqlQueryName":"suggestionQuery",
            "keyword":text,
            "limit":6
        }
    }).then(res=>{
        return res.data.data.suggestion.products
    }).catch(err=>{
        console.log(err)
    })
}

async function getDetails(link){
    return axios.get(`${baseLink}/${link}`).then(res=>{
        const $=cheerio.load(res.data)
        const json={
            title:$(".s1wytv2f-2.jTAVuj").text(),
            prices:$("div.s17f9cy4-24.gkXbAZ").map((i,e)=>{
                return {
                    title:$(e).find(".s17f9cy4-34.epaMEB").text(),
                    img:$(e).find("img").attr("src"),
                    cargo:$(e).find(".s17f9cy4-33.hleJOH").text(),
                    price:parseFloat($(e).find(".s17f9cy4-14.ifXJMM").text().split(" ")[0].replace(".","").replace(",",".")),
                    link:$(e).find("a").attr("href"),
                    cargoTime:$(e).find(".s17f9cy4-33.jzDsnH").text()
                    
                }
                
            }).get().sort((a,b)=>{
                return a.price-b.price;
            })
        }
        return json
    }).catch(err=>{
        console.log(err)
    })
}

module.exports={
    getDetails,
    getSuggestions
}
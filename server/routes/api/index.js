const apiRouter=require('express').Router()
const {getSuggestions,getDetails}=require('../../scrape')
apiRouter.get('/getSuggestions/:id',(req,res)=>{
    getSuggestions(req.params.id).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

apiRouter.post('/getDetails',(req,res)=>{
    getDetails(req.body.link).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
})

module.exports=apiRouter
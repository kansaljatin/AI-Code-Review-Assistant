const aiService = require("../services/ai.service")


module.exports.getReview = async (req, res) => {
    try{
        console.log('get review func called...')
        const code = req.body.code;
        if (!code) {
            return res.status(400).send("Prompt is required");
        }

        const response = await aiService(code);
        res.send(response);

    } catch (err){
        console.log(err)
    }
    

}
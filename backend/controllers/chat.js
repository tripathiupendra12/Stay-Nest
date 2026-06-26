const model = require("../utils/gemini");

module.exports.chatBot = async (req, res) => {

    try {
        const {message} = req.body;

        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{text: message}]
                }
            ],
            generationConfig: {
                maxOutputTokens: 1000,
                temperature: 0.7
            }
        });

        const response = result.response.text();

        res.json({
            success: true,
            reply: response,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Somethings went wrong",
        });
    }
};
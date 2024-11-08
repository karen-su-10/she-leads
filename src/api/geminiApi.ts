const { GoogleGenerativeAI} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function getGeminiData(company: string, person: string, title: string) {
    const chatSession = model.startChat({
        generationConfig
    });

    const result = await chatSession.sendMessage(`please give me the answers for the two questions. 1.please give a summary of the company ${company}, its market value, company size, import facts;2. please give a summary of ${person}, ${title} of ${company}'s career path. the answer should be a json with two keys company and career_path, in each with proper markdown back.please don't give extra keys, just fit the answers these two\n`);
    return result.response.text();
}

async function sendChatMessage(message: string, company: string, person: string) {
    const chatSession = model.startChat({
        generationConfig,
        history: [
            {
                role: "user",
                parts: [
                    { text: message },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage(`these questions are related to ${person} works for ${company}`+ message);
    return result.response.text();
}

export { getGeminiData, sendChatMessage };
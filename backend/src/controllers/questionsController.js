


import axios from 'axios';


let questionsStore = [];

export const postQuestion = async (req, res) => {
    const { userId, question, subject } = req.body;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            messages: [{ role: "user", content: question }],
            model: "gpt-3.5-turbo"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const answer = response.data.choices[0].message.content;

       
        questionsStore.push({ userId, question, answer, subject });

       
        res.status(200).json({ answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export const getQuestions = (req, res) => {
    res.status(200).json(questionsStore);
};




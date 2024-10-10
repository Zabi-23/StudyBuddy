

import axios from 'axios';


let usersStore = []; 

export const getStudyPlan = async (req, res) => {
    const userId = req.query.userId;

   
    const user = usersStore.find(user => user.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            messages: [{ role: "user", content: `Create a study plan for a student with a ${user.learningStyle} learning style.` }],
            model: "gpt-3.5-turbo"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const studyPlan = response.data.choices[0].message.content;
        res.status(200).json({ studyPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};




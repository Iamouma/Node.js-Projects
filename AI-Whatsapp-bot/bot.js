// Importing All Necessary Packages
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Creating instances 
const genAI = new GoogleGenerativeAI('API-KEY');
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Initializing GenAI model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Function to generate response from AI model and reply to user
async function generate(prompt, message) {
    try {
        const result = await model.generateContent({ prompt });
        const text = result.generations[0].content;  // Adjust based on the actual response structure
        await message.reply(text); // Reply to user
    } catch (error) {
        console.error("Error generating content: ", error);
        await message.reply("Sorry, I couldn't process your request.");
    }
}

// Event listeners for client status
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('Client is authenticated!');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('disconnected', () => {
    console.log('Client is disconnected!');
});

client.on('auth_failure', () => {
    console.log('Client authentication failed!');
});

// Handling incoming messages
client.on('message', async (message) => {
    if (message.body.includes('.bot')) {
        let query;

        // Extracting text from the message body using regular expression
        const regxmatch = message.body.match(/.bot(.+)/);

        // If no text is followed by .bot, use "Hi" as the default text
        if (regxmatch) {
            query = regxmatch[1].trim();
        } else {
            console.log("No regex match! Using default query.");
            query = "Hi";
        }

        // Call the generate function to generate a response
        await generate(query, message);
    }
});

// Initialize the WhatsApp client
client.initialize();
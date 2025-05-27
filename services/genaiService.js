const { OpenAI } = require("openai");
require('dotenv').config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateNudge = async (retailerId, last, total) => {
    let drop = total<last?((total*100)/last):((last*100)/total);
    const message1 = `Retailer ID ${retailerId} had a ${drop}% drop in sales this month. Total: Rs.${total}.`;
    console.log(`Message: ${message1}`);
  
    try {
      const res = await openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [{ role: "user", content: message1 }],
      });
  
      const message = res.choices?.[0]?.message?.content;
      console.log(`Nudge: ${message}`);
      return message;
    } catch (err) {
      console.error("ERROR: ", err);
      return `Error generating nudge: ${err.message}`;
    }
  };
  

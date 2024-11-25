const Skills = require('../models/skills');
const Groq = require('groq-sdk');

const groq = new Groq();

exports.processSkillsPrompt = async (req, res) => {
  const { career, count } = req.body;
  console.log(req.body);

  try {
    const prompt = `Give me ${count} top technical skills required for a ${career} engineer. Each skill should include:
    - Skill name
    - A short description in 2 lines
    Note: Provide the output in Markdown format.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    // Ensure the content is trimmed and properly formatted as Markdown
    const markdownSkills = content.trim();

    // Store the Markdown skills content in the database
    const existingSkills = await Skills.findOneAndUpdate(
      { careerId: career },
      { $set: { skills: markdownSkills } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Skills prompt processed successfully', skills: markdownSkills });
  } catch (error) {
    console.error('Error processing skills prompt:', error);
    res.status(500).send('Error processing skills prompt');
  }
};


exports.getSkillsByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    const skillsData = await Skills.findOne({ careerId });

    if (!skillsData) {
      return res.status(404).json({ message: `No skills found for career ${careerId}` });
    }

    res.status(200).json({ skills: skillsData.skills });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).send('Error fetching skills');
  }
};


exports.deleteSkillsByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    // Find the career by careerId and delete its associated skills
    const skillsData = await Skills.findOneAndDelete({ careerId });

    if (!skillsData) {
      return res.status(404).json({ message: `No skills found for career ${careerId}` });
    }

    res.status(200).json({ message: `Skills for career ${careerId} have been deleted` });
  } catch (error) {
    console.error('Error deleting skills:', error);
    res.status(500).send('Error deleting skills');
  }
};

exports.getCareerIds = async (req, res) => {
  try {
    const careers = await Skills.find({}, { careerId: 1, _id: 0 });  // Only fetch careerId, exclude _id

    if (careers.length === 0) {
      return res.status(404).json({ message: 'No career IDs found' });
    }

    const careerIds = careers.map(career => career.careerId); // Extract the careerId field

    res.status(200).json(careerIds);  // Return the careerIds array directly
  } catch (error) {
    console.error('Error fetching career IDs:', error);
    res.status(500).send('Error fetching career IDs');
  }
};

const Resume = require('../models/resumes');
const Groq = require('groq-sdk');

const groq = new Groq();

exports.processResumePrompt = async (req, res) => {
  const { career } = req.body;
  console.log(req.body);

  try {
    const prompt = `Create a professional resume template tailored for a ${career} engineer. The template in md format should include:
    - Header (Name, Contact Information, LinkedIn, GitHub)
    - Summary (A brief summary highlighting skills and career goals)
    - Skills (List of technical and soft skills)
    - Work Experience (Format: Title, Company, Duration, Achievements)
    - Education (Degrees, Certifications)
    - Projects (Briefly list relevant projects with a one-line description)
    - Additional Sections (e.g., Hobbies, Languages, Awards, or Volunteering)
     Note : Dont add any values give the suggestions that can make a good aligned resume`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    const markdownResume = content.trim();

    const existingResume = await Resume.findOneAndUpdate(
      { careerId: career },
      { $set: { resume: markdownResume } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Resume prompt processed successfully', resume: markdownResume });
  } catch (error) {
    console.error('Error processing resume prompt:', error);
    res.status(500).send('Error processing resume prompt');
  }
};

exports.getResumeByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    const resume = await Resume.findOne({ careerId });

    if (!resume) {
      return res.status(404).json({ message: `No resume template found for career ${careerId}` });
    }

    res.status(200).json({ resume: resume.resume });
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).send('Error fetching resume');
  }
};

exports.deleteResumeByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    const resumeData = await Resume.findOneAndDelete({ careerId });

    if (!resumeData) {
      return res.status(404).json({ message: `No resume found for career ${careerId}` });
    }

    res.status(200).json({ message: `Resume for career ${careerId} has been deleted` });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).send('Error deleting resume');
  }
};

exports.getResumeCareerIds = async (req, res) => {
  try {
    const careers = await Resume.find({}, { careerId: 1, _id: 0 });

    if (careers.length === 0) {
      return res.status(404).json({ message: 'No career IDs found' });
    }

    const careerIds = careers.map(career => career.careerId);

    res.status(200).json(careerIds);
  } catch (error) {
    console.error('Error fetching career IDs:', error);
    res.status(500).send('Error fetching career IDs');
  }
};

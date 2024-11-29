const Project = require('../models/projects');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.processProjectPrompt = async (req, res) => {
  const { career, count } = req.body;
  console.log(req.body);

  try {
    const prompt = `Give me ${count} project ideas that a ${career} engineer could work on. Each project should include:
    - Title of the project
    - Description
    - Tech stack
    - Modules that can be implemented
    - Tips to develop the module
    - Maximum time to develop
    Note : Give in a good markdown format with title and description with clear view , after completion of a project draw a line
    under every subheading give the content in points`;

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

    // Trim and clean up the Markdown content
    const markdownProjects = content.trim();

    // Store the Markdown projects content in the database
    const existingProjects = await Project.findOneAndUpdate(
      { careerId: career },
      { $set: { projects: markdownProjects } },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Project prompt processed successfully', projects: markdownProjects });
  } catch (error) {
    console.error('Error processing project prompt:', error);
    res.status(500).send('Error processing project prompt');
  }
};

exports.getProjectsByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    const project = await Project.findOne({ careerId });

    if (!project) {
      return res.status(404).json({ message: `No projects found for career ${careerId}` });
    }

    // Return the projects
    res.status(200).json({ projects: project.projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Error fetching projects');
  }
};

exports.deleteProjectsByCareer = async (req, res) => {
  const { careerId } = req.params;

  try {
    // Find the career by careerId and delete its associated skills
    const ProjectsData = await Project.findOneAndDelete({ careerId });

    if (!ProjectsData) {
      return res.status(404).json({ message: `No skills found for career ${careerId}` });
    }

    res.status(200).json({ message: `Skills for career ${careerId} have been deleted` });
  } catch (error) {
    console.error('Error deleting skills:', error);
    res.status(500).send('Error deleting skills');
  }
};

exports.getProjectCareerIds = async (req, res) => {
  try {
    const careers = await Project.find({}, { careerId: 1, _id: 0 });  // Only fetch careerId, exclude _id

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

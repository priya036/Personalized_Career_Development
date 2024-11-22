const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./connect');
const { saveUser,getUserByEmail } = require('./controllers/userController');
const { processSkillsPrompt, getSkillsByCareer } = require('./controllers/skillsController');  
const { processProjectPrompt, getProjectsByCareer } = require('./controllers/projectsController');  
const { getCareerIds } = require('./controllers/skillsController');
const { deleteSkillsByCareer } = require('./controllers/skillsController');
const {getProjectCareerIds} = require('./controllers/projectsController'); 
const {deleteProjectsByCareer} = require('./controllers/projectsController'); 
const { processResumePrompt, getResumeByCareer, getResumeCareerIds, deleteResumeByCareer } = require('./controllers/resumeController');
const { processChatbotPrompt } = require('./controllers/chatbot');


const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.post('/saveUser', saveUser); 
app.get('/getUser/:email', getUserByEmail);  

app.get('/api/careerIds', getCareerIds);
app.get('/api/projects/careerIds', getProjectCareerIds);

app.post('/api/skills', processSkillsPrompt);  
app.get('/api/skills/:careerId', getSkillsByCareer);  
app.delete('/api/skills/delete/:careerId', deleteSkillsByCareer);

app.post('/api/projects/process', processProjectPrompt); 
app.get('/api/projects/:careerId', getProjectsByCareer);  
app.delete('/api/projects/delete/:careerId', deleteProjectsByCareer);


app.post('/api/resumes/process', processResumePrompt);
app.get('/api/resumes/:careerId', getResumeByCareer);
app.get('/api/resumes/career/careerIds', getResumeCareerIds);
app.delete('/api/resumes/delete/:careerId', deleteResumeByCareer);

app.post('/api/chatbot', processChatbotPrompt);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

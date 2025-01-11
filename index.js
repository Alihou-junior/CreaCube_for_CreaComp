const express = require('express');
const { url } = require('inspector');
const app = express();
const path = require('path');

//association des fichiers front nécéssaire
app.use(express.static(path.join(__dirname, 'public')));

// structure
app.get('/mindmap', (req, res) => {
    const mindMapData = {
        name: "Research Articles",
        children: [
            {
                name: "Specific Audience",
                url: "/mindmap/specific_audience"
            },
            {
                name: "Conferences and Interdisciplinary studies",
                url: "/mindmap/conferences_and_interdisciplinary"
            },
            {
                name: "Educational robotic and computational thinking",
                url: "/mindmap/Educational_robotic_computational_thinking"
            },
            {
                name: "Creativity and Problem Solving",
                url: "/mindmap/creativity_problem_Solving"

            }
        ]
    };

    res.json(mindMapData);
});

/////////////////////Les noeuds enfants//////////////////////////

//chaque noeud enfant(des enfants) redirigera vers des pages de vignettes represantant chaque etude

app.get('/mindmap/specific_audience',(req, res)=> {
    const spec_aud = {
        name: "Specific Audience",
        url : "/mindmap/specific_audience",
        children: [
            { name: "Kids", url:"/mindmap/specific_audience/kids"},
            { name: "older Adults", url:"/mindmap/specific_audience/older_adults" },
        ]
    };
    res.json(spec_aud);
})

app.get('/mindmap/conferences_and_interdisciplinary',(req, res)=> {
    const conf_inter = {
        name: "Conferences and Interdisciplinary Portfolio",
        url : "/mindmap/conferences_and_interdisciplinary",
        children: [
            { name: "interdisciplinary contributions", url:"/mindmap/conferences_and_interdisciplinary/interdisciplinary" },
            { name: "talks and presentations", url:"/mindmap/conferences_and_interdisciplinary/talks_presentations"  },]
    };
    res.json(conf_inter);
})

app.get('/mindmap/Educational_robotic_computational_thinking',(req, res)=> {
    const educationnal = {
        name: "Educational Methods and Experimental Training",
        url : "/mindmap/Educational_robotic_computational_thinking",
        children: [
            { name: "Technological applications" , url:"/mindmap/Educational_robotic_computational_thinking/technological_apps" },
            { name: "Robotics and Education", url:"/mindmap/Educational_robotic_computational_thinking/robotics_education"  }
        ]
    };
    res.json(educationnal);
})


app.get('/mindmap/creativity_problem_Solving',(req, res)=> {
    const crea_problem = {
        name: "Creativity and Problem Solving",
        url : "/mindmap/creativity_problem_Solving",
        children: [
            { name: "Theorical & Methodological Frameworks", url:"/mindmap/creativity_problem_Solving/theoric_methodologic" },
            { name: "Pratical approach in problem solving", url:"/mindmap/creativity_problem_Solving/Pratical_approach" }
        ]
    };
    res.json(crea_problem);
})

///////route pour les feuilles///////////

//// Route pour Older Adults
app.get('/mindmap/specific_audience/older_adults', (req, res) => {
    console.log('Route /mindmap/specific_audience/older_adults reached');
    res.sendFile(path.join(__dirname, '/views/', 'older_adults.html'));
});

// Route pour Kids
app.get('/mindmap/specific_audience/kids', (req, res) => {
    console.log('Route /mindmap/specific_audience/kids reached');
    res.sendFile(path.join(__dirname, 'views', 'kids.html'));
});


//////////////////////////////////
app.get('/mindmap/conferences_and_interdisciplinary/interdisciplinary', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'interdisciplinary.html'));
});

app.get('/mindmap/conferences_and_interdisciplinary/talks_presentations', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'talks_presentations.html'));
});


/////////////////
app.get('/mindmap/Educational_robotic_computational_thinking/technological_apps', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'technological_apps.html'));
});

app.get('/mindmap/Educational_robotic_computational_thinking/robotics_education', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'robotics_education.html'));
});


///////////////

app.get('/mindmap/creativity_problem_Solving/theoric_methodologic', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'theoric_methodologic.html'));
});
app.get('/mindmap/creativity_problem_Solving/pratical_approach', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'pratical_approach.html'));
});




// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
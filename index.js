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
                name: "specific audiences",
                url: "/mindmap/specific_audiences"
            },
            {
                name: "Conferences and Interdisciplinary studies",
                url: "/mindmap/conferences_and_interdisciplinary"
            },
            {
                name: "Educational robotics and computational thinking",
                url: "/mindmap/Educational_robotics_computational_thinking"
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

app.get('/mindmap/specific_audiences',(req, res)=> {
    const spec_aud = {
        name: "specific audiences",
        url : "/mindmap/specific_audiences",
        children: [
            { name: "Kids", url:"/mindmap/specific_audiences/kids"},
            { name: "older Adults", url:"/mindmap/specific_audiences/older_adults" },
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

app.get('/mindmap/Educational_robotics_computational_thinking',(req, res)=> {
    const educationnal = {
        name: "Educational Methods and Experimental Training",
        url : "/mindmap/Educational_robotics_computational_thinking",
        children: [
            { name: "Technological applications" , url:"/mindmap/Educational_robotics_computational_thinking/technological_apps" },
            { name: "robotics and Education", url:"/mindmap/Educational_robotics_computational_thinking/robotics_education"  }
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
            { name: "practical approach in problem solving", url:"/mindmap/creativity_problem_Solving/practical_approach" }
        ]
    };
    res.json(crea_problem);
})

///////route pour les feuilles///////////

//// Route pour Older Adults
app.get('/mindmap/specific_audiences/older_adults', (req, res) => {
    console.log('Route /mindmap/specific_audiences/older_adults reached');
    res.sendFile(path.join(__dirname, '/views/', 'older_adults.html'));
});

// Route pour Kids
app.get('/mindmap/specific_audiences/kids', (req, res) => {
    console.log('Route /mindmap/specific_audiences/kids reached');
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
app.get('/mindmap/Educational_robotics_computational_thinking/technological_apps', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'technological_apps.html'));
});

app.get('/mindmap/Educational_robotics_computational_thinking/robotics_education', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'robotics_education.html'));
});


///////////////

app.get('/mindmap/creativity_problem_Solving/theoric_methodologic', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'theoric_methodologic.html'));
});
app.get('/mindmap/creativity_problem_Solving/practical_approach', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/', 'practical_approach.html'));
});




// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
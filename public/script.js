const width = 1000;
const height = 600;
const verticalOffset = 50; // Décalage vertical global

// Historique des données pour revenir en arrière
const history = [];

// Fonction principale pour afficher les données
function renderMindMap(url) {
    fetch(url)
        .then(response => {
            // Vérifier si la réponse est JSON ou HTML
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json(); // Retourner les données JSON
            } else {
                // Si la réponse est HTML, rediriger vers l'URL
                window.location.href = url;
                throw new Error("Redirecting to an HTML page.");
            }
        })
        .then(data => {
            // Ajouter les données actuelles à l'historique
            if (history.length === 0 || history[history.length - 1] !== url) {
                history.push(url);
            }

            // Vider le canvas SVG existant
            d3.select("svg").remove();

            // Créer un nouveau canvas SVG
            const svg = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("overflow", "hidden"); // Empêche les débordements;

            const root = d3.hierarchy(data);

            // Ajuster la disposition de l'arbre pour augmenter l'espacement entre les nœuds
            const treeLayout = d3.tree()
                .size([width - 10, height - 80]) // Augmenter la taille totale disponible
                .separation((a, b) => (a.parent === b.parent ? 2 : 3)); // Augmenter l'espacement horizontal et vertical
            treeLayout(root);

            // Décaler verticalement tous les nœuds
            root.descendants().forEach(d => {
                d.y += verticalOffset; // Ajoutez le décalage vertical
            });

            // Ajouter les lignes ondulées entre les nœuds
            const linkGenerator = d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y);

            svg.selectAll("path")
                .data(root.links())
                .enter()
                .append("path")
                .attr("d", linkGenerator)
                .attr("stroke", "#333")
                .attr("stroke-width", 2)
                .attr("fill", "none");

            // Ajouter les nœuds (cadres et textes)
            const nodes = svg.selectAll("g.node")
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("transform", d => `translate(${d.x}, ${d.y})`);

            // Ajouter les textes des nœuds
            nodes.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .text(d => d.data.name)
                .attr("font-size", "12px")
                .attr("fill", "black")
                .attr("cursor", "pointer")
                .each(function (d) {
                    // Ajuster la largeur des rectangles en fonction de la longueur des textes
                    const textWidth = this.getComputedTextLength();
                    d.textWidth = textWidth + 10; // Ajouter une marge
                })
                .on("click", (event, d) => {
                    if (d.data.url && d.data.url !== "#") {
                        if (d.data.isHtml) {
                            window.location.href = d.data.url;
                        } else {
                            renderMindMap(d.data.url);
                        }
                    }
                });

            // Ajouter les rectangles autour des textes
            nodes.insert("rect", "text") // Insérer avant les textes
                .attr("x", d => -d.textWidth / 2)
                .attr("y", -12)
                .attr("width", d => d.textWidth)
                .attr("height", 24)
                .attr("fill", "#f9f9f9")
                .attr("stroke", "#ccc")
                .attr("rx", 4) // Coins arrondis
                .attr("ry", 4);

            // Afficher le bouton "Back" si possible
            d3.select("#backButton")
                .style("display", history.length > 1 ? "block" : "none")
                .on("click", () => {
                    history.pop(); // Supprimer l'URL actuelle
                    const previousUrl = history[history.length - 1];
                    renderMindMap(previousUrl); // Charger l'URL précédente
                });
        })
        .catch(error => {
            console.error("Error loading mindmap:", error);
        });
}

// Charger la mind map principale au démarrage
renderMindMap('/mindmap');

async function performSearch() {
    const query = document.getElementById('query').value;
    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    const response = await fetch('http://127.0.0.1:5000/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, method: "bfs" })
    });

    const data = await response.json();
    displayResults(data.results);
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = results.map(res => `<p>${res}</p>`).join('');
}

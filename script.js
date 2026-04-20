/* --- 1. CONFIGURAZIONE DATI --- */
const explanations = {
    "prima-s-a1": "Parafrasi: con grande sfarzo oggi si celebra una gran festa in onore di San Michele.<br>Analisi: viene usata la figura retorica dell'iperbato.",
    "prima-s-a2": "Parafrasi: umiliando/umiliato dell'esiliato, serpe infernale.<br>Commento: si festeggia dato che il diavolo è stato battuto.",
    "prima-s-d1": "Commento: Riprende sarcasticamente i versi del suo avversario.",
    "prima-s-d2": "Commento: Non accetta la sconfitta, rifiutandosi di sottomettersi (non domo), e sfida aprtamente l'avversario, consapevole di tale sfida (cimento).",
    "seconda-s-d1": "Commento:<br> Lucifero non teme le vuote minacce dell'Angelo: orgoglio, sete di vendetta e il ricordo della sua ribellione mantengono vivo in lui il desiderio di conquista dell'Empireo.",
    "terza-s-d1": "Parafrasi: Non me ne andrò se non quando sarò sconfitto.",
    "terza-s-d2": "Commento: Piuttosto che andarsene, preferisce restare lì, provocando il suo avversario.",
    "Avernus": "Riferimento al lago d'Averno che nell'epica greca rappresenta un punto di ingresso per gli inferi.",
    "ottava-s-a1": "Commento:<br> San Michele non teme la sfida: affronterà Lucifero da solo.<br>Oppure: San Michele avvisa Lucifero che da ora in poi sguinerà la spada solo contro di lui e la sua armata.",
    // Aggiungi qui tutte le tue annotazioni
};

/* --- 2. RIFERIMENTI DOM --- */
const scriptContainer = document.getElementById('script-container');
const panel = document.getElementById('annotation-panel');
const content = document.getElementById('annotation-content');
const quotePreview = document.getElementById('selected-text-preview');
const closeBtn = document.getElementById('close-btn');

/* --- 3. FUNZIONE DI CHIUSURA (RESET) --- */
function closeAnnotation() {
    panel.classList.add('hidden');
    // Rimuove la classe active da TUTTI gli elementi evidenziati
    document.querySelectorAll('.annotated').forEach(el => {
        el.classList.remove('active');
    });
}

/* --- 4. GESTIONE CLICK (CON SUPPORTO GRUPPI) --- */
scriptContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('annotated')) {
        const id = e.target.getAttribute('data-id');
        const isAlreadyActive = e.target.classList.contains('active');

        // Se è già attivo, chiudiamo tutto (Toggle)
        if (isAlreadyActive) {
            closeAnnotation();
        } 
        else {
            // Pulizia: togliamo 'active' da ogni altro gruppo precedente
            document.querySelectorAll('.annotated').forEach(el => el.classList.remove('active'));

            // 1. SELEZIONE DI GRUPPO
            const group = document.querySelectorAll(`.annotated[data-id="${id}"]`);

            // 2. ATTIVAZIONE VISIVA DI TUTTI I SEGMENTI
            group.forEach(el => el.classList.add('active'));

            // 3. RECUPERO DI TUTTI I TESTI DEL GRUPPO
            // Trasformiamo la NodeList in un array, estraiamo il testo e lo uniamo
            const fullQuote = Array.from(group)
                .map(el => el.innerText.trim())
                .join(' [...] '); // Usiamo i puntini per indicare che il testo è spezzato

            // 4. AGGIORNAMENTO CONTENUTI PANNELLO
            quotePreview.innerText = fullQuote;
            content.innerHTML = `<p>${explanations[id] || "Spiegazione non trovata."}</p>`;

            panel.classList.remove('hidden');
            // ...
        }
    }
});

/* --- 5. GESTIONE HOVER DI GRUPPO (MOUSEOVER) --- */
scriptContainer.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('annotated')) {
        const id = e.target.getAttribute('data-id');
        const group = document.querySelectorAll(`.annotated[data-id="${id}"]`);
        group.forEach(el => el.classList.add('hover-group'));
    }
});

scriptContainer.addEventListener('mouseout', (e) => {
    if (e.target.classList.contains('annotated')) {
        const id = e.target.getAttribute('data-id');
        const group = document.querySelectorAll(`.annotated[data-id="${id}"]`);
        group.forEach(el => el.classList.remove('hover-group'));
    }
});

/* --- 6. CHIUSURA TRAMITE INTERFACCIA --- */
closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeAnnotation();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeAnnotation();
});
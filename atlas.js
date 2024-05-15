const staty = document.getElementById('staty');

function fetchDataAndRender(continent) {
    // Vyprázdní obsah divu 'staty'
    staty.innerHTML = '';

    fetch(`https://restcountries.com/v3.1/region/${continent}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            data.forEach(stat => {
                let blockCountry = `
                <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6">
                    <div class="card">
                        <a href="${stat.maps.googleMaps}">
                            <img class="card-img-top" src="${stat.flags.png}" alt="${stat.name.official}" />
                        </a>
                        <div class="card-body">
                            <h4 class="card-title">${stat.translations.ces ? stat.translations.ces.common : stat.name.official}</h4>
                            <p class="card-text">Počet obyvatel: ${stat.population}
                                <br>Rozloha: ${stat.area} km<sup>2</sup>
                            </p>
                        </div>
                    </div>                   
                </div>`;
                staty.innerHTML += blockCountry;
            });
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
            staty.innerHTML = `<p class="text-danger">Nastala chyba při načítání dat. Zkuste to prosím později.</p>`;
        });
}

const selectContinent = document.getElementById('selContinent');
selectContinent.addEventListener('change', function() {
    const selectedContinent = this.value;
    fetchDataAndRender(selectedContinent);
});

// Načte data pro výchozí hodnotu při načtení stránky
fetchDataAndRender(selectContinent.value);

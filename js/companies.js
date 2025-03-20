// companies.js
export function renderCompanies() {
    const companiesHTML = `
        <section class="page-companies" id="companies">
            <div id="portfolio">
                <h2 class="text-center mt-5 btn-light">Companies</h2>
                <div class="container-fluid p-0">
                    <div class="row g-0">
                        <!-- Conteúdo de Companies aqui -->
                        <div class="col-lg-4 col-sm-6">
                            <a class="portfolio-box" href="assets/img/companies/place/shop_place.jpg" title="Shop da Saúde">
                                <img class="img-fluid" src="assets/img/companies/thumbnails/shop_logo.png" alt="..." />
                                <div class="portfolio-box-caption">
                                    <div class="role text-white-40">Inter - iOS Developer</div>
                                    <div class="work-period"> dec de 2013 - dec de 2014</div>
                                    <div>-</div>
                                    <div class="role text-white-40">Business Owner</div>
                                    <div class="work-period"> dec de 2014 - dec de 2016</div>
                                </div>
                            </a>
                        </div>
                        <!-- Repita para os outros itens -->
                    </div>
                </div>
            </div>
        </section>
    `;
    return companiesHTML;
}
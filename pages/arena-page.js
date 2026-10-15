const routes = require('../routes/app-routes');

class ArenaPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'QA Automation Arena' });
    this.formsCategory = page.getByTestId('cat-btn-forms');
    this.networkCategory = page.getByTestId('cat-btn-network');
    this.formsCard = page.getByTestId('challenge-card-form-validation');
    this.networkCard = page.getByTestId('challenge-card-network-mocking');
  }

  async open() {
    await this.page.goto(routes.home);
  }
}

module.exports = { ArenaPage };


class NetworkSimulationPage {
  constructor(page) {
    this.page = page;
    this.card = page.getByTestId('challenge-card-network-mocking');
  }

  async dispatchStatus(statusCode) {
    await this.page.getByTestId(`btn-status-${statusCode}`).click();
  }
}

module.exports = { NetworkSimulationPage };


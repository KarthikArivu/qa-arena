class FormPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByTestId('input-username');
    this.password = page.getByTestId('input-password');
    this.passwordToggle = page.getByTestId('btn-toggle-password');
    this.description = page.getByTestId('textarea-bio');
    this.priorityCritical = page.getByTestId('radio-critical');
    this.auditLogs = page.getByTestId('check-aura');
    this.theme = page.getByTestId('select-aesthetic');
    this.email = page.getByTestId('form-input-email');
    this.age = page.getByTestId('form-input-age');
    this.terms = page.getByTestId('form-checkbox-agree');
    this.submit = page.getByTestId('btn-submit-form');
    this.validationCard = page.getByTestId('challenge-card-form-validation');
  }

  async submitApplication({ email, age, acceptedTerms = true }) {
    await this.email.fill(email);
    await this.age.fill(age);
    if (acceptedTerms) await this.terms.check();
    await this.submit.click();
  }
}

module.exports = { FormPage };


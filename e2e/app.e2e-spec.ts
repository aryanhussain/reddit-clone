import { PractivePage } from './app.po';

describe('practive App', () => {
  let page: PractivePage;

  beforeEach(() => {
    page = new PractivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

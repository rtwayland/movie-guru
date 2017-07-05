import { Ng4VersionPage } from './app.po';

describe('ng4-version App', () => {
  let page: Ng4VersionPage;

  beforeEach(() => {
    page = new Ng4VersionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

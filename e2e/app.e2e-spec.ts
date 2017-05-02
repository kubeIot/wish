import { Ng2Bs3ModalDemoAngularCliPage } from './app.po';

describe('ng2-bs3-modal-demo-angular-cli App', function() {
  let page: Ng2Bs3ModalDemoAngularCliPage;

  beforeEach(() => {
    page = new Ng2Bs3ModalDemoAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

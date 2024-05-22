// ...
// The tests trigger periodic asynchronous operations (via `setInterval()`), which will prevent
// the app from stabilizing. See https://angular.io/api/core/ApplicationRef#is-stable-examples
// for more details.
// To allow the tests to complete, we will disable automatically waiting for the Angular app to
// stabilize.
beforeEach(() => browser.waitForAngularEnabled(false));
afterEach(() => browser.waitForAngularEnabled(true));

it('timer and parent seconds should match', async () => {
  const parent = element(by.tagName(parentTag));
  const startButton = parent.element(by.buttonText('Start'));
  const seconds = parent.element(by.className('seconds'));
  const timer = parent.element(by.tagName('app-countdown-timer'));

  await startButton.click();

  // Wait for `<app-countdown-timer>` to be populated with any text.
  await browser.wait(() => timer.getText(), 2000);

  expect(await timer.getText()).toContain(await seconds.getText());
});

it('should stop the countdown', async () => {
  const parent = element(by.tagName(parentTag));
  const startButton = parent.element(by.buttonText('Start'));
  const stopButton = parent.element(by.buttonText('Stop'));
  const timer = parent.element(by.tagName('app-countdown-timer'));

  await startButton.click();
  expect(await timer.getText()).not.toContain('Holding');

  await stopButton.click();
  expect(await timer.getText()).toContain('Holding');
});
// ...

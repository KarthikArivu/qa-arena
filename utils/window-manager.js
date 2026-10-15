async function openNewPage(context, triggerAction) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    triggerAction(),
  ]);
  await newPage.waitForLoadState();
  return newPage;
}

async function capturePopup(parentPage, triggerAction) {
  const [popup] = await Promise.all([
    parentPage.waitForEvent('popup'),
    triggerAction(),
  ]);
  await popup.waitForLoadState();
  return popup;
}

module.exports = { openNewPage, capturePopup };


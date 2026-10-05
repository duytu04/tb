
window.__weddingOverrides = () => {
  const originalGenerateVietQRUrl = window.generateVietQRUrl;
  const embeddedQrByAccount = new Map([
    [window.WEDDING_CONFIG?.banking?.groom?.accountNumber, document.querySelector('#tab-groom .qr-image-display')?.src],
    [window.WEDDING_CONFIG?.banking?.bride?.accountNumber, document.querySelector('#tab-bride .qr-image-display')?.src],
  ]);
  window.generateVietQRUrl = (bankCode, accountNo, accountName, memo, template) =>
    embeddedQrByAccount.get(accountNo)
    || originalGenerateVietQRUrl(bankCode, accountNo, accountName, memo, template);
};

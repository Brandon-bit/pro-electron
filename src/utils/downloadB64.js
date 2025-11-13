export const downloadb64 = (b64, fileName) => {
    const linkSource = b64;
    const downloadLink = document.createElement("a");
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
};
//# sourceMappingURL=downloadB64.js.map
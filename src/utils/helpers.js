import user from "../data/credentials";

const verifyCreatedBoardUrl = async () => {
  let actualUrl = '';
  let expectedUrl = '';
  await browser.waitUntil(
    async () => {
      actualUrl = await browser.getUrl();
      const urlParts = actualUrl.split('/');
      const boardIdIndex = urlParts.indexOf('b') + 1;

      if (boardIdIndex === 0 || boardIdIndex >= urlParts.length) {
        return false;
      }
      const boardId = urlParts[boardIdIndex];
      expectedUrl = `https://trello.com/b/${boardId}/${user.boardTitle}`;

      return actualUrl = expectedUrl;
    },
    { timeout: 15000 }
  )
  return { actualUrl, expectedUrl }
}

module.exports = {verifyCreatedBoardUrl}

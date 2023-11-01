function filter(mailAll, mailBlack) {
let mailWhite = [];
let i = 0;
while (i < (mailAll.length)) {
  if (mailBlack.indexOf(mailAll[i]) == -1) {
    mailWhite.push(mailAll[i]);
    i = i + 1;
  } else {i = i + 1;
  }
}
return mailWhite;
};
export default filter;
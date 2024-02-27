export const generateAbbreviation = (groupName) => {
  let words = groupName.split(" ");
  let abbreviation = "";
  for (let i = 0; i < words.length && abbreviation.length < 2; i++) {
    let firstLetter = words[i][0];
    abbreviation += firstLetter.toUpperCase();
  }

  return abbreviation;
};

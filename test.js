function transformSkillData(rawSkills) {
  const groupedMap = {};

  rawSkills.forEach(({ SOURCE_NAME, SKILL_NAME }) => {
    if (!groupedMap[SOURCE_NAME]) {
      groupedMap[SOURCE_NAME] = {
        id: Date.now(), // or use any logic you want for ID
        name: SOURCE_NAME,
        skills: []
      };
    }
    groupedMap[SOURCE_NAME].skills.push(SKILL_NAME);
  });

  return Object.values(groupedMap);
}
const fs = require("fs");
const nunjucks = require("nunjucks");

const gulp = require("gulp");
const data = require("gulp-data");
const less = require("gulp-less");
const nunjucksRender = require("gulp-nunjucks-render");

const CONTENT_FILES = ["projects", "articles", "work", "education", "honors", "publications"];

const SKILLS = ["design", "management", "leadership", "usability/UX", "startup", "e-commerce",
                "AR/VR", "machine learning", "analytics", "computer science", "research", "ringtennis"];

function compare(a,b) {
  if (a.dateInt < b.dateInt)
    return +1;
  if (a.dateInt > b.dateInt)
    return -1;
  return 0;
}

/**
 * @unused
 * de-caching for data files
 * from: https://github.com/colynb/gulp-data/issues/17
 */
function requireUncached($module) {
    delete require.cache[require.resolve($module)];
    return require($module);
}

gulp.task("less", function() {
  return gulp.src(["css/day.less", "css/night.less"])
    .pipe(less())
    .pipe(gulp.dest("css"));
});

gulp.task("nunjucks", function() {
  const content = {
    categories: {},
    skills: {}
  };

  const skillsTemp = {};

  for (let i=0; i<SKILLS.length; ++i) {
    content.skills[SKILLS[i]] = [];
    skillsTemp[SKILLS[i]] = [];
  }

  content.skills.other = [];
  skillsTemp.other = [];
  
  for (let i=0; i<CONTENT_FILES.length; ++i) {
    const rawData = fs.readFileSync("assets/" + CONTENT_FILES[i] + ".json", "utf8");
    const jsonData = JSON.parse(rawData);
    const template = fs.readFileSync("assets/" + CONTENT_FILES[i] + ".nunjucks", "utf8");
    
    content.categories[jsonData.title] = [];
    
    for (let j=0; j<jsonData.entries.length; ++j) {
      const entryCategory = nunjucks.renderString(template, jsonData.entries[j]);
      const entrySkill = nunjucks.renderString(template, Object.assign({ category: jsonData.title }, jsonData.entries[j]));
      const tags = jsonData.entries[j].tags;
      
      content.categories[jsonData.title].push(entryCategory);
      
      let added = false;

      for (let k=0; k<tags.length; ++k) {
        if (skillsTemp[tags[k]]) {
          skillsTemp[tags[k]].push({ dateInt: jsonData.entries[j].dateInt, entry: entrySkill });
          added = true;
        }
      }

      if (!added) {
        skillsTemp.other.push({ dateInt: jsonData.entries[j].dateInt, entry: entrySkill });
      }
    }
  }

  for (let i=0; i<SKILLS.length; ++i) {
    skillsTemp[SKILLS[i]].sort(compare);

    for (let j=0; j<skillsTemp[SKILLS[i]].length; ++j) {
      content.skills[SKILLS[i]].push(skillsTemp[SKILLS[i]][j].entry);
    }
  }

  skillsTemp.other.sort(compare);

  for (let i=0; i<skillsTemp.other.length; ++i) {
    content.skills.other.push(skillsTemp.other[i].entry);
  }

  return gulp.src("index.nunjucks")
    .pipe(data(function() {
      return {
        categories: CONTENT_FILES,
        skills: SKILLS,
        content: content
      };
    }))
    .pipe(nunjucksRender())
    .pipe(gulp.dest("."));
});

gulp.task("watch", function() {
  gulp.watch("css/*.less", ["less"]);
  gulp.watch(["index.nunjucks", "assets/*.json", "assets/*.nunjucks"], ["nunjucks"]);
});

gulp.task("default", ["watch", "less", "nunjucks"]);

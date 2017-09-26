const fs = require("fs");
const nunjucks = require("nunjucks");

const gulp = require("gulp");
const data = require("gulp-data");
const less = require("gulp-less");
const nunjucksRender = require("gulp-nunjucks-render");

const CONTENT_FILES = ["cv"];
const SKILLS = ["design", "leadership", "management"];

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
  return gulp.src("css/*.less")
    .pipe(less())
    .pipe(gulp.dest("css"));
});

gulp.task("nunjucks", function() {
  const content = {};

  for (let i=0; i<SKILLS.length; ++i) {
    content[SKILLS[i]] = [];
  }
  
  for (let i=0; i<CONTENT_FILES.length; ++i) {
    const rawData = fs.readFileSync("assets/" + CONTENT_FILES[i] + ".json", "utf8");
    const jsonData = JSON.parse(rawData);
    const template = fs.readFileSync("assets/" + CONTENT_FILES[i] + ".nunjucks", "utf8");
    
    content[jsonData.title] = [];
    
    for (let j=0; j<rawData.entries; ++j) {
      const entryHtml = nunjucks.renderString(template, rawData.entries[j]);
      const tags = rawData.entries[j].tags;
      
      content[jsonData.title].push(entryHtml);
      
      for (let k=0; k<tags.length; ++k) {
        content[tags[k]].push(entryHtml);
      }
    }
    
    /*const contentObj = {
      id: jsonData.id,
      title: jsonData.title,
      html: nunjucks.renderString(template, jsonData)
    };

    content.push(contentObj);*/
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

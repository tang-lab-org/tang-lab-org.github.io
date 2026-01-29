module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/uploads": "uploads" });

  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi.getFilteredByTag("news").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addFilter("readableDate", function (dateObj) {
    if (!dateObj) return "";
    const fmt = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
    return fmt.format(dateObj);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk"
  };
};

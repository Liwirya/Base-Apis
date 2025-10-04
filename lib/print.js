const chalk = require("chalk");
const Spinnies = require("spinnies");
const util = require("util");

const spinnies = new Spinnies({
  spinner: {
    interval: 85,
    frames: ["∙∙∙", "●∙∙", "∙●∙", "∙∙●", "∙∙∙"],
  },
});

const log = function log(text, color) {
  return !color
    ? chalk.greenBright(util.format(text))
    : color.toLowerCase().includes("bright")
      ? chalk[color](util.format(text))
      : chalk.keyword(color)(util.format(text));
};

const anim = function animate(text, type = "start") {
  const spinnerKey = "animate";

  let hasSpinner = false;
  try {
    if (spinnies.list().some(s => s.key === spinnerKey)) {
      hasSpinner = true;
    }
  } catch (e) {
    hasSpinner = false;
  }

  if (!hasSpinner) {
    spinnies.add(spinnerKey, {
      color: "green",
      text: util.format(text),
    });
  } else {
    spinnies.update(spinnerKey, {
      color: "green",
      text: util.format(text),
    });
  }

  if (type === "stop") {
    spinnies.succeed(spinnerKey, { text: util.format(text) });
  } else if (type === "fail") {
    spinnies.fail(spinnerKey, { text: util.format(text) });
  }

  return spinnies;
};

module.exports = anim;
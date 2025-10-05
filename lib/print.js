const chalk = require("chalk");
const Spinnies = require("spinnies"); 
const util = require("util");

const spinnies = new Spinnies({
  spinner: {
    interval: 85,
    frames: ["∙∙∙", "●∙∙", "∙●∙", "∙∙●", "∙∙∙"], 
  },
  spinnerCount: 1, 
});

const log = function log(text, color) {
  try {
    const formattedText = typeof text === "string" ? text : util.format(text);
    if (!color) return chalk.greenBright(formattedText);

    const lowerColor = color.toLowerCase();
    if (lowerColor.includes("bright")) {
      return chalk[lowerColor](formattedText);
    } else if (chalk.keyword(lowerColor)) {
      return chalk.keyword(lowerColor)(formattedText);
    } else {
      return chalk.greenBright(formattedText); 
    }
  } catch (err) {
    console.error("❌ Error in log:", err.message);
    return String(text);
  }
};

const anim = function animate(text, type = "start") {
  const spinnerKey = "animate";
  const spinnerExists = spinnies.pick(spinnerKey) !== undefined;

  try {
    if (!spinnerExists) {
      spinnies.add(spinnerKey, {
        color: "green",
        text: util.format(text),
        indent: 2,
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
  } catch (err) {
    console.error("⚠️ Spinner error:", err.message);
    console.log(chalk.red("Failed to animate:"), text);
    return null; 
  }
};

const cleanup = () => {
  try {
    spinnies.stopAll();
  } catch (err) {
    console.warn("⚠️ Failed to stop spinners:", err.message);
  }
};

module.exports = {
  anim,
  log,
  cleanup,
};
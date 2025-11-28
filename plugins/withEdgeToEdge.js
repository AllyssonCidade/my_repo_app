const { withMainActivity } = require("@expo/config-plugins");

const KOTLIN_IMPORTS = [
  "import androidx.activity.enableEdgeToEdge",
  "import android.os.Bundle",
];
const JAVA_IMPORTS = [
  "import androidx.activity.EdgeToEdge;",
  "import android.os.Bundle;",
];

const addImports = (source, imports) => {
  const packageMatch = source.match(/package [^\n]+/);
  if (!packageMatch) {
    return source;
  }

  let updatedSource = source;
  const insertIndex = packageMatch.index + packageMatch[0].length;

  imports.forEach((statement) => {
    if (!updatedSource.includes(statement)) {
      updatedSource =
        updatedSource.slice(0, insertIndex + 1) +
        `\n${statement}` +
        updatedSource.slice(insertIndex + 1);
    }
  });

  return updatedSource;
};

const ensureKotlinOnCreate = (source) => {
  let updated = addImports(source, KOTLIN_IMPORTS);

  if (updated.includes("enableEdgeToEdge()")) {
    return updated;
  }

  if (updated.includes("override fun onCreate(")) {
    const superCallRegex = /super\.onCreate\([^\n]*\)\s*/;
    if (superCallRegex.test(updated)) {
      return updated.replace(superCallRegex, (match) => `${match}    enableEdgeToEdge()\n`);
    }

    return updated.replace(
      /override fun onCreate\([\s\S]*?\)\s*{\s*/,
      (match) => `${match}    enableEdgeToEdge()\n`
    );
  }

  const classMatch = updated.match(/class\s+MainActivity[^{]+{/);
  if (!classMatch) {
    return updated;
  }

  const insertionPoint = classMatch.index + classMatch[0].length;
  const snippet = `
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()
  }
`;

  return updated.slice(0, insertionPoint) + snippet + updated.slice(insertionPoint);
};

const ensureJavaOnCreate = (source) => {
  let updated = addImports(source, JAVA_IMPORTS);

  if (updated.includes("EdgeToEdge.enable(this);")) {
    return updated;
  }

  if (updated.includes("void onCreate(")) {
    const superCallRegex = /super\.onCreate\([^\n]*\);\s*/;
    if (superCallRegex.test(updated)) {
      return updated.replace(
        superCallRegex,
        (match) => `${match}    EdgeToEdge.enable(this);\n`
      );
    }

    return updated.replace(
      /void onCreate\([\s\S]*?\)\s*{\s*/,
      (match) => `${match}    EdgeToEdge.enable(this);\n`
    );
  }

  const classMatch = updated.match(/class\s+MainActivity[^{]+{/);
  if (!classMatch) {
    return updated;
  }

  const insertionPoint = classMatch.index + classMatch[0].length;
  const snippet = `
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    EdgeToEdge.enable(this);
  }
`;

  return updated.slice(0, insertionPoint) + snippet + updated.slice(insertionPoint);
};

const withEdgeToEdge = (config) => {
  return withMainActivity(config, (mainActivityConfig) => {
    const { modResults } = mainActivityConfig;
    if (!modResults?.contents) {
      return mainActivityConfig;
    }

    if (modResults.language === "java") {
      modResults.contents = ensureJavaOnCreate(modResults.contents);
    } else {
      modResults.contents = ensureKotlinOnCreate(modResults.contents);
    }

    return mainActivityConfig;
  });
};

module.exports = withEdgeToEdge;


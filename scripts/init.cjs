/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require("fs");
const path = require("path");
const { cwd } = require("process");
const { z } = require("zod");
const { execSync } = require("child_process");
const crypto = require("crypto");

const ENV_FILE = ".env.local";

const configSchema = z.object({
  init: z.boolean(),
  sanity: z.object({
    organizationId: z.string(),
  }),
});

let config = {};

try {
  config = JSON.parse(
    fs.readFileSync(path.join(cwd(), "fjellvann.json"), "utf8"),
  );
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }

  config = {
    init: false,
    sanity: {
      organizationId: "oYhMLpswK",
    },
  };

  console.log("Couldnt find config file, creating new one");

  fs.writeFileSync(
    path.join(cwd(), "fjellvann.json"),
    JSON.stringify(config, null, 2),
  );
}

const parsedConfig = configSchema.safeParse(config);

if (!parsedConfig.success) {
  console.error(parsedConfig.error);
  process.exit(1);
}

const { init, sanity } = parsedConfig.data;

if (init) {
  console.error("Project already initialized");
  process.exit(1);
}

const envVariables = {
  NEXT_PUBLIC_SITE_NAME: "",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "",
  NEXT_PUBLIC_SANITY_DATASET: "production",
  NEXT_PUBLIC_SANITY_API_VERSION: "",
  SANITY_API_READ_TOKEN: "",
  SANITY_API_WRITE_TOKEN: "",
  SANITY_API_REVALIDATE_SECRET: "",
  DATABASE_URL: "postgres://default:password@username",
  MAILGUN_API_KEY: "INSERT_MAILGUN_API_KEY_HERE",
  MAILGUN_SEND_TO: "hei@fjellvann.no",
  MAILGUN_DOMAIN: "mg.fjellvann.no",
};

try {
  execSync("npx sanity projects list", { stdio: "ignore" });
} catch (error) {
  console.log("Your not logged into Sanity, please run `npx sanity login`");
  process.exit(1);
}

try {
  const envFile = fs.readFileSync(path.join(cwd(), ENV_FILE), "utf8");

  if (envFile) {
    console.error("Env file already exists, please remove it and try again");
    process.exit(1);
  }
} catch (error) {
  if (error.code !== "ENOENT") {
    throw error;
  }

  fs.writeFileSync(
    path.join(cwd(), ENV_FILE),
    Object.entries(envVariables)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n"),
  );
}

function updateEnvFile(variables) {
  const envFile = fs.readFileSync(path.join(cwd(), ENV_FILE), "utf8");
  const lines = envFile.split("\n");
  const newLines = lines.map((line) => {
    const [key] = line.split("=");

    if (key in variables) {
      return `${key}=${variables[key]}`;
    }

    return line;
  });

  fs.writeFileSync(path.join(cwd(), ENV_FILE), newLines.join("\n"));
}

function sanityInit(name, organizationId) {
  console.log("Initializing Sanity project...");
  const project = execSync(
    `npx sanity init --create-project "${name}" --organization "${organizationId}" --dataset "production" --bare`,
  )
    .toString()
    .trim();

  const projectIdMatch = project.match(/Project ID: (\w+)/);

  if (!projectIdMatch) {
    console.error("Could not extract project ID from output, please try again");
    process.exit(1);
  }

  console.log(`Sanity project initialized: ${projectIdMatch[1]}`);

  updateEnvFile({
    NEXT_PUBLIC_SANITY_PROJECT_ID: projectIdMatch[1],
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SITE_NAME: name,
  });

  console.log("Creating Sanity tokens...");
  const readToken = execSync(
    `npx sanity tokens add "READ_TOKEN" --role=viewer --yes --project-id "${projectIdMatch[1]}"`,
  )
    .toString()
    .trim();

  const readTokenMatch = readToken.match(/Token: (\w+)/);

  const writeToken = execSync(
    `npx sanity tokens add "WRITE_TOKEN" --role=developer --yes --project-id "${projectIdMatch[1]}"`,
  )
    .toString()
    .trim();

  const writeTokenMatch = writeToken.match(/Token: (\w+)/);

  if (!writeTokenMatch || !readTokenMatch) {
    console.error(
      "Could not extract write token from output, please try again",
    );
    console.log(
      "Please go to https://www.sanity.io/manage/projects/ and create a new token",
    );
  }

  updateEnvFile({
    SANITY_API_READ_TOKEN: readTokenMatch[1] || "",
    SANITY_API_WRITE_TOKEN: writeTokenMatch[1] || "",
    SANITY_API_REVALIDATE_SECRET: crypto.randomBytes(32).toString("hex"),
    NEXT_PUBLIC_SANITY_API_VERSION: new Date().toISOString().split("T")[0],
  });

  console.log("Updated environment variables");

  console.log("Adding CORS...");
  execSync(
    `npx sanity cors add http://localhost:3000 --credentials --project-id "${projectIdMatch[1]}"`,
  );
  console.log("Successfully added CORS");
}

function updateReadme(projectName) {
  const title = projectName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  fs.writeFileSync(path.join(cwd(), "README.md"), `# ${title}\n\n`);
}

function cleanProject(projectName) {
  updateReadme(projectName);

  const pkgPath = path.join(cwd(), "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = projectName
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

  const gitignorePath = path.join(cwd(), ".gitignore");
  const toRemove = new Set([
    "# package manager",
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "bun.lockb",
    "bun.lock",
  ]);
  const lines = fs.readFileSync(gitignorePath, "utf8").split("\n");
  const newLines = lines.filter((line) => !toRemove.has(line.trim()));
  fs.writeFileSync(gitignorePath, newLines.join("\n"));
}

function main() {
  const name = process.argv[2];

  if (!name) {
    console.error("Please provide a project name");
    console.error("Usage: [npm|yarn|pnpm|bun] run init <project-name>");
    process.exit(1);
  }

  sanityInit(name, sanity.organizationId);

  console.log("Cleaning project...");

  cleanProject(name);

  console.log("Project initialized successfully");
}

main();

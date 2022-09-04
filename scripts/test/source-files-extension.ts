/* eslint-disable unicorn/prefer-module */
import { promises as fs } from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const checkSourceFilesExtension = async () => {
  try {
    const files = await fs.readdir(
      resolve(fileURLToPath(import.meta.url), "../../../source")
    );
    let hasIncorrectFileExtension = false;
    for (const file of files) {
      if (!file.endsWith(".d.ts")) {
        hasIncorrectFileExtension = true;
        console.error(`source/${file} extension should be \`.d.ts\`.`);
      }
    }

    if (hasIncorrectFileExtension) {
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

checkSourceFilesExtension();

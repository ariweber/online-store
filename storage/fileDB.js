import fs from "fs/promises";
import path from "path";

const PATH = process.env.DB_PATH;

function filepath(name) {
  return path.join(PATH, `${name}.json`);
}

export async function writeToJson(name, data) {
  try {
    const text = JSON.stringify(data, null, 2);
    await fs.writeFile(filepath(name), text, "utf-8");
  } catch (e) {
    console.log(e);
  }
}

export async function readFromJson(name) {
  try {
    const text = await fs.readFile(filepath(name), "utf-8");
    return JSON.parse(text || []);
  } catch (e) {
    console.log(e);
    return [];
  }
}

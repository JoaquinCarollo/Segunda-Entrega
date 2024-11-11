import path from "path";

const ROOT_PATH = path.resolve();

const SRC_PATH = path.join(ROOT_PATH, "src");

const paths = {
  root: ROOT_PATH,
  src: SRC_PATH,
  files: path.join(SRC_PATH, "files"),
};
export default paths;

#!/usr/bin/env node
// 使用Node开发命令行工具所执行的JavaScript脚本必须在顶部加入 #!/usr/bin/env node 声明

import { Command } from "commander";
const program = new Command();
import inquirer from "inquirer";
import download from "download-git-repo";
import ora from "ora";
import chalk from "chalk";
import fs from "fs";
import path from "path";
// import packageData from "./package.json" assert { type: "json" };
const packageData = JSON.parse(fs.readFileSync("./package.json", "utf8"));

const templates = {
  "ts-vue": {
    url: "https://github.com/easy-wheel/ts-vue",
    downloadUrl: "https://github.com:easy-wheel/ts-vue#master",
    description:
      "ts-vue是一个中后台前端解决方案，它基于 vue, typescript 和 element-ui实现。",
  },
  "umi-hooks": {
    url: "https://github.com/easy-wheel/Umi-hooks",
    downloadUrl: "https://github.com:easy-wheel/Umi-hooks#master",
    description:
      "Umi-Hooks是一个中后台前端解决方案，它基于 umi, react, typescript 和 ant-design实现。",
  },
};

program
  .version(packageData.version)
  .option("-i, --init", "初始化项目")
  .option("-V, --version", "查看版本号信息")
  .option("-l, --list", "查看可用模版列表");
program.parse(process.argv);
if (program.opts() && program.opts().init) {
  // 初始化项目
  inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名称",
      },
      {
        type: "input",
        name: "description",
        message: "请输入项目简介",
      },
      {
        type: "input",
        name: "author",
        message: "请输入作者名称",
      },
      {
        type: "list",
        name: "template",
        message: "选择其中一个作为项目模版",
        choices: ["ts-vue (vue+ts项目模版)", "umi-hooks (react+ts项目模版)"],
      },
    ])
    .then((answers) => {
      // 把采集到的用户输入的数据解析替换到 package.json 文件中
      console.log("选择", answers.template.split(" ")[0]);
      let url = templates[answers.template.split(" ")[0]].downloadUrl;
      initTemplateDefault(answers, url);
    });
}
if (program.opts() && program.opts().list) {
  // 查看可用模版列表
  for (let key in templates) {
    console.log(`${key} : ${templates[key].description}`);
  }
}

async function initTemplateDefault(customContent, gitUrl) {
  console.log(
    chalk.bold.cyan("CosenCli: ") + "will creating a new project starter"
  );
  const { projectName = "" } = customContent;

  try {
    await checkName(projectName);
    await downloadTemplate(gitUrl, projectName);
    await changeTemplate(customContent);

    console.log(chalk.green("template download completed"));
    console.log(
      chalk.bold.cyan("CosenCli: ") + "a new project starter is created"
    );
  } catch (error) {
    console.log(chalk.red(error));
  }
}

// 创建项目前校验是否已存在
function checkName(projectName) {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, data) => {
      if (err) {
        return reject(err);
      }
      if (data.includes(projectName)) {
        return reject(new Error(`${projectName} already exists!`));
      }
      resolve();
    });
  });
}

function downloadTemplate(gitUrl, projectName) {
  const spinner = ora("download template......").start();

  return new Promise((resolve, reject) => {
    download(
      gitUrl,
      path.resolve(process.cwd(), projectName),
      { clone: true },
      function (err) {
        if (err) {
          return reject(err);
          spinner.fail(); // 下载失败提示
        }
        spinner.succeed(); // 下载成功提示
        resolve();
      }
    );
  });
}

async function changeTemplate(customContent) {
  // name description author
  const { projectName = "", description = "", author = "" } = customContent;
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(process.cwd(), projectName, "package.json"),
      "utf8",
      (err, data) => {
        if (err) {
          return reject(err);
        }
        let packageContent = JSON.parse(data);
        packageContent.name = projectName;
        packageContent.author = author;
        packageContent.description = description;
        fs.writeFile(
          path.resolve(process.cwd(), projectName, "package.json"),
          JSON.stringify(packageContent, null, 2),
          "utf8",
          (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      }
    );
  });
}

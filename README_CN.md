# ScienceOL Docs

---

## 愿景

共同迈向科学通用智能（Science General Intelligence, SGI）的未来！

---

## 目录

- [项目简介](#项目简介)
- [特性](#特性)
- [快速开始](#快速开始)
- [文档](#文档)
- [社区与支持](#社区与支持)
- [参与贡献](#参与贡献)
- [许可证](#许可证)
- [联系方式](#联系方式)

---

## 项目简介

**ScienceOL Docs** 是 ScienceOL（科学在线工作室）生态的官方文档项目，致力于为用户和开发者提供全面、系统、易用的产品与开发文档。ScienceOL 旨在打造一个完全开源开放的通用 AI for Science 智能实验室系统，推动科学研究的自动化、智能化和协作化。

**生态产品线：**
- Studio：多环境管理与社区入口
- Protium：AI 原生容器化工作流调度
- Xyzen：实验室智能体
- Anti：3D 数字孪生平台（即将推出）
- LabOS：智能实验室操作系统

---

## 特性

- 🧩 **模块化结构**：按产品线、功能模块、开发指南等分类
- 🚀 **快速上手**：详细的快速开始、部署和开发指南
- 🛠️ **开发者友好**：完整 API 参考、架构设计、最佳实践
- 🌐 **社区驱动**：支持 PR 贡献，核心开发者答疑

---

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/ScienceOL/docs.git
cd docs
```

### 2. 安装依赖

建议使用 [Yarn](https://classic.yarnpkg.com/)

```bash
yarn install
```

### 3. 启动本地开发环境

```bash
yarn dev
```

本地文档服务默认运行在 [http://localhost:32235](http://localhost:32235)。

---

## 文档

- [中文文档](/src/app/(cn))
- 目录结构如下：

```
docs/
├── docker/           # Docker 部署相关配置
├── launch/           # 启动与构建脚本
├── public/           # 静态资源
├── src/
│   ├── app/          # 文档主目录（中英文分区）
│   ├── components/   # 复用组件
│   ├── styles/       # 样式文件
│   └── ...           # 其他辅助目录
├── README.md         # 英文项目说明
├── README.zh-CN.md   # 中文项目说明
├── package.json      # 依赖与脚本
└── ...               # 其他配置文件
```

---

## 社区与支持

- 官方网站：[https://scienceol.tech](https://scienceol.tech)
- GitHub Issues：[https://github.com/ScienceOL/docs/issues](https://github.com/ScienceOL/docs/issues)
- 主要开发团队与顾问：详见 [团队介绍](/src/app/(cn)/development/about/team/page.mdx)
- 有问题欢迎提 Issue 或 PR，或通过团队成员邮箱联系

---

## 参与贡献

我们欢迎任何形式的贡献，包括但不限于文档撰写、内容修正、功能建议和代码 PR。

1. Fork 本仓库并新建分支
2. 提交更改并发起 Pull Request
3. 等待社区和核心开发者审核

详细贡献指南请参阅 [开发文档指南](/src/app/(cn)/development/dev-docs/page.mdx)。

---

## 许可证

本项目采用 [GPL-3.0 License](./LICENSE)。

---

## 联系方式

- 官方网站：[https://scienceol.tech](https://scienceol.tech)
- GitHub Issues：[https://github.com/ScienceOL/docs/issues](https://github.com/ScienceOL/docs/issues)
- 主要开发团队与顾问：详见 [团队介绍](/src/app/(cn)/development/about/team/page.mdx)
- 邮箱：请在 Issues 留言或通过团队成员邮箱联系

---

如需进一步美化或添加徽章、Logo、致谢等内容，请告知！ 
# 文献管理说明

本文档介绍如何在项目中管理和展示学术文献。我们使用基于 Zotero 导出的 JSON 格式来存储文献数据，并通过自定义的 React 组件来展示。

## 文献数据格式

文献数据存储在 `src/app/(cn)/development/about/papers/refBibs.json` 文件中，使用 Zotero 的 JSON 导出格式。每个文献条目包含以下主要字段：

### 必需字段

- `key`: 唯一标识符
- `title`: 文献标题
- `creators`: 作者列表（包含 firstName, lastName, creatorType）
- `date`: 发表日期
- `itemType`: 文献类型（article, preprint, book 等）

### 可选字段

- `abstractNote`: 摘要
- `url`: 论文链接
- `DOI`: DOI 标识符
- `libraryCatalog`: 来源数据库
- `publicationTitle`: 期刊/会议名称
- `volume`: 卷号
- `issue`: 期号
- `pages`: 页码范围
- `publisher`: 出版社

## 添加新文献

### 方法一：通过 Zotero 管理（推荐）

1. 在 Zotero 中添加新的文献条目
2. 确保所有必要的元数据都已填写完整
3. 选择需要导出的文献条目
4. 选择 "文件" > "导出库" > 选择 "CSL JSON" 格式
5. 将导出的内容替换 `refBibs.json` 文件

### 方法二：手动添加

直接编辑 `refBibs.json` 文件，按照以下格式添加新条目：

```json
{
  "key": "uniqueKey2025",
  "title": "论文标题",
  "creators": [
    {
      "firstName": "名",
      "lastName": "姓",
      "creatorType": "author"
    }
  ],
  "date": "2025-01-01",
  "itemType": "article",
  "abstractNote": "论文摘要内容...",
  "url": "https://example.com/paper",
  "DOI": "10.1000/example",
  "libraryCatalog": "arXiv.org",
  "publicationTitle": "期刊名称",
  "volume": "1",
  "issue": "1",
  "pages": "1-10"
}
```

## 组件架构

### PaperList 组件

位置：`src/app/(cn)/development/about/papers/PaperList.tsx`

这是主要的文献展示组件，具有以下特性：

#### 设计特点

- **卡片式布局**：每个文献都以独立的卡片形式展示
- **响应式设计**：自适应不同屏幕尺寸，桌面端 2 列，移动端 1 列
- **交互动画**：鼠标悬停效果、下拉展开动画
- **一致的视觉风格**：与 Resources.tsx 组件保持相同的设计语言

#### 核心功能

1. **引用格式化**：自动格式化标准学术引用
2. **展开/收起**：点击下拉按钮查看详细信息
3. **外部链接**：支持访问原文和 DOI 链接
4. **摘要展示**：在展开状态下显示论文摘要
5. **元数据显示**：显示文献类型、来源、发表年份等信息

#### 引用格式

组件会自动将文献数据格式化为标准的学术引用格式：

- 作者列表（超过 3 人显示"等"）
- 发表年份
- 文献标题
- 期刊/会议名称
- 卷期号和页码
- DOI 链接

### 样式系统

- 使用 Tailwind CSS 进行样式管理
- 支持深色模式自动切换
- 使用 Framer Motion 实现流畅动画
- 与网站整体设计保持一致

## 页面集成

文献列表通过 MDX 页面集成：

```mdx
# 相关论文

import { PaperList } from './PaperList'

<PaperList />
```

## 自定义配置

### 修改引用格式

如需调整引用格式，请编辑 `PaperList.tsx` 中的 `formatCitation` 函数。

### 调整视觉样式

- 卡片布局：修改 `grid` 相关的 CSS 类
- 颜色主题：调整 Tailwind 颜色类
- 动画效果：修改 Framer Motion 的 `motion` 配置

### 添加新字段

1. 在 `PaperData` 接口中添加新字段
2. 在 `PaperCard` 组件中添加显示逻辑
3. 根据需要更新 `formatCitation` 函数

## 最佳实践

1. **数据一致性**：确保 JSON 数据格式的一致性
2. **完整元数据**：尽量填写完整的文献信息
3. **定期更新**：及时添加新的相关文献
4. **链接有效性**：定期检查外部链接的有效性
5. **备份数据**：定期备份文献数据库

## 故障排除

### 常见问题

1. **文献不显示**：检查 JSON 格式是否正确
2. **链接无效**：验证 URL 和 DOI 的正确性
3. **格式错误**：确保必需字段都已填写
4. **样式问题**：检查 Tailwind CSS 类名是否正确

### 调试方法

1. 在浏览器控制台查看错误信息
2. 验证 JSON 文件的语法正确性
3. 检查组件的 TypeScript 类型匹配

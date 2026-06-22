# demo_1.html 素材清单

源文件：
`D:\Document\Temp_Tengxun\xwechat_files\wxid_3rjkps9zp4q222_e6bb\msg\file\2026-06\jixie_260531\demo_1.html`

## 1. demo_1.html 直接引用

| 用途 | 引用值 | 类型 | 状态 |
| --- | --- | --- | --- |
| 左侧教室背景 | `classroom.jpg` | 本地图片 | 存在 |
| 返回课程页按钮 | `index2.html` | 本地 HTML | 存在 |
| 初始 iframe 页面 | `demo_wurenji.html` | 本地 HTML | 存在 |
| 讲解页 1 | `demo_wurenji.html` | 本地 HTML | 存在 |
| 讲解页 2 | `demo_wurenji0.html` | 本地 HTML | 存在 |
| 讲解页 3 | `demo_wurenji.html` | 本地 HTML | 存在 |
| 讲解页 4 | `demo_room3d.html` | 本地 HTML | 存在 |
| 讲解页 5 | `demo_mindmap.html` | 本地 HTML | 存在 |
| 讲解页 6 | `demo_question.html` | 本地 HTML | 存在 |
| 讲解页 7 | `demo_gallery.html` | 本地 HTML | 存在 |

## 2. 子页面继续引用的素材

| 来源页面 | 用途 | 引用值 | 类型 | 状态 |
| --- | --- | --- | --- | --- |
| `demo_wurenji.html` | 3D 引擎 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` | 外部 JS | 网络资源 |
| `demo_wurenji0.html` | 3D 引擎 | `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js` | 外部 JS | 网络资源 |
| `demo_room3d.html` | 室内重建视频 | `Room.mp4` | 本地视频 | 缺失 |
| `index2.html` | 课程封面图 | `robot.jpg` | 本地图片 | 存在 |
| `index2.html` | 课程跳转页 | `course_1_1.html` | 本地 HTML | 存在 |

## 3. demo_gallery.html 外部图片

`demo_gallery.html` 中有 37 张外部图片，全部不是本地文件，来自以下域名：

- `i0.hdslb.com`
- `i1.hdslb.com`
- `i2.hdslb.com`
- `archive.biliimg.com`

这些图片目前是直接写在页面里的远程 URL，不在当前文件夹里。

## 4. 如果你要把页面整理到一个独立文件夹，建议至少包含

必需文件：

- `demo_1.html`
- `classroom.jpg`
- `demo_wurenji.html`
- `demo_wurenji0.html`
- `demo_room3d.html`
- `demo_mindmap.html`
- `demo_question.html`
- `demo_gallery.html`

为了让返回按钮正常工作，建议同时放入：

- `index2.html`
- `robot.jpg`
- `course_1_1.html`

目前缺少但页面会尝试加载：

- `Room.mp4`

如果你希望完全离线可用，还需要额外处理：

- `three.min.js` 改成本地文件
- `demo_gallery.html` 里的 37 张远程图片下载到本地并改引用

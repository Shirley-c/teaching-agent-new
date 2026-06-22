﻿import React, { useState, useEffect, useRef } from "react";
import {
  Compass,
  Cpu,
  Database,
  Layers,
  ArrowRight,
  Play,
  Pause,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Save,
  Send,
  BookOpen,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Sparkles,
  Info,
  GripVertical,
  Search,
  FolderOpen,
  X,
  Paperclip,
  Maximize2,
  Mic,
  Languages,
  LayoutTemplate,
  MonitorPlay,
  FileText,
  CheckCircle2,
  Settings2,
  Bot,
  ShieldAlert,
  MessageCircle,
} from "lucide-react";
const DEMO_PAGE_ASSETS = [
  {
    id: "demo-1",
    title: "四旋翼无人机介绍",
    type: "iframe",
    src: "/demo-assets/jixie/demo_wurenji.html",
  },
  {
    id: "demo-2",
    title: "四旋翼飞行原理 3D 演示",
    type: "iframe",
    src: "/demo-assets/jixie/demo_wurenji0.html",
  },
  {
    id: "demo-3",
    title: "无人机峡谷飞行",
    type: "iframe",
    src: "/demo-assets/jixie/demo_wurenji.html",
  },
  {
    id: "demo-4",
    title: "室内三维重建",
    type: "iframe",
    src: "/demo-assets/jixie/demo_room3d.html",
  },
  {
    id: "demo-5",
    title: "机器人知识图谱",
    type: "iframe",
    src: "/demo-assets/jixie/demo_mindmap.html",
  },
  {
    id: "demo-6",
    title: "思考问题页",
    type: "iframe",
    src: "/demo-assets/jixie/demo_question.html",
  },
  {
    id: "demo-7",
    title: "无人机图鉴",
    type: "iframe",
    src: "/demo-assets/jixie/demo_gallery.html",
  },
];
const DEMO_LECTURE_MAPPING = [
  {
    keywords: ["机器人概述", "无人机概述", "四旋翼", "机器人的定义"],
    demoAssetId: "demo-1",
    contentTitle: "四旋翼无人机基础认知",
    conceptLabel: "无人机系统认知",
    bulletPoints: [
      {
        label: "基本构型",
        desc: "四旋翼无人机由机架、电机、螺旋桨、控制系统等组成。",
      },
      {
        label: "飞行原理",
        desc: "通过四个旋翼转速差实现升降、偏航、俯仰和横滚。",
      },
      {
        label: "课程引入",
        desc: "用无人机案例帮助学生理解机器人系统的感知、控制与执行。",
      },
    ],
    content:
      "本页对应 demo_1.html 中的无人机引入场景。重点介绍四旋翼无人机的基本构成、运动方式，以及它为什么能作为机器人工程基础课程的典型案例。",
    script:
      "同学们好，这一页我们先从四旋翼无人机入手，建立对机器人系统的整体认识。大家可以观察它的结构组成，并思考它如何通过旋翼转速变化实现不同飞行动作。",
  },
  {
    keywords: ["飞行原理", "姿态控制", "俯仰", "横滚", "偏航"],
    demoAssetId: "demo-2",
    contentTitle: "四旋翼飞行原理与姿态控制",
    conceptLabel: "控制原理",
    bulletPoints: [
      {
        label: "升力产生",
        desc: "旋翼高速转动产生升力，是无人机起飞和悬停的基础。",
      },
      {
        label: "姿态调节",
        desc: "通过不同旋翼的速度变化控制俯仰、横滚和偏航。",
      },
      { label: "控制逻辑", desc: "飞控系统持续修正姿态，保证飞行稳定性。" },
    ],
    content:
      "本页对应 demo_1.html 中四旋翼飞行原理页。重点讲解升力、姿态控制和飞控稳定机制。",
    script:
      "这一页重点理解四旋翼为什么能稳定飞行。请同学们关注不同旋翼转速变化带来的姿态变化，这是机器人控制思想在飞行器上的直接体现。",
  },
  {
    keywords: ["挑战", "场景", "路径", "避障", "峡谷"],
    demoAssetId: "demo-3",
    contentTitle: "复杂场景下的无人机任务挑战",
    conceptLabel: "任务场景",
    bulletPoints: [
      { label: "复杂环境", desc: "峡谷等复杂环境会带来地形变化和气流扰动。" },
      { label: "感知需求", desc: "无人机需要实时感知位置、障碍和飞行状态。" },
      {
        label: "控制要求",
        desc: "复杂场景更考验控制系统鲁棒性和路径规划能力。",
      },
    ],
    content:
      "本页对应 demo_1.html 中无人机峡谷挑战页面，用于引出复杂环境中的感知与控制问题。",
    script:
      "当无人机进入峡谷等复杂环境时，它面对的不只是飞行本身，还包括感知、决策和控制的综合挑战。这正是机器人工程中的核心问题。",
  },
  {
    keywords: ["SLAM", "三维重建", "室内重建", "感知", "建图"],
    demoAssetId: "demo-4",
    contentTitle: "SLAM 与室内三维重建",
    conceptLabel: "环境感知",
    bulletPoints: [
      {
        label: "同步定位建图",
        desc: "SLAM 让机器人能够一边定位、一边构建环境地图。",
      },
      {
        label: "室内场景",
        desc: "室内场景重建体现了机器人对空间结构的理解能力。",
      },
      {
        label: "应用价值",
        desc: "该技术广泛用于导航、巡检、服务机器人等领域。",
      },
    ],
    content:
      "本页对应 demo_1.html 中室内三维重建页面，重点讲 SLAM 的基本作用和工程意义。",
    script:
      "这一页我们结合室内三维重建案例理解 SLAM。它的关键价值在于让机器人能够认识环境、定位自己，并逐步建立可用地图。",
  },
  {
    keywords: ["知识图谱", "体系", "知识结构", "思维导图"],
    demoAssetId: "demo-5",
    contentTitle: "机器人工程基础知识体系梳理",
    conceptLabel: "知识框架",
    bulletPoints: [
      {
        label: "学科结构",
        desc: "从机构学到运动学，再到动力学和智能控制，构成课程主线。",
      },
      {
        label: "模块关联",
        desc: "不同知识模块彼此支撑，共同构成机器人理论基础。",
      },
      { label: "学习路径", desc: "通过结构化梳理帮助学生建立整体认知。" },
    ],
    content: "本页对应 demo_1.html 中的知识图谱页面，用于总览课程知识结构。",
    script:
      "到这里我们不再只看单个案例，而是回到整个课程知识框架。请同学们关注各模块之间的关系，形成整体学习地图。",
  },
  {
    keywords: ["思考题", "提问", "讨论", "课堂问题"],
    demoAssetId: "demo-6",
    contentTitle: "课堂思考与知识回顾",
    conceptLabel: "课堂互动",
    bulletPoints: [
      { label: "核心回顾", desc: "回顾机器人组成、SLAM 作用等核心内容。" },
      { label: "问题驱动", desc: "通过思考题检验学生理解程度。" },
      { label: "启发总结", desc: "鼓励学生从案例回到原理层面思考。" },
    ],
    content:
      "本页对应 demo_1.html 中的思考问题页面，适合作为课堂检查与互动环节。",
    script:
      "这一页我们通过几个关键问题来检验理解情况。请大家不仅回答结论，还要说出背后的原理依据。",
  },
  {
    keywords: ["图鉴", "案例", "应用", "无人机类型"],
    demoAssetId: "demo-7",
    contentTitle: "无人机应用图鉴与案例拓展",
    conceptLabel: "应用拓展",
    bulletPoints: [
      {
        label: "应用场景",
        desc: "无人机已广泛用于航拍、巡检、农业、物流等场景。",
      },
      {
        label: "类型差异",
        desc: "不同无人机在结构、任务和控制策略上存在差异。",
      },
      { label: "技术趋势", desc: "无人机技术正持续推动机器人应用边界扩展。" },
    ],
    content:
      "本页对应 demo_1.html 中的无人机图鉴页面，用于课程收束和应用拓展。",
    script:
      "最后这一页，我们通过无人机图鉴把知识落到真实应用场景中，帮助大家理解机器人技术的发展方向和行业价值。",
  },
];
const getValidDemoAssetId = (demoAssetId: string) => {
  return DEMO_PAGE_ASSETS.some((item) => item.id === demoAssetId)
    ? demoAssetId
    : "";
};
const createDemoOnlySlideData = (demoAssetId: string, fallbackTitle = "") => ({
  contentTitle: fallbackTitle,
  conceptLabel: "",
  bulletPoints: [],
  content: "",
  demoAssetId,
  demoOnly: true,
});
// --- Comprehensive Mock Resource Database ---
const MOCK_KNOWLEDGE_BASES = [
  { id: "kb-1", name: "《机器人工程基础》核心考点库", count: 124 },
  { id: "kb-2", name: "历年期中/期末真题卷库", count: 58 },
];
const MOCK_RESOURCE_LIBRARIES = [
  { id: "rl-1", name: "《机器人工程基础》共享PPT模板库", count: 35 },
  { id: "rl-2", name: "《机器人工程基础》动画微课资源", count: 80 },
];
const masterResourceLibrary = [
  {
    id: "res-1",
    title: "《机器人工程基础》大学课程新编教材.pdf",
    type: "pdf",
    size: "14.2 MB",
    date: "2026-03-10",
    category: "all-school",
    sourceId: "kb-1",
  },
  {
    id: "res-2",
    title: "《机器人工程基础》精讲教学课件.pptx",
    type: "pptx",
    size: "8.5 MB",
    date: "2026-04-15",
    category: "department",
    sourceId: "rl-1",
  },
  {
    id: "res-3",
    title: "《机器人工程基础》课后习题与思维拓展详解.docx",
    type: "word",
    size: "1.2 MB",
    date: "2026-05-01",
    category: "my-upload",
    sourceId: "kb-1",
  },
  {
    id: "res-4",
    title: "《机器人工程基础》仿真模型搭建与实训操作手册.pdf",
    type: "pdf",
    size: "3.4 MB",
    date: "2026-05-18",
    category: "department",
    sourceId: "kb-2",
  },
  {
    id: "res-5",
    title: "《机器人工程基础》核心知识体系思维导图高清PNG图集.png",
    type: "png",
    size: "2.1 MB",
    date: "2026-05-20",
    category: "all-school",
    sourceId: "kb-2",
  },
  {
    id: "res-6",
    title: "《机器人工程基础》运动规划与仿真模型运行演示动画.mp4",
    type: "video",
    size: "45.8 MB",
    date: "2026-05-22",
    category: "recommended",
    sourceId: "rl-2",
  },
];
// --- Gemini API Setup ---
const apiKey = ""; // <--- 请在此处配置您的 Gemini API Key
const callGeminiAPI = async (prompt, isJson = false) => {
  // --- AI SIMULATION FALLBACK (Prevents crashing if no API key is provided) ---
  if (!apiKey) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isJson && prompt.includes("结构化的教学大纲")) {
          resolve(`[
                {
                  "id": "s-1",
                  "title": "第一章 机器人概述",
                  "desc": "了解机器人的基本概念、发展历程、分类方法及系统组成",
                  "sections": [
                    { "id": "sec-1-1", "title": "1.1 四旋翼无人机基础认知" },
                    { "id": "sec-1-2", "title": "1.2 四旋翼飞行原理与姿态控制" }
                  ]
                },
                {
                  "id": "s-2",
                  "title": "第二章 复杂场景任务与环境感知",
                  "desc": "围绕无人机任务挑战与空间感知，理解机器人在复杂环境中的核心能力",
                  "sections": [
                    { "id": "sec-2-1", "title": "2.1 复杂场景下的无人机任务挑战" },
                    { "id": "sec-2-2", "title": "2.2 SLAM 与室内三维重建" }
                  ]
                },
                {
                  "id": "s-3",
                  "title": "第三章 知识梳理与应用拓展",
                  "desc": "完成课程知识框架梳理、课堂互动回顾与真实应用拓展",
                  "sections": [
                    { "id": "sec-3-1", "title": "3.1 机器人工程基础知识体系梳理" },
                    { "id": "sec-3-2", "title": "3.2 课堂思考与知识回顾" },
                    { "id": "sec-3-3", "title": "3.3 无人机应用图鉴与案例拓展" }
                  ]
                }
              ]`);
        } else if (
          isJson &&
          (prompt.includes("互动幻灯片") || prompt.includes("课件"))
        ) {
          resolve(`{
                "contentTitle": "AI生成的新幻灯片",
                "conceptLabel": "智能补充内容",
                "bulletPoints": [
                  { "label": "核心要点一", "desc": "这是根据您微调后的提示词由 AI 生成的关键知识点一。" },
                  { "label": "核心要点二", "desc": "这是根据您微调后的提示词由 AI 生成的关键知识点二。" }
                ],
                "content": "### 💡 核心推导过程\\n\\n这里展示了推导的具体细节和公式运用。请同学们认真观察并尝试自己写出计算步骤。\\n\\n$$\\\\frac{3}{5} \\\\times \\\\frac{1}{2} = \\\\frac{3}{10}$$"
              }`);
        } else if (prompt.includes("润色和扩写")) {
          resolve(
            `好的同学们！看黑板，咱们刚刚提到的这些概念是不是非常有趣？如果我们把这个原理应用到生活里，你们觉得还会发生什么奇妙的化学反应呢？请大家在脑海中快速构思一个属于你自己的小实验方案，我们一会儿抽查！`,
          );
        } else if (prompt.includes("讲稿")) {
          resolve(
            `各位同学，欢迎来到本次课程。今天我们要探索一个非常核心的知识点，请大家注意屏幕上的这个重要公式。在我们开始之前，先一起回顾一下上一节课的内容。`,
          );
        } else if (
          prompt.includes("理论考试") ||
          prompt.includes("试卷") ||
          prompt.includes("理论考卷")
        ) {
          resolve(
            `理论摸底测试卷\n\n一、 单项选择题 (每题 20 分)\n1. 分数乘分数的核心运算法则是？\n   A. 分子加分子，分母加分母\n   B. 分子乘分子作分子，分母不变\n   C. 分子相乘作新分子，分母相乘作新分母\n   D. 交叉相乘\n   答案：C\n\n二、 简答题 (每题 60 分)\n1. 请简述在生活中遇到“求一个数的几分之几”时，你会如何用折纸或面积模型向别人直观解释？\n\n   参考答案解析：\n   可以拿出一张正方形纸代表单位“1”，先对折表示二分之一，然后在二分之一的基础上再进行垂直对折或涂色，展示双重阴影重叠的部分，从而直观推导出结果。`,
          );
        } else {
          resolve(
            `老师您好，针对您刚刚提出的问题，我的建议是：可以考虑结合生活中的具体案例（例如分披萨、买水果等）来引导学生。您觉得这个切入点怎么样？`,
          );
        }
      }, 1500);
    });
  }
  // --- Real API Fetch ---
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: {
      parts: [
        {
          text: "你是一个专门为教育工作者服务的金牌 AI 备课助教，专业、严谨且富有创造力。输出内容直接纯文本，不需要额外的寒暄。",
        },
      ],
    },
  };
  if (isJson) {
    payload.generationConfig = { responseMimeType: "application/json" };
  }
  const maxRetries = 3;
  const delays = [1000, 2000, 4000];
  let lastError = null;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`API 请求错误: ${response.status}`);
      }
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delays[i]));
      }
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isJson && prompt.includes("结构化的教学大纲")) {
        resolve(
          `[
            {"id": "s-1", "title": "降级大纲第一章", "desc": "AI由于网络原因临时生成的降级大纲", "sections": [{"id": "sec-1-1", "title": "1.1 四旋翼无人机基础认知"}, {"id": "sec-1-2", "title": "1.2 四旋翼飞行原理与姿态控制"}]},
            {"id": "s-2", "title": "降级大纲第二章", "desc": "AI由于网络原因临时生成的降级大纲", "sections": [{"id": "sec-2-1", "title": "2.1 复杂场景下的无人机任务挑战"}, {"id": "sec-2-2", "title": "2.2 SLAM 与室内三维重建"}]},
            {"id": "s-3", "title": "降级大纲第三章", "desc": "AI由于网络原因临时生成的降级大纲", "sections": [{"id": "sec-3-1", "title": "3.1 机器人工程基础知识体系梳理"}, {"id": "sec-3-2", "title": "3.2 课堂思考与知识回顾"}, {"id": "sec-3-3", "title": "3.3 无人机应用图鉴与案例拓展"}]}
          ]`,
        );
      } else if (isJson) {
        resolve(
          `{"contentTitle": "降级生成页面", "conceptLabel": "网络异常", "bulletPoints": [{"label": "提示", "desc": "由于真实 API 访问受限，这是兜底返回的内容。"}], "content": "请检查网络或 API Key。"}`,
        );
      } else {
        resolve(
          "（由于无法连接到真实 API，这是 AI 返回的模拟答案，请您在代码中配置真实密钥体验完整功能。）",
        );
      }
    }, 500);
  });
};
export default function App() {
  const [step4Source, setStep4Source] = useState<
    "editor" | "saved-coursewares"
  >("editor");
  const [step2Source, setStep2Source] = useState<
    "normal" | "saved-coursewares"
  >("normal");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [workStep, setWorkStep] = useState(1);
  const [courseName, setCourseName] = useState("《机器人工程基础》");
  const [knowledgeDesc, setKnowledgeDesc] = useState(
    "机器人工程基础主要包括机器人的定义、发展历程、分类与应用、系统构成等概述性知识，以及描述机器人位姿与运动的数学基础，涵盖位置与姿态描述、坐标变换、线速度与角速度、加速度分析及刚体平动与转动的牛顿-欧拉动力学方程等核心理论。",
  );
  // Tab 切换状态
  const [step2Tab, setStep2Tab] = useState("presentation"); // 'presentation' | 'interactive' | 'exam'
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});
  const [step4Tab, setStep4Tab] = useState("presentation"); // 'presentation' | 'interactive' | 'exam'
  const [examPreviewTab, setExamPreviewTab] = useState("theoretical"); // 'theoretical' | 'practical'
  // 考试模式配置状态
  const [examConfig, setExamConfig] = useState({
    theoreticalPrompt:
      "你是高级教研员。请根据当前课程规划，生成一份针对性的理论考试卷，包含单选题和简答题，并附带参考答案。请直接返回排版清晰的纯文本，不要使用任何 Markdown 语法符号。",
    theoreticalContent: null,
    practicalUrl: "http://pub.qianma.cc/webgl/posuiji/index.html",
  });
  const [isGeneratingExam, setIsGeneratingExam] = useState(false);
  // 交互模式配置状态
  const [interactionConfig, setInteractionConfig] = useState({
    retrievalScope: "all-linked",
    topK: 3,
    similarityThreshold: 0.75,
    systemPrompt:
      "我是本课程的高级AI助教。会用亲切、鼓励的语气回答学生的问题，多用启发式提问。",
    responseLength: "detailed",
    requireCitations: true,
    contextTurns: 10,
    dailyLimit: 30,
    fallbackTemplate:
      "这个问题似乎超出了咱们当前《机器人工程基础》的课程范围哦。咱们要不要聊聊和机器人相关的内容呢？",
  });
  // 第一步关联的知识库/资源库状态
  const [linkedKBs, setLinkedKBs] = useState([]);
  const [linkedRLs, setLinkedRLs] = useState([]);
  // 第一步选择库的模态框状态
  const [isSelectKBModalOpen, setIsSelectKBModalOpen] = useState(false);
  const [isSelectRLModalOpen, setIsSelectRLModalOpen] = useState(false);
  const [tempSelectedKBs, setTempSelectedKBs] = useState([]);
  const [tempSelectedRLs, setTempSelectedRLs] = useState([]);
  const [loadingType, setLoadingType] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [syllabus, setSyllabus] = useState([
    {
      id: "ch-1",
      title: "第一章：机器人概述与飞行基础",
      desc: "从四旋翼无人机切入，建立对机器人系统与飞行控制的初步认知。",
      sections: [
        {
          id: "sec-1-1",
          title: "1.1 四旋翼无人机基础认知",
          materials: [],
          slideData: null,
          script: null,
        },
        {
          id: "sec-1-2",
          title: "1.2 四旋翼飞行原理与姿态控制",
          materials: [],
          slideData: null,
          script: null,
        },
      ],
    },
    {
      id: "ch-2",
      title: "第二章：复杂场景任务与环境感知",
      desc: "通过任务挑战和重建场景，认识机器人在复杂环境中的感知与控制。",
      sections: [
        {
          id: "sec-2-1",
          title: "2.1 复杂场景下的无人机任务挑战",
          materials: [],
          slideData: null,
          script: null,
        },
        {
          id: "sec-2-2",
          title: "2.2 SLAM 与室内三维重建",
          materials: [],
          slideData: null,
          script: null,
        },
      ],
    },
    {
      id: "ch-3",
      title: "第三章：知识梳理与应用拓展",
      desc: "完成知识框架总结、课堂回顾与应用图鉴展示。",
      sections: [
        {
          id: "sec-3-1",
          title: "3.1 机器人工程基础知识体系梳理",
          materials: [],
          slideData: null,
          script: null,
        },
        {
          id: "sec-3-2",
          title: "3.2 课堂思考与知识回顾",
          materials: [],
          slideData: null,
          script: null,
        },
        {
          id: "sec-3-3",
          title: "3.3 无人机应用图鉴与案例拓展",
          materials: [],
          slideData: null,
          script: null,
        },
      ],
    },
  ]);
  const [activeSectionId, setActiveSectionId] = useState("sec-1-1");
  const [isSectionAiGenerating, setIsSectionAiGenerating] = useState(false);
  const [courseware, setCourseware] = useState([]);
  const [savedCoursewares, setSavedCoursewares] = useState([]);
  const [hasLoadedSavedCoursewares, setHasLoadedSavedCoursewares] =
    useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreenPreview, setIsFullScreenPreview] = useState(false);
  // 素材模态框
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [tempSelectedResources, setTempSelectedResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("kb");
  // Toast & TTS 动画
  const [toastMessage, setToastMessage] = useState("");
  const [showToastBool, setShowToastBool] = useState(false);
  const speechRef = useRef(null);
  const practicalExamFullscreenRef = useRef<HTMLDivElement | null>(null);
  const [waveBars, setWaveBars] = useState(Array(24).fill(3));
  const hasGeneratedSectionAssets = syllabus.some((ch) =>
    ch.sections?.some((sec) => sec.slideData || sec.script),
  );
  const showToast = (msg) => {
    setToastMessage(msg);
    setShowToastBool(true);
    setTimeout(() => setShowToastBool(false), 3000);
  };
  useEffect(() => {
    let interval;
    if (isTtsSpeaking && !isMuted) {
      interval = setInterval(() => {
        setWaveBars(
          Array(24)
            .fill(0)
            .map(() => Math.floor(Math.random() * 28) + 3),
        );
      }, 80);
    } else {
      setWaveBars(Array(24).fill(3));
    }
    return () => clearInterval(interval);
  }, [isTtsSpeaking, isMuted]);
  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  useEffect(() => {
    if (workStep !== 2) return;
    if (!syllabus.length || !syllabus[0].sections?.length) return;
    const firstSectionId = syllabus[0].sections[0].id;
    setActiveSectionId(firstSectionId);
    setExpandedSections({ [firstSectionId]: true });
  }, [workStep]);
  useEffect(() => {
    const raw = localStorage.getItem("saved-coursewares");
    if (raw) {
      setSavedCoursewares(JSON.parse(raw));
    }
    setHasLoadedSavedCoursewares(true);
  }, []);
  useEffect(() => {
    if (!hasLoadedSavedCoursewares) return;
    localStorage.setItem("saved-coursewares", JSON.stringify(savedCoursewares));
  }, [savedCoursewares, hasLoadedSavedCoursewares]);
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (isMuted || !text) {
        setIsTtsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = playbackSpeed;
      utterance.onstart = () => setIsTtsSpeaking(true);
      utterance.onend = () => {
        setIsTtsSpeaking(false);
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsTtsSpeaking(false);
        setIsPlaying(false);
      };
      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      setIsTtsSpeaking(true);
      setTimeout(() => setIsTtsSpeaking(false), 3000);
    }
  };
  const openPracticalExamFullscreen = async () => {
    const el = practicalExamFullscreenRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      }
    } catch (error) {
      console.error(error);
      showToast("当前浏览器不支持全屏或全屏开启失败");
    }
  };
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsTtsSpeaking(false);
    setIsPlaying(false);
  };
  const togglePlay = () => {
    if (isPlaying) {
      stopSpeaking();
    } else {
      setIsPlaying(true);
      if (workStep === 2 && step2Tab === "presentation") {
        let activeSec;
        syllabus.forEach((ch) => {
          const sec = ch.sections?.find((s) => s.id === activeSectionId);
          if (sec) activeSec = sec;
        });
        if (activeSec?.script) speakText(activeSec.script);
      } else if (
        workStep === 4 &&
        courseware[currentSlide]?.script &&
        step4Tab === "presentation"
      ) {
        speakText(courseware[currentSlide].script);
      }
    }
  };
  const navigateSection = (direction) => {
    stopSpeaking();
    if (workStep === 2 && step2Tab === "presentation") {
      let allSecs = [];
      syllabus.forEach((ch) => ch.sections?.forEach((s) => allSecs.push(s)));
      const currentIndex = allSecs.findIndex((s) => s.id === activeSectionId);
      const newIndex = currentIndex + direction;
      if (newIndex >= 0 && newIndex < allSecs.length) {
        setActiveSectionId(allSecs[newIndex].id);
      }
    } else if (workStep === 4 && step4Tab === "presentation") {
      const newIndex = currentSlide + direction;
      if (newIndex >= 0 && newIndex < courseware.length) {
        setCurrentSlide(newIndex);
        if (isPlaying && courseware[newIndex].script) {
          setTimeout(() => speakText(courseware[newIndex].script), 300);
        }
      }
    }
  };
  const openResourceModal = () => {
    if (workStep === 2) {
      let activeSecMaterials = [];
      syllabus.forEach((ch) =>
        ch.sections.forEach((sec) => {
          if (sec.id === activeSectionId)
            activeSecMaterials = sec.materials || [];
        }),
      );
      setTempSelectedResources([...activeSecMaterials]);
    }
    setIsResourceModalOpen(true);
  };
  const toggleModalResource = (resId) => {
    if (tempSelectedResources.includes(resId)) {
      setTempSelectedResources(
        tempSelectedResources.filter((id) => id !== resId),
      );
    } else {
      setTempSelectedResources([...tempSelectedResources, resId]);
    }
  };
  const saveModalResources = () => {
    setSyllabus((prev) =>
      prev.map((ch) => ({
        ...ch,
        sections: ch.sections.map((sec) =>
          sec.id === activeSectionId
            ? { ...sec, materials: [...tempSelectedResources] }
            : sec,
        ),
      })),
    );
    setIsResourceModalOpen(false);
    showToast(`成功同步 ${tempSelectedResources.length} 个本地教学资源！`);
  };
  const getLinkedResourceIds = () => {
    return masterResourceLibrary
      .filter(
        (item) =>
          linkedKBs.includes(item.sourceId) ||
          linkedRLs.includes(item.sourceId),
      )
      .map((item) => item.id);
  };
  const getRandomLinkedResourceIds = () => {
    const allIds = getLinkedResourceIds();
    if (allIds.length <= 2) return allIds;
    const shuffled = [...allIds].sort(() => Math.random() - 0.5);
    const count = Math.random() < 0.5 ? 1 : 2;
    return shuffled.slice(0, count);
  };
  const getOrderedDemoAssetByIndex = (index: number) => {
    return DEMO_PAGE_ASSETS[index] || null;
  };
  const getOrderedDemoLectureTemplateByIndex = (index: number) => {
    return DEMO_LECTURE_MAPPING[index] || null;
  };
  const getSectionOrderIndex = (chapterId: string, sectionId: string) => {
    let orderIndex = 0;
    for (const chapter of syllabus) {
      for (const section of chapter.sections || []) {
        if (chapter.id === chapterId && section.id === sectionId) {
          return orderIndex;
        }
        orderIndex += 1;
      }
    }
    return -1;
  };
  const handleAddChapter = () => {
    const newChapter = {
      id: `ch-${Date.now()}`,
      title: `新建章节`,
      desc: "",
      sections: [],
    };
    setSyllabus([...syllabus, newChapter]);
    showToast("已新增章节");
  };
  const toggleSectionExpand = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };
  const handleSaveCourseware = () => {
    const payload = {
      id: `cw-${Date.now()}`,
      name: courseName || "未命名课件",
      savedAt: new Date().toLocaleString("zh-CN"),
      status: "draft",
      syllabus: JSON.parse(JSON.stringify(syllabus)),
      courseware: JSON.parse(JSON.stringify(courseware)),
      step4Tab,
      examConfig,
      interactionConfig,
    };
    setSavedCoursewares((prev) => [payload, ...prev]);
    showToast("保存成功！");
    setCurrentPage("saved-coursewares");
  };
  const handlePublishCourseware = () => {
    const payload = {
      id: `cw-${Date.now()}`,
      name: courseName || "未命名课件",
      savedAt: new Date().toLocaleString("zh-CN"),
      status: "published",
      publishedAt: new Date().toLocaleString("zh-CN"),
      syllabus: JSON.parse(JSON.stringify(syllabus)),
      courseware: JSON.parse(JSON.stringify(courseware)),
      step4Tab,
      examConfig,
      interactionConfig,
    };
    setSavedCoursewares((prev) => [payload, ...prev]);
    showToast("发布成功！应用已上线。");
    setCurrentPage("saved-coursewares");
  };
  const handlePublishSavedCourseware = (id) => {
    setSavedCoursewares((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "published",
              publishedAt: new Date().toLocaleString("zh-CN"),
            }
          : item,
      ),
    );
    showToast("发布成功！");
  };
  const handlePreviewSavedCourseware = (item) => {
    stopSpeaking();
    setCourseName(item.name);
    setSyllabus(item.syllabus || []);
    setCourseware(item.courseware || []);
    setStep4Tab(item.step4Tab || "presentation");
    if (item.examConfig) setExamConfig(item.examConfig);
    if (item.interactionConfig) setInteractionConfig(item.interactionConfig);
    setStep4Source("saved-coursewares");
    setCurrentPage("workspace");
    setWorkStep(4);
    setCurrentSlide(0);
  };
  const handleEditSavedCourseware = (item) => {
    stopSpeaking();
    setCourseName(item.name);
    setSyllabus(item.syllabus || []);
    setCourseware(item.courseware || []);
    if (item.examConfig) setExamConfig(item.examConfig);
    if (item.interactionConfig) setInteractionConfig(item.interactionConfig);
    const firstSectionId = item.syllabus?.[0]?.sections?.[0]?.id;
    if (firstSectionId) {
      setActiveSectionId(firstSectionId);
      setExpandedSections({ [firstSectionId]: true });
    }
    setStep2Tab("presentation");
    setStep2Source("saved-coursewares");
    setCurrentPage("workspace");
    setWorkStep(2);
  };
  const handleDeleteSavedCourseware = (id) => {
    setSavedCoursewares((prev) => prev.filter((item) => item.id !== id));
    showToast("已删除保存课件");
  };
  const handleAddSectionToChapter = (chapterId) => {
    setSyllabus((prev) =>
      prev.map((ch) => {
        if (ch.id === chapterId) {
          const newSec = {
            id: `sec-${Date.now()}`,
            title: `新建小节`,
            materials: [],
            slideData: null,
            script: null,
            generationType: "图文",
          };
          setActiveSectionId(newSec.id);
          return { ...ch, sections: [...(ch.sections || []), newSec] };
        }
        return ch;
      }),
    );
    showToast("已新增小节");
  };
  // --- AI 生成大纲小节课件 ---
  const handleGenerateAllSectionSlides = async () => {
    const isRegenerating = syllabus.some((ch) =>
      ch.sections?.some((sec) => sec.slideData || sec.script),
    );
    setIsSectionAiGenerating(true);
    try {
      const nextSyllabus = [];
      let demoAssetIndex = 0;
      for (const chapter of syllabus) {
        const nextSections = [];
        for (const sec of chapter.sections || []) {
          const orderedTemplate =
            getOrderedDemoLectureTemplateByIndex(demoAssetIndex);
          const orderedDemoAsset = getOrderedDemoAssetByIndex(demoAssetIndex);
          demoAssetIndex += 1;
          const fallbackResourceIds = getRandomLinkedResourceIds();
          const effectiveMaterials =
            sec.materials?.length > 0 ? sec.materials : fallbackResourceIds;
          const demoContext = DEMO_PAGE_ASSETS.map(
            (item) =>
              `${item.id}: ${item.title}（适用主题：${item.sectionHint}）`,
          ).join("\n");
          if (orderedTemplate && orderedDemoAsset) {
            nextSections.push({
              ...sec,
              materials: effectiveMaterials,
              slideData: createDemoOnlySlideData(
                orderedDemoAsset.id,
                sec.title || orderedDemoAsset.title,
              ),
              script: "",
            });
            continue;
          }
          let prompt = sec.customPrompt;
          if (!prompt) {
            const generationType = sec.generationType || "图文";
            const materialContext =
              effectiveMaterials.length > 0
                ? `\n已挂载参考资料：${effectiveMaterials
                    .map(
                      (id) =>
                        masterResourceLibrary.find((m) => m.id === id)?.title,
                    )
                    .filter(Boolean)
                    .join("，")}。请结合资料生成重点。`
                : "";
            prompt = `你是高级教研员。请为当前教学小节设计一页高质量的${generationType}课件。
              课程：${courseName}
              章节：${chapter.title}
              小节：${sec.title}
              生成类型：${generationType}${materialContext}
              
              可选演示素材：
              ${demoContext}
              
              要求：
              - 如果是“视频”，内容应偏分镜、讲解节奏、镜头提示
              - 如果是“图文”，内容应偏图文并茂的课堂展示
              - 如果是“h5交互”，内容应偏交互步骤、点击反馈、闯关体验
              - 如果是“PPT”，内容应偏标准幻灯片结构、要点清晰
             - 根据小节主题，从上面的素材中选择最匹配的一个 demoAssetId
              
              请严格以 JSON 格式返回，包含 contentTitle, conceptLabel, bulletPoints, content, demoAssetId 字段。只返回 JSON。`;
          }
          const jsonText = await callGeminiAPI(prompt, true);
          const cleanJsonText = jsonText
            .replace(/^```json/im, "")
            .replace(/```$/im, "")
            .trim();
          const slideData = JSON.parse(cleanJsonText);
          const finalSlideData = {
            ...slideData,
            demoAssetId:
              orderedDemoAsset?.id ||
              getValidDemoAssetId(slideData.demoAssetId || ""),
          };
          const scriptPrompt = `请根据幻灯片内容，编写一段用于课堂 TTS 的口述讲稿。
      标题：${slideData.contentTitle}
      内容：${slideData.content}
      
      直接返回纯文本讲稿（约100字）。`;
          const script = await callGeminiAPI(scriptPrompt, false);
          nextSections.push({
            ...sec,
            materials: effectiveMaterials,
            slideData: finalSlideData,
            script,
          });
        }
        nextSyllabus.push({
          ...chapter,
          sections: nextSections,
        });
      }
      setSyllabus(nextSyllabus);
      showToast(
        isRegenerating
          ? "✨ 全部小节课件与讲稿已重新生成完成！"
          : "✨ 全部小节课件与讲稿已生成完成！",
      );
    } catch (err) {
      console.error(err);
      showToast("批量生成课件或讲稿失败，请检查网络或返回格式。");
    } finally {
      setIsSectionAiGenerating(false);
    }
  };
  const handleGenerateSectionSlide = async (chapterId, sectionId) => {
    setIsSectionAiGenerating(true);
    try {
      const chap = syllabus.find((c) => c.id === chapterId);
      const sec = chap?.sections?.find((s) => s.id === sectionId);
      if (!chap || !sec) {
        showToast("未找到当前小节，无法生成课件。");
        return;
      }
      const fallbackResourceIds = getRandomLinkedResourceIds();
      const effectiveMaterials =
        sec.materials?.length > 0 ? sec.materials : fallbackResourceIds;
      const sectionOrderIndex = getSectionOrderIndex(chapterId, sectionId);
      const orderedTemplate =
        getOrderedDemoLectureTemplateByIndex(sectionOrderIndex);
      const orderedDemoAsset = getOrderedDemoAssetByIndex(sectionOrderIndex);
      const demoContext = DEMO_PAGE_ASSETS.map(
        (item) => `${item.id}: ${item.title}（适用主题：${item.sectionHint}）`,
      ).join("\n");
      if (orderedTemplate && orderedDemoAsset) {
        setSyllabus((prev) =>
          prev.map((c) =>
            c.id === chapterId
              ? {
                  ...c,
                  sections: c.sections.map((s) =>
                    s.id === sectionId
                      ? {
                          ...s,
                          materials: effectiveMaterials,
                          slideData: createDemoOnlySlideData(
                            orderedDemoAsset.id,
                            s.title || orderedDemoAsset.title,
                          ),
                          script: "",
                        }
                      : s,
                  ),
                }
              : c,
          ),
        );
        showToast("✨ 当前小节已按 demo_1.html 对应内容生成！");
        setIsSectionAiGenerating(false);
        return;
      }
      let prompt = sec.customPrompt;
      if (!prompt) {
        const generationType = sec.generationType || "图文";
        const materialContext =
          effectiveMaterials.length > 0
            ? `\n已挂载参考资料：${effectiveMaterials
                .map(
                  (id) => masterResourceLibrary.find((m) => m.id === id)?.title,
                )
                .filter(Boolean)
                .join("，")}。请结合资料生成重点。`
            : "";
        prompt = `你是高级教研员。请为当前教学小节设计一页高质量的${generationType}课件。
            课程：${courseName}
            章节：${chap.title}
            小节：${sec.title}
            生成类型：${generationType}${materialContext}
            
            可选演示素材：
            ${demoContext}
            
            要求：
            - 如果是“视频”，内容应偏分镜、讲解节奏、镜头提示
            - 如果是“图文”，内容应偏图文并茂的课堂展示
            - 如果是“h5交互”，内容应偏交互步骤、点击反馈、闯关体验
            - 如果是“PPT”，内容应偏标准幻灯片结构、要点清晰
            - 根据小节主题，从上面的素材中选择最匹配的一个 demoAssetId
            
            请严格以 JSON 格式返回，包含 contentTitle, conceptLabel, bulletPoints, content, demoAssetId 字段。只返回 JSON。`;
      }
      const jsonText = await callGeminiAPI(prompt, true);
      const cleanJsonText = jsonText
        .replace(/^```json/im, "")
        .replace(/```$/im, "")
        .trim();
      const slideData = JSON.parse(cleanJsonText);
      const finalSlideData = {
        ...slideData,
        demoAssetId:
          orderedDemoAsset?.id ||
          getValidDemoAssetId(slideData.demoAssetId || ""),
      };
      setSyllabus((prev) =>
        prev.map((c) =>
          c.id === chapterId
            ? {
                ...c,
                sections: c.sections.map((s) =>
                    s.id === sectionId
                      ? {
                          ...s,
                          materials: effectiveMaterials,
                          slideData: finalSlideData,
                        }
                      : s,
                ),
              }
            : c,
        ),
      );
      showToast("✨ 当前小节课件页已生成，右侧可即时预览！");
    } catch (err) {
      console.error(err);
      showToast("课件生成失败，请检查网络并确保返回格式为正确JSON。");
    } finally {
      setIsSectionAiGenerating(false);
    }
  };
  // --- AI 生成播报讲稿 ---
  const handleGenerateSectionScript = async (chapterId, sectionId) => {
    setIsSectionAiGenerating(true);
    try {
      const chap = syllabus.find((c) => c.id === chapterId);
      const sec = chap.sections.find((s) => s.id === sectionId);
      if (!sec.slideData) {
        showToast("请先生成该小节的课件幻灯片，再生成讲稿！");
        setIsSectionAiGenerating(false);
        return;
      }
      const prompt = `请根据幻灯片内容，编写一段用于课堂 TTS 的口述讲稿。
标题：${sec.slideData.contentTitle}
内容：${sec.slideData.content}
直接返回纯文本讲稿（约100字）。`;
      const script = await callGeminiAPI(prompt, false);
      setSyllabus((prev) =>
        prev.map((c) =>
          c.id === chapterId
            ? {
                ...c,
                sections: c.sections.map((s) =>
                  s.id === sectionId ? { ...s, script } : s,
                ),
              }
            : c,
        ),
      );
      showToast("✨ 讲稿生成完毕！");
    } catch (err) {
      showToast("讲稿生成失败，请检查网络连接。");
    } finally {
      setIsSectionAiGenerating(false);
    }
  };
  // --- AI 生成理论考试卷 ---
  const handleGenerateExam = async () => {
    setIsGeneratingExam(true);
    try {
      const prompt = `课程：${courseName}\n${examConfig.theoreticalPrompt}`;
      const text = await callGeminiAPI(prompt, false);
      setExamConfig((prev) => ({ ...prev, theoreticalContent: text }));
      showToast("✨ 理论考试卷生成完毕，请在右侧预览！");
    } catch (err) {
      showToast("考试卷生成失败，请检查网络。");
    } finally {
      setIsGeneratingExam(false);
    }
  };
  // --- 全局生成教学大纲 (Step 1) ---
  const triggerSyllabusGeneration = async () => {
    if (!courseName.trim()) {
      showToast("请输入课程名称！");
      return;
    }
    setLoadingType("syllabus");
    setLoadingProgress(10);
    setLoadingMessage("正在向 AI 发送课程意图...");
    try {
      setLoadingProgress(30);
      setLoadingMessage("正在设计章节结构与知识点拆解...");
      const prompt = `为课程《${courseName}》设计结构化的教学大纲。包含描述：${knowledgeDesc}。至少生成 3 个章节，并保证总小节数不少于 7 个。严格返回 JSON，格式如: [{"id":"s-1","title":"章节1","desc":"介绍","sections":[{"id":"sec-1-1","title":"小节1"}]}]。不含 markdown。`;
      const jsonText = await callGeminiAPI(prompt, true);
      setLoadingProgress(60);
      setLoadingMessage("正在清洗 JSON 返回数据...");
      const cleanJsonText = jsonText
        .replace(/^```json/im, "")
        .replace(/```$/im, "")
        .trim();
      const parsedSyllabus = JSON.parse(cleanJsonText);
      const finalSyllabus = parsedSyllabus.map((ch, i) => ({
        ...ch,
        id: `ch-${Date.now()}-${i}`,
        sections: ch.sections
          ? ch.sections.map((sec, j) => ({
              ...sec,
              id: `sec-${Date.now()}-${i}-${j}`,
              materials: [],
              slideData: null,
              script: null,
            }))
          : [],
      }));
      setSyllabus(finalSyllabus);
      if (finalSyllabus.length > 0 && finalSyllabus[0].sections.length > 0) {
        setActiveSectionId(finalSyllabus[0].sections[0].id);
      }
      setLoadingProgress(100);
      setLoadingMessage("生成完成，即将进入工作区...");
      setTimeout(() => {
        setLoadingType(null);
        setWorkStep(2);
      }, 600);
    } catch (error) {
      console.error(error);
      setLoadingType(null);
      showToast("大纲生成失败，请检查网络。");
    }
  };
  // --- 将纯文本考题渲染为真正的互动考卷组件 ---
  const renderInteractiveExam = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    let currentQuestionId = 0;
    let isHidingAnswer = false;
    let currentSectionType: "choice" | "short-answer" | "" = "";
    return lines.map((line, idx) => {
      // 当识别到“答案”等字眼时开始隐藏内容，并如果是简答题，在其之前插入输入框
      if (
        line.includes("答案：") ||
        line.includes("参考答案") ||
        line.includes("答案解析")
      ) {
        isHidingAnswer = true;
        if (currentSectionType === "short-answer") {
          return (
            <textarea
              key={`textarea-${idx}`}
              className="w-full mt-4 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-y transition shadow-inner"
              rows={3}
              placeholder="请输入您的作答内容..."
            />
          );
        }
        return null;
      }
      // 隐藏状态下，判断是否遇到新的大题或小题以恢复显示
      if (isHidingAnswer) {
        if (
          line.match(/^\s*\d+\./) ||
          line.match(/^\s*[一二三四五六七八九十]、/)
        ) {
          isHidingAnswer = false;
        } else {
          return null;
        }
      }
      // 渲染模块大标题 (例如: 一、单项选择题)
      if (line.match(/^\s*[一二三四五六七八九十]、/)) {
        if (line.includes("单项选择题") || line.includes("选择题")) {
          currentSectionType = "choice";
        } else if (line.includes("简答题")) {
          currentSectionType = "short-answer";
        } else {
          currentSectionType = "";
        }
        return (
          <h4
            key={idx}
            className="font-extrabold text-lg text-slate-800 mt-8 mb-4 border-b border-slate-100 pb-2"
          >
            {line.trim()}
          </h4>
        );
      }
      // 渲染具体问题标题 (例如: 1. 分数乘分数的核心则是？)
      if (line.match(/^\s*\d+\./)) {
        currentQuestionId++;
        return (
          <p key={idx} className="font-bold text-slate-800 mt-6 mb-3">
            {line.trim()}
          </p>
        );
      }
      // 渲染单选选项 (例如: A. 分子加分子)
      const optionMatch = line.match(/^\s*([A-D])\.\s*(.*)/);
      if (optionMatch) {
        return (
          <label
            key={idx}
            className="flex items-center space-x-3 mt-2 cursor-pointer hover:bg-indigo-50/60 p-2.5 rounded-lg border border-transparent hover:border-indigo-100 transition"
          >
            <input
              type="radio"
              name={`q-${currentQuestionId}`}
              className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 bg-white"
            />
            <span className="text-sm text-slate-700 font-medium">
              {line.trim()}
            </span>
          </label>
        );
      }
      // 空行处理
      if (line.trim() === "") {
        return <div key={idx} className="h-2"></div>;
      }
      // 普通段落文本
      return (
        <p key={idx} className="text-sm text-slate-600 mt-1 pl-1">
          {line.trim()}
        </p>
      );
    });
  };
  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast Alert */}
      {showToastBool && (
        <div className="fixed top-6 right-6 z-[100] bg-white border border-indigo-200 text-indigo-700 py-3 px-6 rounded-lg shadow-xl flex items-center space-x-3 text-sm animate-fade-in backdrop-blur-md">
          <CheckCircle2 className="w-5 h-5 text-indigo-500" />
          <span className="font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}
      {/* Top Header */}
      <header className="bg-white/90 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md shadow-sm shrink-0">
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black shadow-md shadow-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center">
              MaxKB{" "}
              <span className="text-xs bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded ml-2 font-medium">
                智能备课终端
              </span>
            </span>
          </div>
          {/* Workspace Path */}
          <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg text-sm shadow-sm">
            <Layers className="w-4 h-4 text-slate-500" />
            <span className="text-slate-600 font-medium">
              Default Workspace
            </span>
            <span className="text-slate-400">/</span>
            <span className="text-indigo-600 font-semibold">智能体中心</span>
          </div>
          {/* Primary Navbar Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <span className="cursor-pointer hover:text-indigo-600 transition">
              首页
            </span>
            <span className="cursor-pointer text-indigo-600 border-b-2 border-indigo-600 pb-1 flex items-center space-x-1">
              <span>智能体</span>
              <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition">
              知识库
            </span>
            <span className="cursor-pointer hover:text-indigo-600 transition flex items-center">
              <span>工具库</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-100 text-amber-600 border border-amber-200 rounded-full font-bold">
                New
              </span>
            </span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentPage("dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-md transition flex items-center space-x-1.5"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>
              {currentPage === "dashboard" ? "升级至Pro" : "返回首页"}
            </span>
          </button>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200 shadow-sm">
            教
          </div>
        </div>
      </header>
      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* ========================================================= */}
        {/* DASHBOARD (3 AGENTS)                                      */}
        {/* ========================================================= */}
        {currentPage === "dashboard" && (
          <div className="flex-1 flex bg-slate-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full py-10 px-6">
              {/* Dashboard Title bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 pb-6 border-b border-slate-200">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
                    <span>全部智能体</span>
                    <span className="text-sm font-normal text-slate-500">
                      (3个预置)
                    </span>
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    快速开启一个智能教学或设备问答助手
                  </p>
                </div>
              </div>
              {/* Cards Container */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {/* CARD 1: 教学智能体 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-indigo-400 hover:shadow-lg transition duration-300 flex flex-col justify-between relative group overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/80 rounded-bl-full -mr-8 -mt-8 group-hover:bg-indigo-100 transition duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-indigo-200">
                        🧑‍🏫
                      </div>
                      <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-indigo-200 shadow-sm">
                        教案专家型
                      </span>
                    </div>
                    <div className="mt-5">
                      <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-indigo-600 transition">
                        教学智能体
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5">
                        内置预置 • 创建于 2026-06-12
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">
                      专门用于承载教学辅导、大纲拆解、多层级小节组织，以及高精度
                      TTS 语音流式课件共创的智能体。
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                    <span className="text-xs text-emerald-600 font-bold flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse"></span>
                      已发布上线
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage("saved-coursewares")}
                        className="bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm py-2 px-4 rounded-xl flex items-center transition border border-slate-200 shadow-sm"
                      >
                        已保存课件
                      </button>
                      <button
                        onClick={() => {
                          setStep2Source("normal");
                          setCurrentPage("workspace");
                          setWorkStep(1);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2 px-5 rounded-xl flex items-center space-x-1.5 transition shadow-md group-hover:scale-105"
                      >
                        <span>去备课</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* CARD 2: 设备介绍智能体 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 opacity-80 hover:opacity-100 transition duration-300 flex flex-col justify-between hover:shadow-lg hover:border-slate-300">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-sky-100">
                        ⚙️
                      </div>
                      <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-sky-100">
                        设备型
                      </span>
                    </div>
                    <div className="mt-5">
                      <h3 className="font-extrabold text-slate-900 text-lg">
                        设备介绍智能体
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5">
                        内置预置 • 创建于 2026-06-12
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">
                      可加载产品白皮书、使用手册等文档。支持对产品零件、原动传动机制进行针对性培训。
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-bold flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5"></span>
                      已发布
                    </span>
                    <button className="text-slate-600 bg-slate-50 hover:bg-slate-100 text-sm font-bold py-2 px-4 rounded-xl transition border border-slate-200">
                      查看配置
                    </button>
                  </div>
                </div>
                {/* CARD 3: 问答智能体 */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 opacity-80 hover:opacity-100 transition duration-300 flex flex-col justify-between hover:shadow-lg hover:border-slate-300">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-purple-100">
                        ❓
                      </div>
                      <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-purple-100">
                        通用问答
                      </span>
                    </div>
                    <div className="mt-5">
                      <h3 className="font-extrabold text-slate-900 text-lg">
                        问答智能体
                      </h3>
                      <p className="text-xs text-slate-500 mt-1.5">
                        内置预置 • 创建于 2026-06-12
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 mt-4 leading-relaxed font-medium">
                      通用的对话检索模型，拥有强悍的召回结构。支持自由引入 PDF,
                      DOCX 等各种非结构化文档。
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">
                      ⚠️ 未发布
                    </span>
                    <button className="bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 font-bold text-sm py-2 px-4 rounded-xl transition">
                      去设计
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* ========================================================= */}
        {/* WORKSPACE (STEPS 1, 2, 4)                                 */}
        {/* ========================================================= */}
        {currentPage === "saved-coursewares" && (
          <div className="flex-1 flex bg-slate-50 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full py-10 px-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    已保存课件
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    可继续预览、编辑或删除历史保存的课件
                  </p>
                </div>
                {/* <button
                  onClick={() => setCurrentPage('dashboard')}
                  className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg border border-slate-200 transition flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  返回
                </button> */}
              </div>
              {savedCoursewares.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-16 text-center text-slate-500 shadow-sm">
                  暂无已保存课件
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {savedCoursewares.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="text-lg font-bold text-slate-900">
                            {item.name}
                          </div>
                          <span
                            className={`text-xs font-bold px-2 py-1 rounded-md border ${
                              item.status === "published"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                : "bg-amber-50 text-amber-600 border-amber-200"
                            }`}
                          >
                            {item.status === "published" ? "已发布" : "未发布"}
                          </span>
                        </div>
                        <div className="text-sm text-slate-500 mt-1">
                          保存时间：{item.savedAt}
                        </div>
                        {item.status === "published" && item.publishedAt && (
                          <div className="text-xs text-emerald-600 mt-1">
                            发布时间：{item.publishedAt}
                          </div>
                        )}
                        <div className="text-xs text-slate-400 mt-1">
                          共 {item.courseware?.length || 0} 页课件
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePreviewSavedCourseware(item)}
                          className="px-4 py-2 text-sm font-bold rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100"
                        >
                          预览
                        </button>
                        <button
                          onClick={() => handleEditSavedCourseware(item)}
                          className="px-4 py-2 text-sm font-bold rounded-lg bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                        >
                          编辑
                        </button>
                        {item.status !== "published" && (
                          <button
                            onClick={() =>
                              handlePublishSavedCourseware(item.id)
                            }
                            className="px-4 py-2 text-sm font-bold rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                          >
                            直接发布
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteSavedCourseware(item.id)}
                          className="px-4 py-2 text-sm font-bold rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {currentPage === "workspace" && (
          <div className="flex-1 flex flex-col h-full min-h-0 w-full relative">
            {/* GLOBAL LOADING OVERLAY (Applies to Step 1 generation mainly) */}
            {loadingType && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white border border-indigo-200 rounded-2xl max-w-md w-full p-8 shadow-2xl flex flex-col items-center text-center space-y-6 animate-fade-in">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin flex items-center justify-center"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xl">
                      📝
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg">
                      AI 正在全力规划教学大纲...
                    </h3>
                    <p className="text-slate-500 text-xs mt-1">
                      请老师稍候，大模型正在深层处理知识结构。
                    </p>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-600">
                      <span className="flex items-center">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin text-indigo-500" />
                        {loadingMessage}
                      </span>
                      <span className="text-indigo-600">
                        {loadingProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* STEP 1: INPUT DETAILS */}
            {workStep === 1 && (
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-2xl mx-auto w-full py-10 px-6 space-y-8 animate-fade-in text-slate-800">
                  <div className="text-center space-y-2">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      欢迎开启智能教学大纲规划
                    </h2>
                    <p className="text-slate-500 text-xs">
                      只需告诉智能体您的课程大方向与知识点，AI将瞬时为您定制分级教学大纲。
                    </p>
                  </div>
                  <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[14px] font-extrabold text-slate-500 uppercase tracking-wider">
                        课程名称 <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg text-sm px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[14px] font-extrabold text-slate-500 uppercase tracking-wider">
                        具体知识点描述 <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={5}
                        value={knowledgeDesc}
                        onChange={(e) => setKnowledgeDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg text-sm px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:bg-white transition resize-none leading-relaxed shadow-inner"
                      />
                    </div>
                    <div className="pt-4 border-t border-slate-100 space-y-6">
                      {/* 关联知识库模块 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-[14px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center">
                            <Database className="w-3.5 h-3.5 mr-1.5 text-indigo-500" />{" "}
                            关联结构化知识库{" "}
                            <span className="ml-1 text-[12px] text-slate-400 font-normal">
                              (提供大模型生成大纲依据)
                            </span>
                          </label>
                          <button
                            onClick={() => {
                              setTempSelectedKBs([...linkedKBs]);
                              setIsSelectKBModalOpen(true);
                            }}
                            className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-lg transition font-bold flex items-center shadow-sm"
                          >
                            <Plus className="w-3 h-3 mr-1" /> 选择知识库
                          </button>
                        </div>
                        {linkedKBs.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {linkedKBs.map((id) => {
                              const kb = MOCK_KNOWLEDGE_BASES.find(
                                (k) => k.id === id,
                              );
                              return kb ? (
                                <div
                                  key={id}
                                  className="bg-white border border-indigo-200 text-indigo-800 text-xs px-3 py-1.5 rounded-lg flex items-center shadow-sm"
                                >
                                  <Database className="w-3 h-3 mr-1.5 text-indigo-400" />
                                  <span className="font-semibold">
                                    {kb.name}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setLinkedKBs((prev) =>
                                        prev.filter((kId) => kId !== id),
                                      )
                                    }
                                    className="ml-2 text-indigo-400 hover:text-rose-500 transition"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 p-3 rounded-xl text-center">
                            未关联知识库
                          </div>
                        )}
                      </div>
                      {/* 关联资源库模块 */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="block text-[14px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center">
                            <Layers className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />{" "}
                            关联多媒体素材库{" "}
                            <span className="ml-1 text-[12px] text-slate-400 font-normal">
                              (提供课件素材)
                            </span>
                          </label>
                          <button
                            onClick={() => {
                              setTempSelectedRLs([...linkedRLs]);
                              setIsSelectRLModalOpen(true);
                            }}
                            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-lg transition font-bold flex items-center shadow-sm"
                          >
                            <Plus className="w-3 h-3 mr-1" /> 选择资源库
                          </button>
                        </div>
                        {linkedRLs.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {linkedRLs.map((id) => {
                              const rl = MOCK_RESOURCE_LIBRARIES.find(
                                (r) => r.id === id,
                              );
                              return rl ? (
                                <div
                                  key={id}
                                  className="bg-white border border-emerald-200 text-emerald-800 text-xs px-3 py-1.5 rounded-lg flex items-center shadow-sm"
                                >
                                  <Layers className="w-3 h-3 mr-1.5 text-emerald-400" />
                                  <span className="font-semibold">
                                    {rl.name}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setLinkedRLs((prev) =>
                                        prev.filter((rId) => rId !== id),
                                      )
                                    }
                                    className="ml-2 text-emerald-400 hover:text-rose-500 transition"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : null;
                            })}
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 bg-slate-50 border border-dashed border-slate-200 p-3 rounded-xl text-center">
                            未关联资源库
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={triggerSyllabusGeneration}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition duration-300"
                  >
                    <span>生成分级教学大纲</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            {/* STEP 2: SYLLABUS EDITING & MANAGEMENT (Split-Pane) */}
            {workStep === 2 &&
              (() => {
                let activeSec = null;
                let activeChap = null;
                let allSecsCount = 0;
                let currentSecIndex = 0;
                for (const ch of syllabus) {
                  const sec = ch.sections?.find(
                    (s) => s.id === activeSectionId,
                  );
                  if (sec) {
                    activeSec = sec;
                    activeChap = ch;
                    currentSecIndex = allSecsCount + ch.sections.indexOf(sec);
                  }
                  allSecsCount += ch.sections?.length || 0;
                }
                const activeDemoAsset = DEMO_PAGE_ASSETS.find(
                  (item) => item.id === activeSec?.slideData?.demoAssetId,
                );
                const compileCoursewareAndGoNext = () => {
                  const compiled = [];
                  syllabus.forEach((ch) => {
                    ch.sections?.forEach((sec) => {
                      if (sec.slideData) {
                        const asset = DEMO_PAGE_ASSETS.find(
                          (a) => a.id === sec.slideData.demoAssetId,
                        );
                        compiled.push({
                          id: sec.id,
                          title: ch.title,
                          contentTitle: sec.slideData.contentTitle || sec.title,
                          conceptLabel: sec.slideData.conceptLabel || "",
                          bulletPoints: sec.slideData.bulletPoints || [],
                          content: sec.slideData.content || "",
                          script: sec.script || "",
                          visualHint: "",
                          demoAssetId: sec.slideData.demoAssetId || "",
                          demoOnly: Boolean(sec.slideData.demoOnly),
                          demoSrc: asset?.src || "",
                        });
                      }
                    });
                  });
                  if (compiled.length === 0 && step2Tab === "presentation") {
                    showToast("请至少为一个大纲小节生成课件内容！");
                    return;
                  }
                  setCourseware(compiled);
                  setStep4Source("editor");
                  setWorkStep(4);
                  setCurrentSlide(0);
                  setIsPlaying(false);
                };
                return (
                  <div className="flex-1 flex w-full h-full min-h-0 overflow-hidden bg-slate-50">
                    {/* LEFT PANE: Outline & Material Editor */}
                    <div
                      className={`w-full md:w-5/12 lg:w-1/3 bg-white border-r border-slate-200 flex flex-col z-10 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.05)] h-full min-h-0 overflow-hidden relative transition-all duration-300 ${isFullScreenPreview ? "-ml-[33.33%] opacity-0" : "ml-0 opacity-100"}`}
                    >
                      {(isSectionAiGenerating || isGeneratingExam) && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                          <span className="text-sm font-bold text-slate-800">
                            AI 正在深度处理...
                          </span>
                        </div>
                      )}
                      <div className="px-5 py-4 border-b border-slate-200 flex flex-col bg-slate-50 shrink-0 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-[16px] font-bold text-slate-900 mt-2">
                              课程环节配置
                            </h2>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                if (step2Source === "saved-coursewares") {
                                  setCurrentPage("saved-coursewares");
                                } else {
                                  setWorkStep(1);
                                }
                              }}
                              className="bg-white hover:bg-slate-50 text-slate-700 text-[13px] font-bold px-4 py-2 rounded-lg border border-slate-200 transition flex items-center"
                            >
                              <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                              {step2Source === "saved-coursewares"
                                ? "返回"
                                : "返回"}
                            </button>
                            <button
                              onClick={compileCoursewareAndGoNext}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-md transition flex items-center"
                            >
                              整体预览{" "}
                              <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </button>
                          </div>
                        </div>
                        {/* --- 演示模式 vs 考试模式 Tab 切换 --- */}
                        <div className="flex bg-slate-200/60 p-1 rounded-lg">
                          <button
                            onClick={() => setStep2Tab("presentation")}
                            className={`flex-1 text-[14px] font-bold py-1.5 rounded-md transition ${step2Tab === "presentation" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                          >
                            演示配置
                          </button>
                          <button
                            onClick={() => setStep2Tab("interactive")}
                            className={`flex-1 text-[14px] font-bold py-1.5 rounded-md transition ${step2Tab === "interactive" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                          >
                            交互配置
                          </button>
                          <button
                            onClick={() => setStep2Tab("exam")}
                            className={`flex-1 text-[14px] font-bold py-1.5 rounded-md transition ${step2Tab === "exam" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                          >
                            考试配置
                          </button>
                        </div>
                        {step2Tab === "presentation" && (
                          <div className="flex justify-end">
                            <button
                              onClick={handleGenerateAllSectionSlides}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-bold justify-center w-full  py-2 rounded-lg shadow-md transition flex items-center"
                            >
                              <Sparkles className="w-3.5 h-3.5 mr-1" />
                              {isSectionAiGenerating
                                ? "正在生成课件+讲稿..."
                                : hasGeneratedSectionAssets
                                  ? "重新生成课件+讲稿"
                                  : "一键生成课件+讲稿"}
                            </button>
                          </div>
                        )}
                      </div>
                      {/* --- LEFT PANE CONTENT --- */}
                      <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        {/* --- TAB: 演示模式配置 (原大纲编辑) --- */}
                        {step2Tab === "presentation" && (
                          <>
                            {syllabus.map((chapter, index) => (
                              <div key={chapter.id} className="space-y-3">
                                <div className="flex items-start justify-between group">
                                  <div className="flex items-start w-full">
                                    <span className="w-5 h-5 bg-slate-100 text-slate-500 rounded flex items-center justify-center text-[10px] mr-2 border border-slate-200 shrink-0 mt-0.5">
                                      {index + 1}
                                    </span>
                                    <div className="w-full space-y-1 pr-2">
                                      <input
                                        type="text"
                                        value={chapter.title}
                                        onChange={(e) => {
                                          setSyllabus((prev) =>
                                            prev.map((c) =>
                                              c.id === chapter.id
                                                ? {
                                                    ...c,
                                                    title: e.target.value,
                                                  }
                                                : c,
                                            ),
                                          );
                                        }}
                                        className="text-sm font-black text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none w-full transition"
                                      />
                                      <textarea
                                        rows={1}
                                        value={chapter.desc || ""}
                                        onChange={(e) => {
                                          setSyllabus((prev) =>
                                            prev.map((c) =>
                                              c.id === chapter.id
                                                ? { ...c, desc: e.target.value }
                                                : c,
                                            ),
                                          );
                                        }}
                                        className="text-[10px] text-slate-500 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none w-full resize-none leading-relaxed transition"
                                        placeholder="输入章节简介..."
                                      />
                                    </div>
                                  </div>
                                  <button
                                    onClick={() =>
                                      setSyllabus((prev) =>
                                        prev.filter((c) => c.id !== chapter.id),
                                      )
                                    }
                                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 p-1 transition shrink-0"
                                    title="删除章节"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="pl-6 space-y-2 border-l-2 border-slate-100 ml-2">
                                  {chapter.sections?.map((sec) => (
                                    <div key={sec.id} className="space-y-2">
                                      <div
                                        onClick={() => {
                                          stopSpeaking();
                                          setActiveSectionId(sec.id);
                                          toggleSectionExpand(sec.id);
                                        }}
                                        className={`p-3 rounded-xl border transition group/sec cursor-pointer ${activeSectionId === sec.id ? "bg-indigo-50 border-indigo-300 ring-1 ring-indigo-500/30 shadow-sm" : "bg-white border-slate-200 hover:border-indigo-300 shadow-sm"}`}
                                      >
                                        <div className="flex items-center justify-between">
                                          <input
                                            type="text"
                                            value={sec.title}
                                            onChange={(e) => {
                                              setSyllabus((prev) =>
                                                prev.map((c) =>
                                                  c.id === chapter.id
                                                    ? {
                                                        ...c,
                                                        sections:
                                                          c.sections.map((s) =>
                                                            s.id === sec.id
                                                              ? {
                                                                  ...s,
                                                                  title:
                                                                    e.target
                                                                      .value,
                                                                }
                                                              : s,
                                                          ),
                                                      }
                                                    : c,
                                                ),
                                              );
                                            }}
                                            className={`text-xs font-bold truncate pr-3 bg-transparent border-b border-transparent hover:border-indigo-300 focus:border-indigo-500 focus:outline-none w-full transition cursor-text ${activeSectionId === sec.id ? "text-indigo-700" : "text-slate-600"}`}
                                          />
                                          <div className="flex items-center space-x-3 shrink-0 ml-2">
                                            <div className="flex space-x-1.5 shrink-0">
                                              <span
                                                className={`w-2 h-2 rounded-full ${sec.materials?.length ? "bg-amber-400" : "bg-slate-200"}`}
                                                title="已挂载素材"
                                              ></span>
                                              <span
                                                className={`w-2 h-2 rounded-full ${sec.slideData ? "bg-emerald-500" : "bg-slate-200"}`}
                                                title="已生成课件"
                                              ></span>
                                              <span
                                                className={`w-2 h-2 rounded-full ${sec.script ? "bg-blue-500" : "bg-slate-200"}`}
                                                title="已生成讲稿"
                                              ></span>
                                            </div>
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSyllabus((prev) =>
                                                  prev.map((c) =>
                                                    c.id === chapter.id
                                                      ? {
                                                          ...c,
                                                          sections:
                                                            c.sections.filter(
                                                              (s) =>
                                                                s.id !== sec.id,
                                                            ),
                                                        }
                                                      : c,
                                                  ),
                                                );
                                              }}
                                              className="opacity-0 group-hover/sec:opacity-100 hover:text-rose-500 text-slate-400 transition"
                                              title="删除小节"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Section Editor Drawer */}
                                      {expandedSections[sec.id] && (
                                        <div className="ml-2 mb-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-5 animate-fade-in relative">
                                          {/* Tool 1: Material */}
                                          <div className="space-y-2.5">
                                            <div className="flex justify-between items-center">
                                              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wide">
                                                1. 挂载本地素材
                                              </span>
                                              <button
                                                onClick={openResourceModal}
                                                className="text-[10px] bg-slate-50 hover:bg-slate-100 text-slate-600 px-2 py-1 rounded transition border border-slate-200 font-semibold shadow-sm flex items-center"
                                              >
                                                <FolderOpen className="w-3 h-3 mr-1" />{" "}
                                                添加素材
                                              </button>
                                            </div>
                                            {sec.materials?.length > 0 ? (
                                              <div className="space-y-2">
                                                {sec.materials.map((matId) => {
                                                  const file =
                                                    masterResourceLibrary.find(
                                                      (m) => m.id === matId,
                                                    );
                                                  return file ? (
                                                    <div
                                                      key={matId}
                                                      className="text-[11px] bg-slate-50 border border-slate-200 rounded-md p-2 flex items-center justify-between shadow-sm"
                                                    >
                                                      <div className="flex items-center truncate">
                                                        <span className="mr-1.5">
                                                          {file.type === "pdf"
                                                            ? "📕"
                                                            : file.type ===
                                                                "ppt"
                                                              ? "📊"
                                                              : "🎬"}
                                                        </span>
                                                        <span className="truncate font-medium text-slate-700">
                                                          {file.title}
                                                        </span>
                                                      </div>
                                                      <button
                                                        onClick={() => {
                                                          setSyllabus((prev) =>
                                                            prev.map((c) =>
                                                              c.id ===
                                                              chapter.id
                                                                ? {
                                                                    ...c,
                                                                    sections:
                                                                      c.sections.map(
                                                                        (s) =>
                                                                          s.id ===
                                                                          sec.id
                                                                            ? {
                                                                                ...s,
                                                                                materials:
                                                                                  s.materials.filter(
                                                                                    (
                                                                                      id,
                                                                                    ) =>
                                                                                      id !==
                                                                                      matId,
                                                                                  ),
                                                                              }
                                                                            : s,
                                                                      ),
                                                                  }
                                                                : c,
                                                            ),
                                                          );
                                                        }}
                                                        className="text-slate-400 hover:text-rose-500 transition"
                                                      >
                                                        <X className="w-3.5 h-3.5" />
                                                      </button>
                                                    </div>
                                                  ) : null;
                                                })}
                                              </div>
                                            ) : (
                                              <div className="text-[11px] text-slate-400 font-medium bg-slate-50 border border-dashed border-slate-300 p-3 rounded-lg text-center">
                                                暂未挂载知识库文档
                                              </div>
                                            )}
                                          </div>
                                          {/* Tool 2: Slide */}
                                          <div className="space-y-2.5 border-t border-slate-100 pt-4">
                                            <div className="flex justify-between items-center">
                                              <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wide">
                                                2. 生成课件幻灯片
                                              </span>
                                              <button
                                                onClick={() =>
                                                  handleGenerateSectionSlide(
                                                    chapter.id,
                                                    sec.id,
                                                  )
                                                }
                                                className={`text-[11px] text-white px-2 py-1 rounded transition shadow-sm flex items-center font-bold ${sec.slideData ? "bg-indigo-500 hover:bg-indigo-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
                                              >
                                                <Sparkles className="w-3 h-3 mr-1" />{" "}
                                                {sec.slideData
                                                  ? "重新生成此页"
                                                  : "AI 智能生成课件"}
                                              </button>
                                            </div>
                                            <div className="space-y-2 pt-1">
                                              <label className="text-[12px] font-semibold text-slate-500 flex items-center">
                                                <Edit3 className="w-3 h-3 mr-1" />{" "}
                                                选择您希望生成的课件类型：
                                              </label>
                                              <div className="grid grid-cols-2 gap-2">
                                                {[
                                                  "视频",
                                                  "图文",
                                                  "h5交互",
                                                  "PPT",
                                                  "问答",
                                                  "知识图谱",
                                                ].map((type) => (
                                                  <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => {
                                                      setSyllabus((prev) =>
                                                        prev.map((c) =>
                                                          c.id === chapter.id
                                                            ? {
                                                                ...c,
                                                                sections:
                                                                  c.sections.map(
                                                                    (s) =>
                                                                      s.id ===
                                                                      sec.id
                                                                        ? {
                                                                            ...s,
                                                                            generationType:
                                                                              type,
                                                                          }
                                                                        : s,
                                                                  ),
                                                              }
                                                            : c,
                                                        ),
                                                      );
                                                    }}
                                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition border ${
                                                      (sec.generationType ||
                                                        "图文") === type
                                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                                                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                                    }`}
                                                  >
                                                    {type}
                                                  </button>
                                                ))}
                                              </div>
                                              <p className="text-[10px] text-slate-400">
                                                当前生成类型：
                                                {sec.generationType || "图文"}
                                              </p>
                                            </div>
                                            <div className="text-[11px] font-medium pt-1">
                                              {sec.slideData ? (
                                                <span className="text-emerald-600 flex items-center">
                                                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                                  已就绪，可在右侧编辑或预览
                                                </span>
                                              ) : (
                                                <span className="text-slate-400"></span>
                                              )}
                                            </div>
                                          </div>
                                          {/* Tool 3: Script */}
                                          <div className="space-y-2.5 border-t border-slate-100 pt-4">
                                            <div className="flex justify-between items-center">
                                              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wide flex items-center">
                                                <Mic className="w-3 h-3 mr-1" />{" "}
                                                3. 配套讲稿
                                              </span>
                                              <button
                                                onClick={() =>
                                                  handleGenerateSectionScript(
                                                    chapter.id,
                                                    sec.id,
                                                  )
                                                }
                                                className={`text-[11px] text-white px-2 py-1 rounded transition shadow-sm flex items-center font-bold ${sec.script ? "bg-indigo-500 hover:bg-indigo-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
                                              >
                                                <Sparkles className="w-3 h-3 mr-1" />{" "}
                                                {sec.script
                                                  ? "重新润色讲稿"
                                                  : "AI 生成播报讲稿"}
                                              </button>
                                            </div>
                                            <textarea
                                              rows={4}
                                              value={sec.script || ""}
                                              onChange={(e) => {
                                                setSyllabus((prev) =>
                                                  prev.map((ch) =>
                                                    ch.id === chapter.id
                                                      ? {
                                                          ...ch,
                                                          sections:
                                                            ch.sections.map(
                                                              (s) =>
                                                                s.id === sec.id
                                                                  ? {
                                                                      ...s,
                                                                      script:
                                                                        e.target
                                                                          .value,
                                                                    }
                                                                  : s,
                                                            ),
                                                        }
                                                      : ch,
                                                  ),
                                                );
                                              }}
                                              placeholder="讲稿内容将用于数字人或 TTS 口述播报..."
                                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:border-indigo-400 resize-y shadow-inner leading-relaxed"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                  <button
                                    onClick={() =>
                                      handleAddSectionToChapter(chapter.id)
                                    }
                                    className="w-full mt-2 border border-dashed border-slate-300 rounded-lg py-1.5 text-[10px] text-slate-500 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 transition flex items-center justify-center font-semibold"
                                  >
                                    <Plus className="w-3 h-3 mr-1" /> 添加小节
                                  </button>
                                </div>
                              </div>
                            ))}
                            {/* Bottom Global Add Chapter */}
                            <button
                              onClick={handleAddChapter}
                              className="w-full border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 rounded-xl py-3 flex items-center justify-center space-x-1.5 transition text-slate-500 hover:text-indigo-600 text-xs font-semibold shadow-sm mt-4"
                            >
                              <Plus className="w-4 h-4" />
                              <span>新增空白章节单元</span>
                            </button>
                          </>
                        )}
                        {/* --- TAB: 交互模式配置 --- */}
                        {step2Tab === "interactive" && (
                          <div className="space-y-8 animate-fade-in pb-10">
                            {/* 1. 知识库与检索 */}
                            {/* <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">1</div>
                              <h3 className="font-bold text-slate-800 text-sm">知识库与检索配置</h3>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 shadow-inner">
                              <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-500 flex items-center">检索范围：</label>
                                <select
                                  value={interactionConfig.retrievalScope}
                                  onChange={(e) => setInteractionConfig(prev => ({ ...prev, retrievalScope: e.target.value }))}
                                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm font-medium"
                                >
                                  <option value="all-linked">全局匹配 (所有关联的知识库)</option>
                                  <option value="current-chapter">当前课件内容</option>
                                </select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-semibold text-slate-500 flex justify-between">
                                    <span>检索片段数量 (Top-K)：</span>
                                    <span className="text-indigo-600">{interactionConfig.topK}</span>
                                  </label>
                                  <input
                                    type="range" min="1" max="10"
                                    value={interactionConfig.topK}
                                    onChange={(e) => setInteractionConfig(prev => ({ ...prev, topK: parseInt(e.target.value) }))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                  />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-semibold text-slate-500 flex justify-between">
                                    <span>相似度阈值：</span>
                                    <span className="text-indigo-600">{interactionConfig.similarityThreshold}</span>
                                  </label>
                                  <input
                                    type="range" min="0.1" max="1.0" step="0.05"
                                    value={interactionConfig.similarityThreshold}
                                    onChange={(e) => setInteractionConfig(prev => ({ ...prev, similarityThreshold: parseFloat(e.target.value) }))}
                                    className="w-full accent-indigo-600 cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          </div> */}
                            {/* 2. 回复策略 */}
                            <div className="space-y-3 pt-2 border-t border-slate-100">
                              <div className="flex items-center space-x-2">
                                {/* <div className="w-6 h-6 rounded bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">2</div> */}
                                <h3 className="font-bold text-slate-800 text-sm">
                                  AI 助教回复策略
                                </h3>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 shadow-inner">
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-semibold text-slate-500 flex items-center">
                                    <Bot className="w-3 h-3 mr-1" /> 系统提示词
                                    (角色设定)：
                                  </label>
                                  <textarea
                                    rows={3}
                                    value={interactionConfig.systemPrompt}
                                    onChange={(e) =>
                                      setInteractionConfig((prev) => ({
                                        ...prev,
                                        systemPrompt: e.target.value,
                                      }))
                                    }
                                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:border-indigo-400 resize-y shadow-sm leading-relaxed"
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-1.5">
                                    <label className="text-[13px] font-semibold text-slate-500">
                                      回复长度倾向：
                                    </label>
                                    <select
                                      value={interactionConfig.responseLength}
                                      onChange={(e) =>
                                        setInteractionConfig((prev) => ({
                                          ...prev,
                                          responseLength: e.target.value,
                                        }))
                                      }
                                      className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm font-medium"
                                    >
                                      <option value="concise">
                                        精简 (一句带过)
                                      </option>
                                      <option value="detailed">
                                        详细 (充分解释)
                                      </option>
                                      <option value="step-by-step">
                                        分步骤 (逻辑引导)
                                      </option>
                                    </select>
                                  </div>
                                  <div className="space-y-1.5 flex flex-col justify-end pb-1">
                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                      <input
                                        type="checkbox"
                                        checked={
                                          interactionConfig.requireCitations
                                        }
                                        onChange={(e) =>
                                          setInteractionConfig((prev) => ({
                                            ...prev,
                                            requireCitations: e.target.checked,
                                          }))
                                        }
                                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                                      />
                                      <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-600 transition">
                                        严格显示引用来源
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 3. 交互限制 */}
                            {/* <div className="space-y-3 pt-2 border-t border-slate-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">3</div>
                              <h3 className="font-bold text-slate-800 text-sm">交互调用限制</h3>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 gap-4 shadow-inner">
                              <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-500">连续记忆上下文轮数：</label>
                                <input
                                  type="number" min="0" max="50"
                                  value={interactionConfig.contextTurns}
                                  onChange={(e) => setInteractionConfig(prev => ({ ...prev, contextTurns: parseInt(e.target.value) }))}
                                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-500">每日提问次数上限：</label>
                                <input
                                  type="number" min="1" max="999"
                                  value={interactionConfig.dailyLimit}
                                  onChange={(e) => setInteractionConfig(prev => ({ ...prev, dailyLimit: parseInt(e.target.value) }))}
                                  className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm"
                                />
                              </div>
                            </div>
                          </div> */}
                            {/* 4. 兜底与引导 */}
                            {/* <div className="space-y-3 pt-2 border-t border-slate-100">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">4</div>
                              <h3 className="font-bold text-slate-800 text-sm">兜底与话题引导</h3>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-inner">
                              <div className="space-y-1.5">
                                <label className="text-[13px] font-semibold text-slate-500 flex items-center">
                                  <ShieldAlert className="w-3 h-3 mr-1" /> 超出知识库/课程范围时的固定回复：
                                </label>
                                <textarea
                                  rows={3}
                                  value={interactionConfig.fallbackTemplate}
                                  onChange={(e) => setInteractionConfig(prev => ({ ...prev, fallbackTemplate: e.target.value }))}
                                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:border-indigo-400 resize-y shadow-sm leading-relaxed"
                                />
                              </div>
                            </div>
                          </div> */}
                          </div>
                        )}
                        {/* --- TAB: 考试模式配置 --- */}
                        {step2Tab === "exam" && (
                          <div className="space-y-8 animate-fade-in">
                            {/* 理论考试配置 */}
                            <div className="space-y-3">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                  1
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm">
                                  理论考试生成
                                </h3>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-inner">
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-semibold text-slate-500 flex items-center">
                                    <Edit3 className="w-3 h-3 mr-1" />{" "}
                                    微调理论试卷生成提示词：
                                  </label>
                                  <textarea
                                    rows={5}
                                    value={examConfig.theoreticalPrompt}
                                    onChange={(e) =>
                                      setExamConfig((prev) => ({
                                        ...prev,
                                        theoreticalPrompt: e.target.value,
                                      }))
                                    }
                                    className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 text-slate-700 focus:outline-none focus:border-indigo-400 resize-y shadow-sm leading-relaxed"
                                  />
                                </div>
                                <button
                                  onClick={handleGenerateExam}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-bold py-2.5 rounded-lg transition shadow-md flex items-center justify-center"
                                >
                                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                                  {examConfig.theoreticalContent
                                    ? "重新生成理论考卷"
                                    : "AI 智能生成理论考卷"}
                                </button>
                              </div>
                            </div>
                            {/* 实训考试配置 */}
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                  2
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm">
                                  实训考试配置
                                </h3>
                              </div>
                              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-inner">
                                <p className="text-xs text-slate-500">
                                  输入外部在线编译器或虚拟仿真平台的公开链接，学生将在右侧直接进行实操演练。
                                </p>
                                <div className="space-y-1.5">
                                  <label className="text-[13px] font-semibold text-slate-500 flex items-center">
                                    实训平台 URL：
                                  </label>
                                  <input
                                    type="url"
                                    placeholder="https://..."
                                    value={examConfig.practicalUrl}
                                    onChange={(e) =>
                                      setExamConfig((prev) => ({
                                        ...prev,
                                        practicalUrl: e.target.value,
                                      }))
                                    }
                                    className="w-full text-xs bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* RIGHT PANE: Live Preview */}
                    <div className="flex-1 bg-slate-100 p-6 md:p-10 overflow-hidden flex flex-col items-center relative h-full">
                      {/* Floating Fullscreen toggle */}
                      <button
                        onClick={() =>
                          setIsFullScreenPreview(!isFullScreenPreview)
                        }
                        className="absolute top-4 right-4 p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 z-20"
                        title={
                          isFullScreenPreview ? "恢复双栏视图" : "全屏预览"
                        }
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      {/* --- PREVIEW: 演示模式配置下的课件预览 --- */}
                      {step2Tab === "presentation" && (
                        <>
                          {activeSec?.slideData ? (
                            <div className="w-full max-w-4xl flex flex-col space-y-6">
                              {/* Slide Card */}
                              <div className="bg-white text-slate-900 rounded-2xl p-8 md:p-10 relative shadow-xl border border-slate-200 min-h-[420px] flex flex-col">
                                {activeSec.slideData.demoOnly ? (
                                  <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                                      <h3 className="text-xl font-black text-slate-900">
                                        {activeSec.title}
                                      </h3>
                                      <span className="text-xs font-bold text-slate-400">
                                        纯素材演示页
                                      </span>
                                    </div>
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner min-h-[560px]">
                                      {activeDemoAsset ? (
                                        <iframe
                                          src={activeDemoAsset.src}
                                          title={activeDemoAsset.title}
                                          className="w-full h-full min-h-[560px] border-0"
                                        />
                                      ) : (
                                        <div className="h-[560px] flex items-center justify-center text-sm text-slate-400">
                                          当前页还没有绑定 demo 素材
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-start border-b border-slate-100 pb-5 mb-6">
                                      <div className="flex-1 pr-4">
                                        <h3 className="text-2xl font-black text-slate-900 mb-2">
                                          {activeChap?.title}
                                        </h3>
                                        <input
                                          type="text"
                                          value={activeSec.slideData.contentTitle}
                                          onChange={(e) => {
                                            setSyllabus((prev) =>
                                              prev.map((c) =>
                                                c.id === activeChap.id
                                                  ? {
                                                      ...c,
                                                      sections: c.sections.map(
                                                        (s) =>
                                                          s.id === activeSec.id
                                                            ? {
                                                                ...s,
                                                                slideData: {
                                                                  ...s.slideData,
                                                                  contentTitle:
                                                                    e.target.value,
                                                                },
                                                              }
                                                            : s,
                                                      ),
                                                    }
                                                  : c,
                                              ),
                                            );
                                          }}
                                          className="text-sm font-bold text-indigo-600 bg-transparent border-b border-transparent hover:border-indigo-200 focus:border-indigo-500 focus:outline-none w-full"
                                        />
                                      </div>
                                      <input
                                        type="text"
                                        value={activeSec.slideData.conceptLabel}
                                        onChange={(e) => {
                                          setSyllabus((prev) =>
                                            prev.map((c) =>
                                              c.id === activeChap.id
                                                ? {
                                                    ...c,
                                                    sections: c.sections.map((s) =>
                                                      s.id === activeSec.id
                                                        ? {
                                                            ...s,
                                                            slideData: {
                                                              ...s.slideData,
                                                              conceptLabel:
                                                                e.target.value,
                                                            },
                                                          }
                                                        : s,
                                                    ),
                                                  }
                                                : c,
                                            ),
                                          );
                                        }}
                                        className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-bold shadow-sm text-center w-24 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                      />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1">
                                      <div className="col-span-5 space-y-4">
                                        <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase block self-start">
                                          核心要素 (可点击编辑)
                                        </span>
                                        <ul className="space-y-4 pl-1">
                                          {activeSec.slideData.bulletPoints?.map(
                                            (bp, i) => (
                                              <li key={i} className="text-sm">
                                                <strong className="text-slate-800 flex items-center mb-1">
                                                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 shrink-0"></span>
                                                  <input
                                                    value={bp.label}
                                                    onChange={(e) => {
                                                      const newBp = [
                                                        ...activeSec.slideData
                                                          .bulletPoints,
                                                      ];
                                                      newBp[i].label =
                                                        e.target.value;
                                                      setSyllabus((prev) =>
                                                        prev.map((c) =>
                                                          c.id === activeChap.id
                                                            ? {
                                                                ...c,
                                                                sections:
                                                                  c.sections.map(
                                                                    (s) =>
                                                                      s.id ===
                                                                      activeSec.id
                                                                        ? {
                                                                            ...s,
                                                                            slideData:
                                                                              {
                                                                                ...s.slideData,
                                                                                bulletPoints:
                                                                                  newBp,
                                                                              },
                                                                          }
                                                                        : s,
                                                                  ),
                                                              }
                                                            : c,
                                                        ),
                                                      );
                                                    }}
                                                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none font-bold text-slate-800 w-full"
                                                  />
                                                </strong>
                                                <textarea
                                                  value={bp.desc}
                                                  rows={2}
                                                  onChange={(e) => {
                                                    const newBp = [
                                                      ...activeSec.slideData
                                                        .bulletPoints,
                                                    ];
                                                    newBp[i].desc =
                                                      e.target.value;
                                                    setSyllabus((prev) =>
                                                      prev.map((c) =>
                                                        c.id === activeChap.id
                                                          ? {
                                                              ...c,
                                                              sections:
                                                                c.sections.map(
                                                                  (s) =>
                                                                    s.id ===
                                                                    activeSec.id
                                                                      ? {
                                                                          ...s,
                                                                          slideData:
                                                                            {
                                                                              ...s.slideData,
                                                                              bulletPoints:
                                                                                newBp,
                                                                            },
                                                                        }
                                                                      : s,
                                                                ),
                                                            }
                                                          : c,
                                                      ),
                                                    );
                                                  }}
                                                  className="text-slate-500 block pl-3.5 leading-relaxed text-xs bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-500 focus:outline-none w-full resize-none"
                                                />
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                      <div className="col-span-7 grid grid-cols-1 gap-4">
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-inner relative overflow-hidden flex flex-col">
                                          <textarea
                                            value={
                                              activeSec.slideData.content || ""
                                            }
                                            onChange={(e) => {
                                              setSyllabus((prev) =>
                                                prev.map((c) =>
                                                  c.id === activeChap.id
                                                    ? {
                                                        ...c,
                                                        sections: c.sections.map(
                                                          (s) =>
                                                            s.id === activeSec.id
                                                              ? {
                                                                  ...s,
                                                                  slideData: {
                                                                    ...s.slideData,
                                                                    content:
                                                                      e.target
                                                                        .value,
                                                                  },
                                                                }
                                                              : s,
                                                        ),
                                                      }
                                                    : c,
                                                ),
                                              );
                                            }}
                                            className="flex-1 bg-transparent text-[13px] text-slate-700 leading-relaxed font-mono resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded p-1"
                                            placeholder="编写 Markdown 正文内容..."
                                          />
                                        </div>
                                        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-inner">
                                          <div className="px-4 py-2 border-b border-slate-100 text-xs font-bold text-slate-500">
                                            对应演示素材
                                          </div>
                                          {activeDemoAsset ? (
                                            <iframe
                                              src={activeDemoAsset.src}
                                              title={activeDemoAsset.title}
                                              className="w-full h-[360px] border-0"
                                            />
                                          ) : (
                                            <div className="h-[360px] flex items-center justify-center text-sm text-slate-400">
                                              当前页还没有绑定 demo 素材
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              {/* Presentation Control Bar */}
                              <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-between shadow-md shrink-0">
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => {
                                      const nextMute = !isMuted;
                                      setIsMuted(nextMute);
                                      if (nextMute) stopSpeaking();
                                      else if (isPlaying && activeSec.script)
                                        speakText(activeSec.script);
                                    }}
                                    className={`p-2 rounded-lg hover:bg-slate-100 transition border border-slate-200 ${isMuted ? "text-rose-500 bg-rose-50" : "text-slate-600"}`}
                                  >
                                    {isMuted ? (
                                      <VolumeX className="w-4 h-4" />
                                    ) : (
                                      <Volume2 className="w-4 h-4" />
                                    )}
                                  </button>
                                  <select
                                    value={playbackSpeed}
                                    onChange={(e) =>
                                      setPlaybackSpeed(
                                        parseFloat(e.target.value),
                                      )
                                    }
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded p-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                  >
                                    <option value="1">1.0x</option>
                                    <option value="1.25">1.25x</option>
                                    <option value="1.5">1.5x</option>
                                    <option value="2.0">2.0x</option>
                                  </select>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <button
                                    onClick={() => navigateSection(-1)}
                                    disabled={currentSecIndex === 0}
                                    className="text-slate-500 hover:text-indigo-600 disabled:opacity-30 p-2 hover:bg-slate-100 rounded-lg"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={togglePlay}
                                    disabled={!activeSec.script}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition transform hover:scale-105 active:scale-95 disabled:opacity-50 ${isPlaying ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
                                  >
                                    {isPlaying ? (
                                      <Pause className="w-5 h-5 fill-current" />
                                    ) : (
                                      <Play className="w-5 h-5 fill-current ml-1" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => navigateSection(1)}
                                    disabled={
                                      currentSecIndex === allSecsCount - 1
                                    }
                                    className="text-slate-500 hover:text-indigo-600 disabled:opacity-30 p-2 hover:bg-slate-100 rounded-lg"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                </div>
                                <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                  {currentSecIndex + 1} / {allSecsCount}
                                </div>
                              </div>
                              {/* Script Box */}
                              {activeSec?.script && (
                                <div
                                  className={`bg-white border ${isPlaying ? "border-indigo-300 shadow-md ring-2 ring-indigo-500/10" : "border-slate-200 shadow-sm"} rounded-xl p-5 flex items-start space-x-4 transition-all duration-300 relative overflow-hidden`}
                                >
                                  {/* Dynamic Voice Wave Background when playing */}
                                  {isPlaying && (
                                    <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none opacity-50 flex items-center justify-end pr-8">
                                      <div className="flex items-end justify-center space-x-1 h-8 w-16">
                                        {waveBars.slice(0, 10).map((h, i) => (
                                          <div
                                            key={i}
                                            className="w-1 bg-indigo-300 rounded-full transition-all duration-75"
                                            style={{ height: `${h * 0.8}px` }}
                                          ></div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md border-2 border-white relative z-10">
                                    林
                                  </div>
                                  <div className="flex-1 mt-0.5 relative z-10">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1.5 flex items-center">
                                      <Mic className="w-3 h-3 mr-1" />
                                      {isPlaying
                                        ? "AI 讲师正在播报..."
                                        : "生成的匹配讲稿"}
                                    </span>
                                    <p className="text-sm text-slate-800 italic leading-relaxed font-medium">
                                      "{activeSec.script}"
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="w-full max-w-4xl bg-white border-2 border-dashed border-slate-300 rounded-2xl h-[500px] flex flex-col items-center justify-center text-slate-500 shadow-sm mt-10">
                              <FileText className="w-12 h-12 text-slate-300 mb-3" />
                              <p className="text-sm font-bold text-slate-700">
                                尚未生成课件
                              </p>
                              <p className="text-xs text-slate-400 mt-1 text-center px-6">
                                在左侧选中当前小节，点击{" "}
                                <span className="text-indigo-600 font-bold">
                                  "AI 智能生成课件"
                                </span>{" "}
                                自动构建富媒体呈现与专业讲稿。
                              </p>
                            </div>
                          )}
                        </>
                      )}
                      {/* --- PREVIEW: 交互模式配置下的预览 --- */}
                      {step2Tab === "interactive" && (
                        <div className="w-full max-w-4xl flex flex-col space-y-6 animate-fade-in h-full pb-8">
                          {/* Interactive Chat Sandbox */}
                          <div className="bg-white rounded-2xl relative shadow-md border border-slate-200 flex flex-col h-full overflow-hidden">
                            {/* Chat Header */}
                            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-4 flex items-center justify-between shrink-0">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center border border-white/30 text-white font-bold shadow-sm">
                                  AI
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-white flex items-center">
                                    课程智能助教{" "}
                                    <span className="ml-2 px-1.5 py-0.5 bg-green-400/20 text-green-300 text-[9px] border border-green-400/30 rounded-full font-mono">
                                      在线
                                    </span>
                                  </h3>
                                  <p className="text-[10px] text-indigo-200 mt-0.5">
                                    交互模式配置效果实时预览 (学生视角)
                                  </p>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <span className="text-[10px] text-white/70 bg-black/20 px-2 py-1 rounded">
                                  提问次数: 3 / {interactionConfig.dailyLimit}
                                </span>
                              </div>
                            </div>
                            {/* Chat Body */}
                            <div className="flex-1 bg-slate-50 p-6 overflow-y-auto space-y-6 shadow-inner">
                              {/* AI Greeting based on config */}
                              <div className="flex items-start space-x-3 max-w-[85%]">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center shrink-0 border border-indigo-200">
                                  <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 leading-relaxed">
                                  同学你好！👋 {interactionConfig.systemPrompt}
                                </div>
                              </div>
                              {/* Student Question 1 */}
                              <div className="flex items-start justify-end space-x-3 max-w-[85%] ml-auto">
                                <div className="bg-indigo-600 shadow-md rounded-2xl rounded-tr-none p-4 text-sm text-white leading-relaxed">
                                  老师，可以给我举一个生活里运用分数乘法的例子吗？
                                </div>
                                <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 font-bold text-xs border border-slate-300">
                                  我
                                </div>
                              </div>
                              {/* AI Answer 1 */}
                              <div className="flex items-start space-x-3 max-w-[85%]">
                                <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center shrink-0 border border-indigo-200">
                                  <Bot className="w-4 h-4" />
                                </div>
                                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 leading-relaxed space-y-3">
                                  <p>
                                    没问题！假设你有一个披萨，你吃掉了整个披萨的
                                    $\frac{1}
                                    {2}
                                    $。你的好朋友也饿了，他吃掉了你那部分（也就是半个披萨）的
                                    $\frac{1}
                                    {2}$。
                                  </p>
                                  <p>
                                    这个时候我们就可以用分数乘法：$\frac{1}
                                    {2} \times \frac{1}
                                    {2} = \frac{1}
                                    {4}$。所以你的朋友吃掉了整个披萨的四分之一！
                                  </p>
                                  {interactionConfig.requireCitations && (
                                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-[10px] text-slate-400">
                                      <BookOpen className="w-3 h-3 mr-1" />
                                      <span>
                                        [1] 六年级数学上册核心考点库 - 第二章
                                        分数应用
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {/* Student Out of bounds Question */}
                              <div className="flex items-start justify-end space-x-3 max-w-[85%] ml-auto">
                                <div className="bg-indigo-600 shadow-md rounded-2xl rounded-tr-none p-4 text-sm text-white leading-relaxed">
                                  听起来披萨很好吃，那老师你知道怎么打王者荣耀吗？我想玩李白。
                                </div>
                                <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 font-bold text-xs border border-slate-300">
                                  我
                                </div>
                              </div>
                              {/* AI Fallback Answer */}
                              <div className="flex items-start space-x-3 max-w-[85%]">
                                <div className="w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border border-slate-300">
                                  <ShieldAlert className="w-4 h-4" />
                                </div>
                                <div className="bg-amber-50 border border-amber-200 shadow-sm rounded-2xl rounded-tl-none p-4 text-sm text-amber-800 leading-relaxed font-medium">
                                  {interactionConfig.fallbackTemplate}
                                </div>
                              </div>
                            </div>
                            {/* Chat Input Placeholder */}
                            <div className="bg-white p-4 border-t border-slate-200 shrink-0 flex items-center space-x-3">
                              <div className="w-8 h-8 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-not-allowed">
                                <Plus className="w-4 h-4" />
                              </div>
                              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-400 flex items-center cursor-not-allowed">
                                预览模式下不可输入...
                              </div>
                              <div className="w-10 h-10 bg-indigo-200 text-indigo-400 rounded-full flex items-center justify-center cursor-not-allowed">
                                <Send className="w-4 h-4 ml-0.5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* --- PREVIEW: 考试模式配置下的预览 --- */}
                      {step2Tab === "exam" && (
                        <div className="w-full max-w-4xl flex flex-col space-y-6 animate-fade-in">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => setExamPreviewTab("theoretical")}
                              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm ${
                                examPreviewTab === "theoretical"
                                  ? "bg-indigo-600 text-white"
                                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                              }`}
                            >
                              <span className="flex items-center">
                                <Edit3 className="w-4 h-4 mr-2" />
                                理论考试
                              </span>
                            </button>
                            <button
                              onClick={() => setExamPreviewTab("practical")}
                              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm ${
                                examPreviewTab === "practical"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                              }`}
                            >
                              <span className="flex items-center">
                                <MonitorPlay className="w-4 h-4 mr-2" />
                                实训考试
                              </span>
                            </button>
                          </div>
                          {/* 理论考试预览区 */}
                          {examPreviewTab === "theoretical" && (
                            <div className="bg-white rounded-2xl p-8 relative shadow-md border border-slate-200 flex flex-col">
                              <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shadow-sm border border-indigo-100">
                                  📝
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-slate-900">
                                    理论考试内容预览与编辑
                                  </h3>
                                  <p className="text-[10px] text-slate-500">
                                    AI
                                    基于教学大纲与您提供的提示词动态生成，您可在此直接修改考卷
                                  </p>
                                </div>
                              </div>
                              {examConfig.theoreticalContent ? (
                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-inner flex flex-col min-h-[350px]">
                                  <textarea
                                    value={examConfig.theoreticalContent}
                                    onChange={(e) =>
                                      setExamConfig((prev) => ({
                                        ...prev,
                                        theoreticalContent: e.target.value,
                                      }))
                                    }
                                    className="flex-1 w-full bg-transparent text-[14px] text-slate-800 leading-loose resize-none focus:outline-none focus:ring-0"
                                    placeholder="在这里自由编辑考试内容..."
                                  />
                                </div>
                              ) : (
                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-slate-400">
                                  <Sparkles className="w-8 h-8 mb-2 text-slate-300" />
                                  <span className="text-xs font-bold text-slate-500">
                                    左侧点击生成获取理论试卷
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                          {/* 实训考试预览区 */}
                          {examPreviewTab === "practical" && (
                            <div className="bg-white rounded-2xl p-8 relative shadow-md border border-slate-200 flex flex-col">
                              <div className="flex items-center space-x-3 mb-6 border-b border-slate-100 pb-4">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm border border-emerald-100">
                                  💻
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-slate-900">
                                    实训考试沙箱
                                  </h3>
                                  <p className="text-[10px] text-slate-500">
                                    学生将在此环境中完成动手操作任务
                                  </p>
                                </div>
                              </div>
                              {examConfig.practicalUrl ? (
                                <div className="w-full h-[500px] bg-slate-900 rounded-xl border-4 border-slate-800 shadow-xl relative overflow-hidden flex flex-col">
                                  <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2 shrink-0">
                                    <div className="flex space-x-1.5">
                                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <div className="flex-1 text-center">
                                      <span className="bg-slate-700/50 text-slate-300 text-[9px] px-3 py-1 rounded font-mono truncate max-w-xs inline-block">
                                        {examConfig.practicalUrl}
                                      </span>
                                    </div>
                                  </div>
                                  <iframe
                                    src={examConfig.practicalUrl}
                                    title="实训考试环境"
                                    className="flex-1 w-full bg-white"
                                  />
                                </div>
                              ) : (
                                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-slate-400">
                                  <MonitorPlay className="w-8 h-8 mb-2 text-slate-300" />
                                  <span className="text-xs font-bold text-slate-500">
                                    未配置实训考试环境
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            {/* STEP 4: UPGRADED INTERACTIVE PRESENTATION PLAYBACK & PREVIEW */}
            {workStep === 4 && (
              <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden select-none">
                {/* --- 顶部全局操作栏 (新增) --- */}
                <div className="px-6 py-3 border-b border-slate-200 bg-white flex items-center justify-between z-20 shrink-0 shadow-sm">
                  <button
                    onClick={() => {
                      stopSpeaking();
                      if (step4Source === "saved-coursewares") {
                        setCurrentPage("saved-coursewares");
                      } else {
                        setWorkStep(2);
                      }
                    }}
                    className="text-slate-600 hover:text-indigo-600 transition py-1.5 px-3 rounded-lg hover:bg-indigo-50 bg-white border border-slate-200 flex items-center shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    <span className="text-[13px] font-bold">
                      {step4Source === "saved-coursewares"
                        ? "返回"
                        : "返回编辑大纲"}
                    </span>
                  </button>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setStep4Tab("presentation")}
                      className={`px-6 py-1.5 rounded-md text-[15px] font-bold transition ${step4Tab === "presentation" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      演示模式预览
                    </button>
                    <button
                      onClick={() => setStep4Tab("interactive")}
                      className={`px-6 py-1.5 rounded-md text-[15px] font-bold transition ${step4Tab === "interactive" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      交互模式预览
                    </button>
                    <button
                      onClick={() => setStep4Tab("exam")}
                      className={`px-6 py-1.5 rounded-md text-[15px] font-bold transition ${step4Tab === "exam" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      考试模式预览
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleSaveCourseware}
                      className="text-[13px] font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 py-1.5 px-4 rounded-lg flex items-center transition shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5 mr-1" /> 保存
                    </button>
                    <button
                      onClick={handlePublishCourseware}
                      className="text-[13px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-1.5 px-4 rounded-lg flex items-center transition shadow-md"
                    >
                      <Send className="w-3.5 h-3.5 mr-1" /> 发布
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex overflow-hidden">
                  {step4Tab === "presentation" && (
                    <>
                      {/* ====== RESTORED: LEFT COLUMN: Thumbnail Navigation ====== */}
                      <div className="w-64 bg-slate-100 border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto p-4 space-y-4 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.05)] z-10">
                        <div className="px-1 pb-2 border-b border-slate-200 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                            课件页面导航
                          </span>
                          <span className="text-[10px] bg-indigo-100 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded-full font-mono font-bold">
                            共 {courseware.length} 页
                          </span>
                        </div>
                        <div className="space-y-3">
                          {courseware.map((slide, idx) => (
                            <div
                              key={slide.id}
                              onClick={() => {
                                stopSpeaking();
                                setCurrentSlide(idx);
                                if (isPlaying && slide.script) {
                                  setTimeout(
                                    () => speakText(slide.script),
                                    300,
                                  );
                                }
                              }}
                              className={`cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 relative group bg-white shadow-sm hover:shadow-md ${currentSlide === idx ? "border-indigo-500 ring-2 ring-indigo-500/20 scale-[1.02]" : "border-slate-200 hover:border-indigo-300"}`}
                            >
                              <div className="p-2.5 bg-slate-50 flex items-center justify-between border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-800 truncate">
                                  {idx + 1}. {slide.title.substring(0, 8)}...
                                </span>
                              </div>
                              <div className="p-3 h-20 flex flex-col justify-start relative bg-white">
                                <p className="text-[10px] font-bold text-indigo-700 line-clamp-2 leading-relaxed mb-1">
                                  {slide.demoOnly
                                    ? "纯素材演示页"
                                    : slide.contentTitle}
                                </p>
                                <span className="text-[9px] text-slate-500 inline-block bg-slate-100 px-1.5 py-0.5 rounded truncate self-start">
                                  {slide.demoOnly
                                    ? "demo 素材"
                                    : slide.conceptLabel}
                                </span>
                                {currentSlide === idx && (
                                  <div className="absolute inset-0 bg-indigo-50/30 flex items-center justify-center pointer-events-none"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* MIDDLE COLUMN: Main Canvas and controls */}
                      <div className="flex-1 flex flex-col bg-slate-50 relative overflow-hidden">
                        {/* Header inside player */}
                        {/* Central Play Area */}
                        <div className="flex-1 pt-3 px-6 pb-6 md:pt-4 md:px-8 md:pb-8 flex items-center justify-center overflow-y-auto bg-slate-100 relative">
                          <div className="w-full max-w-5xl flex flex-col space-y-1.5">
                            {/* Main pure white canvas slide */}
                            <div className="bg-white text-slate-900 rounded-2xl p-8 md:p-10 relative shadow-lg border border-slate-200 min-h-[520px] flex flex-col">
                              {courseware[currentSlide]?.demoOnly ? (
                                <div className="flex-1 flex flex-col">
                                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-wide leading-snug">
                                      {courseware[currentSlide]?.title}
                                    </h3>
                                    <span className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-bold shadow-sm">
                                      纯素材演示页
                                    </span>
                                  </div>
                                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-inner min-h-[560px]">
                                    {courseware[currentSlide]?.demoSrc ? (
                                      <iframe
                                        src={courseware[currentSlide]?.demoSrc}
                                        title={courseware[currentSlide]?.title}
                                        className="w-full h-full min-h-[560px] border-0"
                                      />
                                    ) : (
                                      <div className="h-[560px] flex items-center justify-center text-sm text-slate-400">
                                        当前页还没有绑定 demo 素材
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                                    <div>
                                      <h3 className="text-2xl font-black text-slate-900 tracking-wide mb-1.5 leading-snug">
                                        {courseware[currentSlide]?.title}
                                      </h3>
                                      <p className="text-sm text-indigo-600 font-extrabold">
                                        {courseware[currentSlide]?.contentTitle}
                                      </p>
                                    </div>
                                    <span className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full font-bold shadow-sm">
                                      {courseware[currentSlide]?.conceptLabel}
                                    </span>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 flex-1 overflow-y-auto">
                                    <div className="md:col-span-5 space-y-4 flex flex-col">
                                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block bg-slate-50 px-2 py-1 rounded self-start">
                                        核心要素
                                      </span>
                                      <ul className="space-y-4 pl-1">
                                        {courseware[
                                          currentSlide
                                        ]?.bulletPoints?.map((point, pIdx) => (
                                          <li
                                            key={pIdx}
                                            className="text-sm flex flex-col"
                                          >
                                            <strong className="text-slate-800 flex items-center mb-1">
                                              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
                                              {point.label}
                                            </strong>
                                            <span className="text-slate-600 pl-3.5 leading-relaxed text-xs">
                                              {point.desc}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 relative shadow-inner overflow-y-auto">
                                      <div className="text-[13px] text-slate-700 leading-relaxed font-mono whitespace-pre-line">
                                        {courseware[currentSlide]?.content}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                            {/* Bottom Slide Console */}
                            <div className="bg-white border border-slate-200 rounded-xl px-5 py-2 flex items-center justify-between text-xs text-slate-600 shadow-none">
                              <div className="flex items-center space-x-5">
                                <button
                                  onClick={() => {
                                    const nextMute = !isMuted;
                                    setIsMuted(nextMute);
                                    if (nextMute) stopSpeaking();
                                    else if (isPlaying)
                                      speakText(
                                        courseware[currentSlide]?.script,
                                      );
                                  }}
                                  className={`p-2 rounded-lg hover:bg-slate-100 transition border border-slate-200 ${isMuted ? "text-rose-500 bg-rose-50 border-rose-200" : "text-slate-600"}`}
                                  title={isMuted ? "取消静音" : "开启讲师发音"}
                                >
                                  {isMuted ? (
                                    <VolumeX className="w-4 h-4" />
                                  ) : (
                                    <Volume2 className="w-4 h-4" />
                                  )}
                                </button>
                                <div className="flex items-center space-x-2">
                                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    语速:
                                  </span>
                                  <select
                                    value={playbackSpeed}
                                    onChange={(e) =>
                                      setPlaybackSpeed(
                                        parseFloat(e.target.value),
                                      )
                                    }
                                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded p-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium"
                                  >
                                    <option value="1">1.0x 标准</option>
                                    <option value="1.25">1.25x 快</option>
                                    <option value="1.5">1.5x 更快</option>
                                    <option value="2.0">2.0x 极速</option>
                                  </select>
                                </div>
                              </div>
                              <div className="flex items-center space-x-6">
                                <button
                                  onClick={() => navigateSection(-1)}
                                  disabled={currentSlide === 0}
                                  className="text-slate-500 hover:text-indigo-600 disabled:opacity-30 p-2 hover:bg-slate-100 rounded-lg flex items-center space-x-1 border border-transparent hover:border-slate-200"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                  <span className="font-semibold hidden sm:inline">
                                    上一页
                                  </span>
                                </button>
                                <button
                                  onClick={togglePlay}
                                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition transform hover:scale-105 active:scale-95 ${isPlaying ? "bg-amber-500 hover:bg-amber-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
                                >
                                  {isPlaying ? (
                                    <Pause className="w-5 h-5 fill-current" />
                                  ) : (
                                    <Play className="w-5 h-5 fill-current ml-1" />
                                  )}
                                </button>
                                <button
                                  onClick={() => navigateSection(1)}
                                  disabled={
                                    currentSlide === courseware.length - 1
                                  }
                                  className="text-slate-500 hover:text-indigo-600 disabled:opacity-30 p-2 hover:bg-slate-100 rounded-lg flex items-center space-x-1 border border-transparent hover:border-slate-200"
                                >
                                  <span className="font-semibold hidden sm:inline">
                                    下一页
                                  </span>
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center justify-end min-w-[100px]">
                                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                                  {currentSlide + 1} / {courseware.length}
                                </span>
                              </div>
                            </div>
                            {/* Script Box (Always visible if script exists) */}
                            {courseware[currentSlide]?.script && (
                              <div
                                className={`bg-white border ${isPlaying ? "border-indigo-300 shadow-md ring-2 ring-indigo-500/10" : "border-slate-200 shadow-sm"} rounded-xl p-5 flex items-start space-x-4 transition-all duration-300 relative overflow-hidden shrink-0`}
                              >
                                {/* Dynamic Voice Wave Background when playing */}
                                {isPlaying && (
                                  <div className="absolute top-0 right-0 bottom-0 w-1/3 bg-gradient-to-l from-indigo-50 to-transparent pointer-events-none opacity-50 flex items-center justify-end pr-8">
                                    <div className="flex items-end justify-center space-x-1 h-8 w-16">
                                      {waveBars.slice(0, 10).map((h, i) => (
                                        <div
                                          key={i}
                                          className="w-1 bg-indigo-300 rounded-full transition-all duration-75"
                                          style={{ height: `${h * 0.8}px` }}
                                        ></div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md border-2 border-white relative z-10">
                                  林
                                </div>
                                <div className="flex-1 mt-0.5 relative z-10">
                                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1.5 flex items-center">
                                    <Mic className="w-3 h-3 mr-1" />
                                    {isPlaying
                                      ? "AI 讲师正在播报..."
                                      : "配套讲稿"}
                                  </span>
                                  <p className="text-sm text-slate-800 italic leading-relaxed font-medium">
                                    "{courseware[currentSlide]?.script}"
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {/* --- 交互模式预览视图 (Step 4) --- */}
                  {step4Tab === "interactive" && (
                    <div className="flex-1 bg-gradient-to-b from-blue-50/50 to-blue-50/50 px-6 md:px-10 pt-0 flex flex-col items-center justify-center animate-fade-in h-full">
                      <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center pb-4">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl mb-6 shadow-blue-600/20 transform hover:scale-105 transition-transform">
                          <Bot size={40} />
                        </div>
                        <h2 className="text-[25px] font-bold text-slate-800 mb-3 tracking-tight text-center">
                          你好，我是教学智能体
                        </h2>
                        <p className="text-slate-500 mb-5 text-[15px] text-center">
                          你可以向我提问机器人机构学、驱动与控制、传感与感知、运动规划，或相关仿真与实训练习中的问题。
                        </p>
                        <div className="w-full max-w-3xl bg-white rounded-full shadow-lg border border-slate-200 p-2 pl-6 flex items-center gap-3 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:border-blue-400 transition-all z-10 hover:shadow-xl">
                          <Sparkles
                            className="text-blue-500 shrink-0"
                            size={24}
                          />
                          <input
                            type="text"
                            placeholder="例如：请用演示方式讲解直流伺服电机的PID速度闭环控制原理"
                            className="flex-1 bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 text-[15px]"
                          />
                          <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full transition-colors flex items-center justify-center shrink-0"
                          >
                            <Send size={20} />
                          </button>
                        </div>
                        <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-4xl">
                          {[
                            "什么是服务网格？",
                            "请视频演示负载均衡配置",
                            "Docker 和 K8s 的区别",
                            "如何设计高并发架构？",
                          ].map((q, i) => (
                            <button
                              key={i}
                              type="button"
                              className="bg-white px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* --- 考试模式预览视图 --- */}
                  {step4Tab === "exam" && (
                    <div className="flex-1 bg-slate-100 p-6 md:p-10 overflow-y-auto flex flex-col items-center space-y-6 animate-fade-in">
                      <div className="w-full max-w-4xl">
                        {/* 考试预览 Tab 切换 */}
                        <div className="flex space-x-4 mb-6">
                          <button
                            onClick={() => setExamPreviewTab("theoretical")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm ${examPreviewTab === "theoretical" ? "bg-indigo-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                          >
                            <span className="flex items-center">
                              <Edit3 className="w-4 h-4 mr-2" /> 理论考试
                            </span>
                          </button>
                          <button
                            onClick={() => setExamPreviewTab("practical")}
                            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-sm ${examPreviewTab === "practical" ? "bg-emerald-600 text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                          >
                            <span className="flex items-center">
                              <MonitorPlay className="w-4 h-4 mr-2" /> 实训考试
                            </span>
                          </button>
                        </div>
                        {/* 理论考试真实作答区 */}
                        {examPreviewTab === "theoretical" && (
                          <div className="bg-white rounded-2xl p-8 md:p-12 relative shadow-md border border-slate-200 min-h-[500px] flex flex-col">
                            {examConfig.theoreticalContent ? (
                              <>
                                <div className="text-center mb-8 border-b border-slate-100 pb-6">
                                  <h2 className="text-2xl font-black text-slate-900">
                                    阶段性理论测试卷
                                  </h2>
                                  <p className="text-xs text-slate-500 mt-2">
                                    请根据题目要求，独立完成以下测试。
                                  </p>
                                </div>
                                <div className="flex-1">
                                  {renderInteractiveExam(
                                    examConfig.theoreticalContent,
                                  )}
                                </div>
                                <div className="mt-12 text-center pt-8 border-t border-slate-100">
                                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl font-bold shadow-md transition transform hover:scale-105">
                                    提交试卷
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                                <FileText className="w-10 h-10 mb-4 text-slate-300" />
                                <span className="text-sm font-bold text-slate-500">
                                  老师尚未配置理论考卷
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        {/* 实训考试沙箱区 */}
                        {examPreviewTab === "practical" && (
                          <div className="bg-white rounded-2xl p-8 relative shadow-md border border-slate-200 flex flex-col">
                            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shadow-sm border border-emerald-100">
                                  💻
                                </div>
                                <div>
                                  <h3 className="text-lg font-black text-slate-900">
                                    实训考试沙箱
                                  </h3>
                                  <p className="text-[10px] text-slate-500">
                                    学生将在此环境中完成动手操作任务
                                  </p>
                                </div>
                              </div>
                              {examConfig.practicalUrl && (
                                <button
                                  onClick={openPracticalExamFullscreen}
                                  className="p-2 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-500 hover:text-emerald-600 transition"
                                  title="全屏预览"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                            {examConfig.practicalUrl ? (
                              <div
                                ref={practicalExamFullscreenRef}
                                className="w-full h-[500px] bg-slate-900 rounded-xl border-4 border-slate-800 shadow-xl relative overflow-hidden flex flex-col"
                              >
                                <div className="bg-slate-800 px-4 py-2 flex items-center space-x-2 shrink-0">
                                  <div className="flex space-x-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                                  </div>
                                  <div className="flex-1 text-center">
                                    <span className="bg-slate-700/50 text-slate-300 text-[9px] px-3 py-1 rounded font-mono truncate max-w-xs inline-block">
                                      {examConfig.practicalUrl}
                                    </span>
                                  </div>
                                </div>
                                {/* 由于安全和跨域限制，实际应用中这里是 iframe，演示中用占位 */}
                                <iframe
                                  src={examConfig.practicalUrl}
                                  title="实训考试环境"
                                  className="flex-1 w-full bg-white"
                                />
                              </div>
                            ) : (
                              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-10 flex flex-col items-center justify-center text-slate-400">
                                <MonitorPlay className="w-8 h-8 mb-2 text-slate-300" />
                                <span className="text-xs font-bold text-slate-500">
                                  未配置实训考试环境
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      {/* --- SELECT KB MODAL (Step 1) --- */}
      {/* --- SELECT KB MODAL (Step 1) --- */}
      {isSelectKBModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center">
                <Database className="w-4 h-4 mr-2 text-indigo-500" />{" "}
                选择关联知识库
              </h3>
              <button
                onClick={() => setIsSelectKBModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto bg-slate-50">
              {MOCK_KNOWLEDGE_BASES.map((kb) => (
                <div
                  key={kb.id}
                  onClick={() =>
                    setTempSelectedKBs((prev) =>
                      prev.includes(kb.id)
                        ? prev.filter((id) => id !== kb.id)
                        : [...prev, kb.id],
                    )
                  }
                  className={`border rounded-xl p-4 cursor-pointer flex items-start justify-between transition-all duration-200 bg-white ${tempSelectedKBs.includes(kb.id) ? "border-indigo-500 shadow-sm ring-1 ring-indigo-500/20" : "border-slate-200 hover:border-indigo-300 shadow-sm"}`}
                >
                  <div className="flex flex-col pr-4">
                    <span
                      className={`text-sm font-bold ${tempSelectedKBs.includes(kb.id) ? "text-indigo-800" : "text-slate-700"}`}
                    >
                      {kb.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      包含 {kb.count} 篇专业教案/大纲
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${tempSelectedKBs.includes(kb.id) ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"}`}
                  >
                    {tempSelectedKBs.includes(kb.id) && (
                      <Check className="w-3 h-3 stroke-[3]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => {
                  setLinkedKBs(tempSelectedKBs);
                  setIsSelectKBModalOpen(false);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-md"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- SELECT RL MODAL (Step 1) --- */}
      {isSelectRLModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-sm flex items-center">
                <Layers className="w-4 h-4 mr-2 text-emerald-500" />{" "}
                选择关联资源库
              </h3>
              <button
                onClick={() => setIsSelectRLModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto bg-slate-50">
              {MOCK_RESOURCE_LIBRARIES.map((rl) => (
                <div
                  key={rl.id}
                  onClick={() =>
                    setTempSelectedRLs((prev) =>
                      prev.includes(rl.id)
                        ? prev.filter((id) => id !== rl.id)
                        : [...prev, rl.id],
                    )
                  }
                  className={`border rounded-xl p-4 cursor-pointer flex items-start justify-between transition-all duration-200 bg-white ${tempSelectedRLs.includes(rl.id) ? "border-emerald-500 shadow-sm ring-1 ring-emerald-500/20" : "border-slate-200 hover:border-emerald-300 shadow-sm"}`}
                >
                  <div className="flex flex-col pr-4">
                    <span
                      className={`text-sm font-bold ${tempSelectedRLs.includes(rl.id) ? "text-emerald-800" : "text-slate-700"}`}
                    >
                      {rl.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-1">
                      包含 {rl.count} 个视频/PPT模板
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${tempSelectedRLs.includes(rl.id) ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"}`}
                  >
                    {tempSelectedRLs.includes(rl.id) && (
                      <Check className="w-3 h-3 stroke-[3]" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end">
              <button
                onClick={() => {
                  setLinkedRLs(tempSelectedRLs);
                  setIsSelectRLModalOpen(false);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-md"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- RESOURCE LIBRARY MODAL (Step 2) --- */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[600px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 border border-indigo-200 rounded-xl flex items-center justify-center text-xl shadow-sm">
                  📂
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    挂载校本知识库素材
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    选取本地备课素材，辅助大模型生成。
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsResourceModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition border border-transparent hover:border-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm relative z-10">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索素材..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg text-xs pl-9 pr-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition shadow-inner"
                />
              </div>
            </div>
            <div className="flex-1 flex min-h-0 bg-slate-50">
              <div className="w-56 bg-white border-r border-slate-200 p-3 space-y-1 overflow-y-auto">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
                  数据来源分类
                </div>
                <button
                  onClick={() => setActiveCategoryFilter("kb")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-between ${activeCategoryFilter === "kb" ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>已关联知识库</span>
                  </div>
                  <span className="bg-white border border-slate-200 text-slate-500 px-1.5 rounded text-[10px]">
                    {linkedKBs.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveCategoryFilter("rl")}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-between mt-1 ${activeCategoryFilter === "rl" ? "bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4" />
                    <span>已关联资源库</span>
                  </div>
                  <span className="bg-white border border-slate-200 text-slate-500 px-1.5 rounded text-[10px]">
                    {linkedRLs.length}
                  </span>
                </button>
              </div>
              <div className="flex-1 p-5 overflow-y-auto bg-slate-50">
                {(activeCategoryFilter === "kb" && linkedKBs.length === 0) ||
                (activeCategoryFilter === "rl" && linkedRLs.length === 0) ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                    {activeCategoryFilter === "kb" ? (
                      <Database className="w-10 h-10 text-slate-300" />
                    ) : (
                      <Layers className="w-10 h-10 text-slate-300" />
                    )}
                    <p className="text-sm font-bold">
                      尚未关联
                      {activeCategoryFilter === "kb" ? "知识库" : "资源库"}
                    </p>
                    <p className="text-xs">请返回“规划大纲”步骤进行关联。</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {masterResourceLibrary
                      .filter((item) => {
                        if (activeCategoryFilter === "kb") {
                          return linkedKBs.includes(item.sourceId);
                        } else {
                          return linkedRLs.includes(item.sourceId);
                        }
                      })
                      .filter((item) =>
                        item.title
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()),
                      )
                      .map((file) => {
                        const isChecked = tempSelectedResources.includes(
                          file.id,
                        );
                        return (
                          <div
                            key={file.id}
                            onClick={() => toggleModalResource(file.id)}
                            className={`p-4 bg-white border rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition duration-200 ${isChecked ? "border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500/50 shadow-sm" : "border-slate-200 hover:border-indigo-300 shadow-sm"}`}
                          >
                            <div className="flex items-center space-x-4 min-w-0">
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl shrink-0 ${isChecked ? "bg-white shadow-sm" : "bg-slate-50 border border-slate-100"}`}
                              >
                                {file.type === "pdf"
                                  ? "📕"
                                  : file.type === "ppt"
                                    ? "📊"
                                    : file.type === "video"
                                      ? "🎬"
                                      : "📘"}
                              </div>
                              <div className="min-w-0">
                                <span
                                  className={`block text-sm font-bold truncate ${isChecked ? "text-indigo-900" : "text-slate-800"}`}
                                >
                                  {file.title}
                                </span>
                                <div className="flex items-center space-x-2 mt-1 text-[11px] text-slate-500 font-medium">
                                  <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                                    {file.size}
                                  </span>
                                  <span>•</span>
                                  <span>上传于: {file.date}</span>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 bg-white"}`}
                            >
                              {isChecked && (
                                <Check className="w-4 h-4 stroke-[3]" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-white flex justify-end shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-10">
              <button
                onClick={saveModalResources}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition shadow-md flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>完成挂载并返回</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

# AI Diary 项目目录结构脚手架

下面是推荐的 **前后端分离** 目录结构。  
建议第一版用：

- 前端：Next.js
- AI/业务后端：Python + FastAPI
- 可选网关：Go + Gin（第二阶段再加）
- 数据库：PostgreSQL
- 缓存/队列：Redis
- 对象存储：MinIO / S3

---

## 1）仓库结构

```bash
ai-diary/
├── README.md
├── docs/
│   ├── architecture.md
│   ├── api.yaml
│   └── database.sql
├── deploy/
│   ├── docker-compose.yml
│   ├── nginx/
│   │   └── default.conf
│   └── scripts/
│       ├── start.sh
│       └── migrate.sh
├── frontend/                    # Next.js 前端
│   ├── package.json
│   ├── next.config.js
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── login/page.tsx
│       │   ├── upload/page.tsx
│       │   ├── chat/[sessionId]/page.tsx
│       │   └── diaries/
│       │       ├── page.tsx
│       │       └── [diaryId]/page.tsx
│       ├── components/
│       │   ├── common/
│       │   │   ├── Header.tsx
│       │   │   ├── Footer.tsx
│       │   │   └── Loading.tsx
│       │   ├── upload/
│       │   │   ├── ImageUploader.tsx
│       │   │   └── ImagePreview.tsx
│       │   ├── chat/
│       │   │   ├── ChatWindow.tsx
│       │   │   ├── MessageList.tsx
│       │   │   ├── MessageInput.tsx
│       │   │   └── EndChatButton.tsx
│       │   └── diary/
│       │       ├── DiaryCard.tsx
│       │       ├── DiaryList.tsx
│       │       └── DiaryViewer.tsx
│       ├── lib/
│       │   ├── api.ts
│       │   ├── auth.ts
│       │   ├── websocket.ts
│       │   └── utils.ts
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useChat.ts
│       │   └── useDiaries.ts
│       ├── store/
│       │   └── appStore.ts
│       ├── styles/
│       │   └── globals.css
│       └── types/
│           ├── api.ts
│           ├── chat.ts
│           └── diary.ts
├── services/
│   ├── python-api/              # FastAPI 主后端
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── security.py
│   │   │   │   └── logging.py
│   │   │   ├── api/
│   │   │   │   ├── deps.py
│   │   │   │   └── v1/
│   │   │   │       ├── api.py
│   │   │   │       ├── auth.py
│   │   │   │       ├── uploads.py
│   │   │   │       ├── ai.py
│   │   │   │       ├── chat.py
│   │   │   │       └── diaries.py
│   │   │   ├── models/
│   │   │   │   ├── user.py
│   │   │   │   ├── image.py
│   │   │   │   ├── image_analysis.py
│   │   │   │   ├── chat_session.py
│   │   │   │   ├── chat_message.py
│   │   │   │   └── diary.py
│   │   │   ├── schemas/
│   │   │   │   ├── auth.py
│   │   │   │   ├── upload.py
│   │   │   │   ├── ai.py
│   │   │   │   ├── chat.py
│   │   │   │   └── diary.py
│   │   │   ├── services/
│   │   │   │   ├── image_service.py
│   │   │   │   ├── llm_service.py
│   │   │   │   ├── vision_service.py
│   │   │   │   ├── chat_service.py
│   │   │   │   ├── diary_service.py
│   │   │   │   └── storage_service.py
│   │   │   ├── db/
│   │   │   │   ├── base.py
│   │   │   │   ├── session.py
│   │   │   │   └── migrations/
│   │   │   ├── workers/
│   │   │   │   ├── tasks.py
│   │   │   │   └── queue.py
│   │   │   └── utils/
│   │   │       ├── time.py
│   │   │       └── response.py
│   │   ├── tests/
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── go-gateway/              # 可选：Gin 网关
│       ├── cmd/server/main.go
│       ├── internal/
│       │   ├── config/
│       │   ├── handler/
│       │   ├── middleware/
│       │   ├── service/
│       │   └── router/
│       ├── go.mod
│       └── Dockerfile
└── .env.example
```

---

## 2）模块职责建议

### frontend
负责：
- 登录注册
- 图片上传
- 聊天界面
- 日记历史列表
- 日记详情页展示

### python-api
负责：
- 用户认证
- 图片上传后元数据入库
- 调用多模态模型分析图片
- 保存会话消息
- 结束聊天时生成日记
- 提供日记 CRUD 接口
- WebSocket 实时聊天

### go-gateway（可选）
负责：
- API 网关
- 限流
- 统一鉴权
- 高并发上传入口
- 统一日志和 tracing

---

## 3）第一版建议最小可运行版本

你可以先只做这几个页面和接口：

### 页面
- `/login`
- `/upload`
- `/chat/[sessionId]`
- `/diaries`
- `/diaries/[diaryId]`

### 接口
- `POST /auth/login`
- `POST /uploads/images`
- `POST /ai/images/{image_id}/analyze`
- `POST /chat/sessions`
- `POST /chat/sessions/{session_id}/messages`
- `POST /chat/sessions/{session_id}/end`
- `GET /diaries`
- `GET /diaries/{diary_id}`

---

## 4）开发顺序建议

1. 先把数据库和对象存储打通
2. 完成图片上传
3. 接入图像理解模型
4. 做聊天接口
5. 做结束聊天生成日记
6. 再做历史列表和详情页
7. 最后补鉴权、限流、审计日志、部署

---

## 5）是否必须 Go + Python 一起上？

不是。

### 推荐方案 A：第一版
- 前端：Next.js
- 后端：FastAPI
- 数据库：PostgreSQL
- 缓存：Redis
- 存储：MinIO/S3

### 推荐方案 B：第二版扩展
- 前端：Next.js
- AI 后端：FastAPI
- 网关/上传服务：Go + Gin

这样复杂度更可控，也更适合个人或小团队先落地。

---

## 6）部署建议

### 开发环境
- macOS / Windows + Docker 都可以开发

### 测试 / 生产环境
- 建议 Linux
- 原因：
  - Docker / Nginx / Postgres / Redis / MinIO 更稳定
  - Python 和 Go 服务部署更常见
  - 服务器环境更标准

---

## 7）后续你可以继续补的文件

下一步最值得继续补的是：

- `docker-compose.yml`
- `FastAPI main.py`
- `SQLAlchemy 模型`
- `Gin 网关示例`
- `Next.js 页面骨架`
- `WebSocket 聊天示例`
```

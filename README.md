# 개발자 포럼

개발자들을 위한 지식 공유 및 토론 커뮤니티 플랫폼입니다.

## 기술 스택

- **Frontend**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth

## 프로젝트 구조

```
.
├── app/                    # Next.js App Router 페이지
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── lib/                   # 라이브러리 및 유틸리티
│   ├── supabase/         # Supabase 클라이언트 설정
│   ├── components/       # 공통 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   └── utils/           # 유틸리티 함수
├── store/               # 상태 관리
├── types/               # TypeScript 타입 정의
└── styles/              # 글로벌 스타일
```

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 주요 기능

- ✅ **기술 토론**: 최신 기술 트렌드와 개발 방법론 토론
- ✅ **문제 해결**: Q&A 커뮤니티를 통한 개발 문제 해결
- ✅ **지식 공유**: 개발 경험과 노하우 공유
- 🚧 **사용자 인증**: Supabase Auth를 통한 회원가입/로그인 (예정)
- 🚧 **게시글 작성**: 마크다운 기반 게시글 작성 (예정)
- 🚧 **댓글 시스템**: 실시간 댓글 및 답글 기능 (예정)

## 개발 가이드라인

이 프로젝트는 다음 가이드라인을 따릅니다:

- **App Router 우선 사용**: Next.js 13+ App Router 활용
- **Route Handler 우선**: API 엔드포인트는 Route Handler로 구현
- **TypeScript 필수**: 모든 컴포넌트와 서버 로직에 TypeScript 적용
- **인터페이스 'I' 접두사**: TypeScript 인터페이스는 'I' 접두사 사용
- **페이지별 폴더 구조**: 각 페이지는 독립적인 components/, hooks/ 폴더 구조

## 빌드 및 배포

### 빌드

```bash
npm run build
```

### 시작

```bash
npm start
```

## 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -m 'feat: 새로운 기능 추가'`)
4. 브랜치에 푸시합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

## 커밋 메시지 규칙

```
<type>: <subject>

<body>
```

**타입:**
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가
- `chore`: 빌드 업무 수정

## 라이선스

MIT License
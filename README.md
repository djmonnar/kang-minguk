# 국회의원 강민국 공식 의정활동 홈페이지 MVP

경남 진주시을 국회의원 강민국의 공식 의정활동 홈페이지 MVP입니다. 인물 중심 히어로, 진주 소통지도, 정책현황, 최근 의정활동, 미디어, 민원·제안 섹션으로 구성했습니다.

## 기술 스택

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- JSON mock data
- Mock map component

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 확인합니다.

## 주요 구조

- `app/page.tsx`: 전체 페이지 조합
- `components/JinjuMapSection.tsx`: 지도 필터, mock pin, 상세 패널
- `data/activities.json`: 지도와 최근 활동 데이터
- `data/policies.json`: 정책 카드 데이터
- `data/news.json`: 보도자료와 미디어 데이터
- `lib/data.ts`: JSON 타입과 공통 상수
- `lib/images.ts`: 홈페이지 이미지 경로 매핑
- `public/images`: 실제 PNG 이미지 배치 폴더

## 이미지 파일

아래 파일을 `public/images` 안에 넣으면 화면에 바로 연결됩니다.

- `히어로.png`: 메인 인물 히어로
- `히어로카드뉴스.png`: 히어로 하단 가로형 카드뉴스 이미지
- `시장인사.png`: 시장 방문, 주민 인사, 생활 현장 카드
- `민원.png`: 민원·간담회 카드
- `진주.png`: 진주 전경 및 지역 이미지
- `철도.png`: 철도·교통 인프라 정책 이미지
- `항공.png`: 우주항공산업 정책 이미지
- `국회.png`: 국회·의정활동 이미지
- `현장.png`: 현장방문 이미지

## 지도 교체 메모

현재 지도는 `lat`, `lng`를 mock canvas 영역에 정규화해서 표시합니다. 실제 지도 API로 교체할 때는 `JinjuMapSection` 내부의 지도 배경과 `pinPosition` 렌더링 부분만 네이버지도 또는 카카오맵 컴포넌트로 대체하면 됩니다. 활동 데이터 구조는 그대로 유지할 수 있습니다.

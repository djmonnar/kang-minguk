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

## GitHub Pages 배포

`main` 브랜치에 푸시하면 GitHub Actions가 정적 사이트를 빌드해서 GitHub Pages에 배포합니다.

- 배포 주소: `https://djmonnar.github.io/kang-minguk`
- 로컬 빌드: `npm run build`
- GitHub Pages 빌드는 `GITHUB_PAGES=true` 환경에서 `/kang-minguk` base path를 적용합니다.

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

- `hero.png`: 메인 인물 히어로
- `hero-card-news.png`: 히어로 하단 가로형 카드뉴스 이미지
- `market-greeting.png`: 시장 방문, 주민 인사, 생활 현장 카드
- `civil-complaint.png`: 민원·간담회 카드
- `jinju.png`: 진주 전경 및 지역 이미지
- `rail.png`: 철도·교통 인프라 정책 이미지
- `aerospace.png`: 우주항공산업 정책 이미지
- `assembly.png`: 국회·의정활동 이미지
- `field.png`: 현장방문 이미지

## 지도 교체 메모

현재 지도는 `lat`, `lng`를 mock canvas 영역에 정규화해서 표시합니다. 실제 지도 API로 교체할 때는 `JinjuMapSection` 내부의 지도 배경과 `pinPosition` 렌더링 부분만 네이버지도 또는 카카오맵 컴포넌트로 대체하면 됩니다. 활동 데이터 구조는 그대로 유지할 수 있습니다.

## 네이버 지도 API 적용 메모

실제 지도는 네이버 클라우드 플랫폼에서 Maps JavaScript API를 발급받아 연결하면 됩니다.

1. 네이버 클라우드 플랫폼에서 Maps API 애플리케이션 생성
2. Web 서비스 URL에 배포 도메인 등록: `https://djmonnar.github.io`
3. Client ID를 환경 변수로 관리: `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`
4. `components/NaverMap.tsx`가 네이버 Maps JavaScript SDK를 불러오고 활동 마커를 표시
5. 기존 `activities.json`의 `lat`, `lng` 좌표를 그대로 마커 데이터로 사용

브라우저에서 쓰는 Maps JavaScript API의 Client ID는 공개될 수 있는 값입니다. 관리자 Secret Key는 프론트엔드 코드나 GitHub 저장소에 넣지 않아야 합니다.

현재 기본 Client ID는 `lib/naverMap.ts`에 설정되어 있습니다. 운영 환경에서 별도 값을 쓰려면 빌드 시 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`를 지정하면 됩니다.

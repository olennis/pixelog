# Pixel Log

연간 목표 달성을 시각적으로 추적하는 크롬 익스텐션입니다.

## 주요 기능

- **연간 캘린더 뷰**: 12개월 × 31일 그리드로 한 해를 한눈에 조망
- **목표 관리**: 색상별 목표 설정 및 진행률 추적
- **수치 기반 목표**: "1000km 달리기" 같은 정량적 목표 지원
- **다크/라이트 모드**: 테마 전환 지원
- **줌 기능**: 스크롤로 캘린더 확대/축소
- **로컬 저장**: 모든 데이터는 브라우저 localStorage에 저장

## 설치 방법

### 개발 환경

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 빌드 + zip 생성
pnpm zip
```

### 크롬 익스텐션으로 설치

1. `pnpm zip` 실행하여 `pixelog.zip` 생성
2. 크롬에서 `chrome://extensions` 접속
3. 우측 상단 "개발자 모드" 활성화
4. "압축해제된 확장 프로그램을 로드합니다" 클릭
5. `dist` 폴더 선택

설치 후 새 탭을 열면 Pixel Log가 표시됩니다.

## 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (상태 관리)
- Radix UI (Dialog, Popover)

## 라이선스

MIT

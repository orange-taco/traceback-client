# TRACEBACK 프론트엔드 규칙

이 저장소는 TRACEBACK 고객용 프론트엔드를 담고 있다.

## 작업 전

- 프론트엔드 작업 전 `docs/brand-concept.md`를 읽는다.
- 라우트, 레이아웃, 노출 문구를 바꾸기 전 `docs/wireframe.md`를 읽는다.
- 작업 브랜치는 기준 브랜치에서 만들고 기존 사용자 변경사항을 보존한다.
- 사용자가 직접 다르게 지시하지 않는 한 PR base branch는 항상 `development`로 둔다.
- 기능 범위 안에서 변경하며, 같은 기능의 API 연결과 UI 변경은 함께 진행할 수 있다.

## 제품 방향

- TRACEBACK은 일반 쇼핑몰이 아닌 관찰 기반의 시각 아카이브다.
- Store, Archive, Product Detail, Cart, Checkout, Order Tracking은 비회원으로 사용할 수 있어야 하며, 백엔드가 요구하지 않는 한 장바구니·결제·주문 조회를 인증에 종속시키지 않는다.
- 인증은 선택적인 고객 기능이며 로그인 우선 구조로 만들지 않는다. 백엔드가 요구할 때만 쿠키 기반 세션을 사용한다.
- 브랜드 중심 라벨과 아카이브 메타데이터는 영어를 사용하고, 고객 안내·구매 판단·오류·정책·거래 문구는 한국어를 사용한다.
- 백엔드 계약이 다르게 정하지 않는 한 가격은 KRW로 표시하고 최종 금액은 백엔드 값을 사용한다.

## React Router

- 애플리케이션의 기본 구조로 React Router v8 framework mode를 사용한다.
- 라우트 모듈은 `app/routes`에서 얇게 유지하고 페이지 본문은 `app/features/*/pages`에 둔다.
- 라우트 소유 데이터, 제출, 대기 상태, 재검증에는 loader·action·fetcher를 우선 사용한다.
- loader/action은 해당 페이지 가까이에 두고 API 호출은 feature API helper에 위임한다. JSX에서 직접 `fetch`하지 않는다.
- 흐름 전환은 일반 네비게이션을 사용하고 현재 라우트에 머물러야 하는 작업은 fetcher를 사용한다.
- 캐시 계층이나 로컬 로딩 상태를 추가하기 전에 React Router 재검증과 navigation state를 우선 검토하며, 실제 필요가 생기면 다른 도구를 리서치하고 기록한다.
- 롤백과 서버 재동기화가 명확하지 않으면 상거래 핵심 흐름에 optimistic UI를 추가하지 않는다.
- 사용자에게 노출되는 product, archive, checkout, order 페이지에는 사실 중심의 route metadata를 설정한다.

## DRF API

- DRF/OpenAPI 스키마와 serializer 응답을 백엔드 계약이자 기준으로 삼는다.
- 공통 요청 래퍼는 `app/lib/api-client.ts`, 기능별 endpoint는 `app/features/*/api.ts`에 두며 API helper는 렌더링·라우팅·컴포넌트 상태와 분리한다.
- 스키마에 적힌 경로를 그대로 사용하고 프론트 전용 endpoint 별칭을 만들지 않는다.
- 실패 응답은 타입이 있는 request error로 전달한다.
- 별도 화면 형태가 필요하지 않으면 serializer 형태를 직접 사용하고, 변환은 해당 feature 안에서 처리한다.
- 생성 코드는 별도로 관리하고 직접 수정하지 않는다. 도입하더라도 생성 클라이언트는 feature API helper로 감싼다.
- 환경별 API 값은 환경변수로 관리하며 비밀값이나 민감한 고객·결제 데이터를 클라이언트 상태와 localStorage에 노출하지 않는다.
- 요청 오류를 필드 메시지, 요청 영역 오류, 리다이렉트, route error boundary 중 무엇으로 보여줄지는 route/action이 결정한다.

## 상태와 구조

- UI 상태는 소유한 route 또는 컴포넌트에 두고, 공유할 필터·정렬·페이지·검색은 URL 파라미터에 두며 전역 클라이언트 상태를 추가하기 전 리서치하고 기록한다.
- 여러 기능에서 안정적으로 공유하는 UI primitive만 `app/components`, 기능 간 유틸리티만 `app/lib`에 둔다.
- 타입은 소유 코드 가까이에 두고 실제 재사용이 생길 때만 공용으로 올린다.
- 실제 DRF endpoint가 생기기 전까지 mock data는 feature 안에 두고, 연결 시 제거하거나 교체한다.
- 프론트 라우트는 `docs/wireframe.md`에 맞춘 사용자 중심 경로로 만들며 백엔드 API 경로를 그대로 복제하지 않는다.

## 컴포넌트와 스타일

- 기본 스타일링은 Tailwind와 명시적인 feature 마크업으로 한다.
- 실제 재사용이나 의미 있는 동작 분리가 있을 때만 작고 도메인이 드러나는 컴포넌트로 추출한다. 페이지 factory와 범용 master layout은 만들지 않는다.
- semantic HTML, label, focus 상태, 키보드 접근성, 의미 있는 alt text를 사용한다.
- 문서에 정의된 건조한 아카이브 톤을 유지한다: 절제된 색상, 얇은 선, 모노스페이스 메타데이터, 기록물 같은 레이아웃, 명확한 구매 액션.
- 구체적인 UI 스타일과 레이아웃은 변경 가능하게 두며, route나 데이터 구조와 충돌하는 정적 HTML은 그대로 복사하지 않는다.
- shadcn이나 Radix는 기본 도입하지 않는다. 올바르게 구현하는 비용이 큰 접근성 primitive가 필요할 때만 해당 primitive를 도입하고 스타일은 맞춰 조정한다.

## 폼과 상거래

- semantic HTML form과 React Router action을 우선 사용하고, 검증이나 상호작용의 복잡성이 도입을 정당화할 때만 폼 라이브러리를 사용한다.
- 필수값 같은 즉각적인 확인은 클라이언트에서 처리하되 API 규칙의 최종 기준은 DRF serializer validation이다.
- 필드 오류는 해당 입력 근처에, 요청 오류는 제출 영역 근처에 표시하며 구체적인 스타일은 UI 결정으로 남긴다.
- 장바구니 저장 방식은 DRF 장바구니 계약이 정해진 뒤 결정한다.

## 검증

- TypeScript 변경 후 typecheck를 실행하고 dependency·router·framework 변경 후 build를 실행한다.
- 뼈대만을 위해 테스트 프레임워크를 추가하지 않으며, 로직·매핑·상거래 동작이 복잡해질 때 대상 테스트를 추가한다.
- UI 작업은 가능한 경우 Playwright 또는 인앱 브라우저로 관련 비회원 흐름을 데스크톱과 모바일에서 성공·예상 오류 상태까지 확인한다.
- 모바일 검증에는 iPhone 15와 iPhone 17 기기 또는 viewport profile을 포함한다. 도구에 정확한 preset이 없으면 이름을 붙인 equivalent viewport를 사용하고 검증 기록에 치수를 남긴다.

## 보류 결정

- SEO metadata, social preview, structured data, sitemap 전략은 별도 후속 작업으로 결정한다.
- DRF 스키마가 실제로 사용할 수 있을 만큼 안정된 뒤 generated API client 도구를 결정한다.

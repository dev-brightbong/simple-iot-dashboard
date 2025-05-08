# Simple IoT Dashboard

## 기술스택
  - based by Core UI React Admin Template
  - JavaScript
  - React.js (v19)
  - tanstack/react-query (v5)

## 실행 방법

  ```bash
  pnpm install # 의존성 설치
  pnpm run dev # 개발 서버 실행

  pnpm build # 빌드
  pnpm serve # 프로덕션 실행
  ```

## 구현기능
  - 로그인
  - 디바이스 상태 조회
  - 전구 밝기 제어

## 스크린샷
![device-status-daashboard](https://github.com/user-attachments/assets/f64dad0e-1085-4f44-81a6-e8c334b2b170)

![bulb-control](https://github.com/user-attachments/assets/7f6cb958-5dd9-4766-94d6-a18f8d4bc38d)


## 폴더구조

- 기존 템플릿에서 추가된 폴더는 (추가) 표시했습니다.

```bash
coreui-free-react-admin-template
├── public/          # static files
│   ├── favicon.ico
│   └── manifest.json
│
├── src/             # project root
│   ├── apis/        # API (추가)
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components - header, footer, sidebar, etc.
│   ├── contexts     # 전역 컨텍스트 (추가)
│   ├── layouts/     # layout containers
│   ├── scss/        # scss styles
│   ├── utils        # 공통 utils (추가)
│   ├── views/       # application views
│   ├── _nav.js      # sidebar navigation config
│   ├── App.js
│   ├── index.js
│   ├── routes.js    # routes config
│   └── store.js     # template state example 
│
├── index.html       # html template
├── ...
├── package.json
├── ...
└── vite.config.mjs  # vite config
```

## 아키텍처 및 설계방식
- 클래스 기반 API 모듈
  - 각 API 서비스를 클래스로 구현하여 관련 기능을 논리적으로 그룹화하고, 확장성을 고려했습니다.
- 관심사 분리
  - 커스텀 훅, 유틸리티 함수 등을 통해 비즈니스 로직과 UI를 명확하게 분리했습니다.

## 구현기능 설명

  ### 로그인
  - localStorage와 ContextAPI를 결합한 AuthContext를 이용해 사용자 인증정보를 확인합니다.
  - UserStorage 클래스를 통해 인증 정보 저장 방식을 추상화하여 확장성을 높였습니다.
  - 로그인 시 API-1(로그인)를 통해 사용자 정보를 검증하며, 실패 시 에러 메시지를 표시합니다.

  - **관련 파일**
    - `src/Apps.js` - 인증 상태에 따른 라우팅 로직 
    - `src/views/login/Login.js` - 로그인 UI 및 로직
    - `src/apis/auth/auth.api.js` - 인증 API
    - `src/contexts/AuthContext.js` - 인증 상태 관리
    - `src/utils/local-storage/user-storage.js` - 토큰 저장소

  ### 디바이스 상태 조회
  - CoreUI의 라인차트를 이용해 `wh40batt`, `baromrelin`, `soilad1`, `rainratein` 데이터를 시각화했습니다.
  - react-query를 이용해 API-2(디바이스 상태 key 조회)와 API-3(디바이스 상태 value 조회) 데이터를 interval값을 이용해 갱신합니다.

    #### react-query를 사용한 이유
    - 대시보드는 실시간 데이터 갱신이 필수적이기 때문에, react-query의 `refetchInterval` 옵션을 활용해 데이터 폴링을 구현했습니다.
    - setInterval 등으로 폴링을 직접 구현할 경우, 상태 관리, 에러 처리, 언마운트 시 cleanup 등 부가적인 코드가 많아지고, 유지보수가 어려워지는 단점이 있습니다.
    - 번들 사이즈 측면에서 tree-shaking이 잘되는 경량라이브러리라, 전체 프로젝트에 미치는 영향은 제한적일것이라 생각했습니다.
  
  - **관련 파일**
    - `src/views/dashboard/Dashboard.js` - 대시보드 UI
    - `src/views/dashboard/hooks/useDeviceStatus.js` - 디바이스 상태 커스텀 훅
    - `src/views/dashboard/utils/dashboard-utils.js` - 데이터 변환 및 포맷팅
    - `src/apis/plugins/plugins.api.js` - 디바이스 API

  ### 전구 밝기 제어
  - 슬라이더 UI를 통해 전구의 밝기를 0~100% 범위에서 조절할 수 있습니다.
  - 슬라이더를 움직이면 전구 아이콘의 색상과 밝기가 실시간으로 변경되어, 현재 밝기 상태를 직관적으로 확인할 수 있습니다.
  - 슬라이더 조작이 끝나는 시점에 API-4(디바이스 상태 value 제어)를 호출합니다. 드래그 중 불필요한 다수의 API요청을 방지했습니다.
  - API 호출에 실패하면 사용자에게 에러 메시지를 표시합니다.

  - **관련 파일**
    - `src/views/dashboard/BrightnessControl.js` - 밝기 제어 컴포넌트
    - `src/apis/plugins/plugins.api.js` - 디바이스 API

  #### 모든 API에 react-query를 사용하지 않은 이유
  - 로그인, 밝기 제어 기능은 실시간 갱신이나 캐싱이 필요하지 않고, 사용자의 명시적 액션으로만 동작하여 사용하지 않았습니다.
  - 각 기능의 요구사항에 맞는 최적의 도구를 선택하는 것이 더 중요하다고 판단하여, 실시간 데이터가 필요한 대시보드에만 react-query를 적용했습니다.
  - 이를 통해 불필요한 코드 복잡도를 줄이고 개발 및 유지보수 효율성을 높였습니다.

## 개선 및 회고

#### TypeScript 적용
- TypeScript를 적용하여 타입 안정성을 확보하고 컴파일 과정에서 오류를 조기에 발견할 수 있었을 것입니다. 
- 초기 TypeScript 적용을 시도했으나, 기존 템플릿과의 호환성 문제로 과제의 핵심 요구사항 구현에 집중했습니다.
- 향후에는 처음부터 TypeScript 기반으로 설계하는 것이 좋을 것 같습니다.

#### 인증 체계 개선
- 토큰갱신 API가 존재했다면, refreshToken을 활용해 인증정보 갱신을 추가해 보안성과 사용자 경험을 개선할수 있었을것 같습니다.

#### 상태 관리 최적화
- 현재는 Context API를 사용하고 있지만, 애플리케이션이 더 복잡해진다면 Zustand 같은 경량 상태 관리 라이브러리를 도입하여 상태 업데이트의 성능을 개선할 수 있을것 같습니다.

#### 에러 처리
- 현재는 alert로 서버로부터 받는 기본적인 에러 메시지만 표시하고 있지만, 에러 유형별로 더 상세한 처리와 에러코드 모듈화, UI개선을 통해 사용자 경험을 향상시킬 수 있을것 같습니다.

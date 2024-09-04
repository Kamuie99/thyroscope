# 사용자 관리 애플리케이션

이 프로젝트는 사용자를 등록, 수정, 삭제할 수 있는 간단한 사용자 관리 애플리케이션입니다. React와 상태 관리 라이브러리인 Zustand를 사용하여 상태를 관리하고, 사용자 인터페이스는 스타일드 컴포넌트(Styled-Components)를 사용하여 구현되었습니다.

## 설치 및 실행 방법

이 프로젝트를 클론한 후, 필요한 패키지를 설치하고 로컬 서버를 실행하려면 다음 명령어를 사용하세요:

1. 패키지 설치:

   ```bash
   npm install
   ```

2. 애플리케이션 실행:
   ```bash
   npm start
   ```


로컬 개발 서버가 실행되며, 브라우저에서 http://localhost:3000으로 이동하면 애플리케이션을 확인할 수 있습니다.

## 요구사항
이 프로젝트는 다음과 같은 요구사항을 만족합니다:

### 화면의 레이아웃 및 스타일

애플리케이션의 기능을 판단하기에 무리가 없을 정도로 구현되었습니다.
폰트, 색상, margin, width 등이 요구사항과 완전히 동일할 필요는 없습니다. 필요한 정도로만 구현되었습니다.

### 앱의 기능

사용자 출력, 등록, 수정, 삭제 기능을 포함합니다.
사용자 등록 및 수정 시 Input 유효성 검증이 포함되어 있습니다.
동일한 email의 사용자를 등록/수정할 수 없습니다. 이미 등록된 이메일로 새로운 사용자를 추가하거나 기존 사용자를 수정하려고 하면 에러가 발생합니다.
유효하지 않은 입력값을 방지하기 위해 다음 정규식을 사용합니다:
```bash
username, nickname: /^[가-힣a-zA-Z\s\d]{3,15}$/
```
```bash
email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

### 기타 기능

- 페이지네이션: 사용자가 많은 경우 페이지네이션 기능을 통해 한 번에 5명씩 사용자 목록을 보여줍니다.
- 검색 기능: username으로 사용자를 검색할 수 있습니다.
- 정렬 기능: 테이블 헤더를 클릭하여 username, email, nickname, gender 별로 오름차순/내림차순으로 정렬할 수 있습니다. 

## 사용된 라이브러리

- React 관련 라이브러리 사용: zustand를 사용하여 상태 관리를 구현하였습니다.
- styled-components를 사용하여 컴포넌트의 스타일을 관리하고 있습니다.

## 코드 가독성

적절한 추상화, 변수 네이밍, 컴포넌트 분리를 통해 코드 가독성에 신경 썼습니다.

### 사용된 주요 기술 스택
- React: 사용자 인터페이스를 구성하기 위해 사용되었습니다.
- Zustand: 상태 관리를 위해 사용된 경량 상태 관리 라이브러리입니다.
- Styled-Components: 컴포넌트 기반으로 스타일을 작성하기 위해 사용되었습니다.

## 기여 방법
이 프로젝트에 기여하고 싶다면 포크를 뜨고 Pull Request를 보내주세요. 
이슈가 있거나 개선사항이 있다면 언제든지 Issues에 등록해 주시기 바랍니다.

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 LICENSE 파일을 참조하세요.
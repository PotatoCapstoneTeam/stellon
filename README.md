# STELLON

![image](https://user-images.githubusercontent.com/62019493/216758197-7788b339-4f62-47ab-a86d-bd82432f9bc1.png)

## demo
https://www.stellon.io


## 개발 목표

웹 기반 게임으로 방향을 정했으며 최대 4 VS 4 까지 가능한 데스매치 슈팅 게임입니다. 웹 게임인 만큼 접근성을 쉽게 하기 위해 간단한 회원가입만 마치면 누구나 즐길 수 있는 게임을 기획했습니다.

## 기술 스택

### Common

- NX: monorepo 관리 툴

### Client & Game

- Node.js
- Typescript
- React
- Three.js
- Phaser: Game Engine

### Server

- Spring boot JPA
- QueryDSL
- H2 Hibernate (Local ver.)
- Postman
- AWS
  - AWS EC2
  - AWS S3
  - AWS RDS
  
## Stellon 프로젝트 개요도

> ![프로젝트 전체 조직도](https://user-images.githubusercontent.com/84797433/206188980-fd443e45-7c1b-41d6-8704-c582d05285d0.PNG)
<br/>

- Client ↔ Main Server 동작표 <br/>

> <img width="460" alt="프론트, 백엔드 도식도" src="https://user-images.githubusercontent.com/84797433/206220108-9381f474-85b6-4ed3-940a-fc75e5a86277.png"><img width="380" alt="웹소켓 기능" src="https://user-images.githubusercontent.com/84797433/206245417-722fba53-5dae-489d-984e-caf4f5380fc1.png">
<br/>

- 게임 시작 시 동작표 <br/>

> ![202321310-f95f1091-7891-4a6c-8b15-3b130ce95d4d](https://user-images.githubusercontent.com/84797433/206259148-236ade0c-5e76-4f83-98b5-1fef01c3f191.jpeg)


## 📋 파트별 주요 기능

### Client

- 우주 배경

> ![image](https://user-images.githubusercontent.com/62019493/206273190-b0e9c713-cc2e-4b35-a8c0-a5a66c132595.png)

- 인트로 페이지 

> ![signup final](https://user-images.githubusercontent.com/112596811/206267627-f467b349-cf3c-4e43-bf70-298762924164.png)
>
> - React-Hook-Form을 이용하여 렌더링 및 코드 최적화 
> - 정규식과 Hook-Form라이브러리를 이용하여 유효성 검사

- 로비 페이지

> ![로비](https://user-images.githubusercontent.com/112596811/206268836-4b4aa827-3e3b-4208-94f1-bb593ee522d0.png)


- 게임룸 

> ![image](https://user-images.githubusercontent.com/62019493/206273919-76f5db11-747b-46a4-8b99-93c4b54ed7f6.png)

- 배포

> ### S3의 정적 웹 사이트 호스팅 기능을 사용 <br />
> ### S3 + CloudFront + Route53 연동

### Main Server
<br/> 

> <img width="400" alt="파트별 백엔드 자료" src="https://user-images.githubusercontent.com/84797433/206254307-a13a530c-61e5-466c-ba35-df1a5ef5336f.png"> <img width="400" alt="백엔드 DB" src="https://user-images.githubusercontent.com/84797433/206256005-fa2e28d4-cef5-4efd-8b7d-f69314586abd.png"><br/>

* 위 타입 중 <b>가장 중요한 START 타입</b>을 받으면 아래처럼 실행된다.
  1. 인원 수를 확인 후 짝수일 경우 실행, 아닐 시 인원 수를 체크해달라고 메시지를 보낸다.
  2. 게임이 시작되면 RestTemplate를 통해 게임 서버로 방 id, 유저 정보, callback 주소 등을 담아서 보낸다.
  3. 게임 서버에 데이터가 잘 도착하면 Response로 Stage id와 유저 id 및 시크릿 코드를 메인 서버로 보낸다.
  4. 메인 서버는 위 데이터를 잘 받은 뒤 Client에게 각 유저마다 해당하는 시크릿 코드를 보내준다.
  5. 게임이 끝나면 게임 서버가 메인 서버의 RESTful API를 호출하여 결과 데이터를 보내준다. 메인 서버는 이것을 DB에 저장하고 종료된다.<br/>
     
### Game

- Room & Stage

<img width="544" alt="image" src="https://user-images.githubusercontent.com/12953393/206333288-1444b000-0f69-43c8-bcca-72238784e21b.png">

기존 구조

<img width="864" alt="image" src="https://user-images.githubusercontent.com/12953393/206294306-e7ace826-8c4c-48ab-bb4c-18924d2e984c.png">

현재 구조

- 통신

```ts
export type JoinEvent = {
  //
};

export type InputEvent = {
  horizontalAxis: number;
  verticalAxis: number;
  fire: boolean;
};

export type ClientEventMap = {
  join: JoinEvent;
  input: InputEvent;
};

emit<K extends keyof ClientEventMap>(name: K, event: ClientEventMap[K]) {
  this.channel?.emit(name, event);
}

on<K extends keyof ServerEventMap>(
  name: K,
  callback: (event: ServerEventMap[K]) => void
) {
  this.channel?.on(name, callback as any);
}
```

<img width="342" alt="image" src="https://user-images.githubusercontent.com/12953393/206328131-5c9e4bc9-f7ba-4bf0-8bf3-cc40abbb9bae.png">

메인 서버와 연동 전 진행한 통신 부분 리팩토링. 라이브러리 의존성을 정리하여 후에 쉽게 변경하도록 함. Typescript를 적극 활용하여 이벤트 네임에 따라 페이로드 타입을 확인할 수 있도록 함.

- 동기화
<img width="515" alt="image" src="https://user-images.githubusercontent.com/12953393/206290138-43d7aaa7-f3d6-4802-8cdd-11f693dd1803.png">

- 직렬화 & 역직렬화
```ts
export class Player extends Entity {
  serialize(): EntityData {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      angle: this.angle,
      nickname: this.nickname,
      team: this.team,
      speed: this.speed,
      angularSpeed: this.angularSpeed,
      hp: this.hp,
    };
  }

  deserialize(data: EntityData) {
    this.x = +(data['x'] ?? this.x);
    this.y = +(data['y'] ?? this.y);
    this.angle = +(data['angle'] ?? this.angle);
    this.nickname = data['nickname'] + '';
    this.team = data['team'] === 'RED_TEAM' ? 'RED_TEAM' : 'BLUE_TEAM';
    this.speed = +(data['speed'] ?? this.speed);
    this.angularSpeed = +(data['angularSpeed'] ?? this.angularSpeed);
    this.hp = +(data['hp'] ?? this.hp);
  }
}
```

모든 Entity는 위 함수 두개를 구현하고 있음. Scene를 동기화 할 때 활용 함.

## 🍀 개선사항
- 맵 정보 업데이트
- 도움말, 오디오 모달
- 클릭이나 커서 움직임에 따라 인터렉티브한 화면 구현
- 시작 두번 연속 클릭 시 에러 -> 디바운싱이나 스로틀링으로 제어 가능??..
- ***게임 퀄리티 상승***

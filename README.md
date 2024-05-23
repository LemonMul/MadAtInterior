Mad At Interior

# 실행 순서

1. npm install 과 pip install -r requirements.txt 둘 다 진행해서 필요한 파일 모두 다운
2. \FlaskApps 폴더 위치에서 cmd 열고, python weather.py 실행 (날씨 기반 추천 실행)
3. \FlaskApps 폴더 위치에서 cmd 열고, python svd.py 실행(사용자 맞춤 추천 실행)
4. 이전에 실행한 cmd 창에서 'Running on http:// 192. ~ ' 이 log에서 본인의 private ip address 확인 후
5. flask.config.ts 파일에 본인의 ip address로 변경
6. \MadAtInterior 위치에서 cmd 열고 npx expo start --clear 실행

# 패키지 다운로드

pip install -r requirements.txt

# 포트 번호

weather.py: port=5001
svd.py: port=5002
gu.py: port=5003

# 파이선 버전

Python 3.12.3

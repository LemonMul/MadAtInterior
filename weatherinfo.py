from flask import Flask, render_template, jsonify, request
import requests
from lxml import etree
from flask_cors import CORS
import pandas as pd  

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('weather.html')

@app.route('/weather', methods=['GET'])
def get_weather_info():
    base_date = '240504' 
    base_time = '1220'   
    nx = 60    
    ny = 127

    # 초단기실황데이터 API URL and parameters
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params = {
        'serviceKey': 'sX3JWddMWHJxC43fx9mqgcqSsbmAlTpoFTUPbnrE1Db5uVnEAs7gJIL4Z3tzW1u2S6UC+8/go3xYCnG2wDctAQ==',
        'pageNo': '1',
        'numOfRows': '1000',
        'dataType': 'XML',
        'base_date': base_date,
        'base_time': base_time,
        'nx': nx,
        'ny': ny
    }

    response = requests.get(url, params=params)
    root = etree.fromstring(response.content)

    # 데이터 파싱 및 추출
    rain = root.xpath('//obsrValue/text()')[0] # 강수
    temp = root.xpath('//obsrValue/text()')[3] # 기온

    mapping = {
        '0': "비가 오고 있지 않습니다.",
        '1': "비 소식이 있습니다.",
        '2': "비 또는 눈이 내립니다.",
        '3': "눈이 오고 있습니다.",
        '4': "소나기가 옵니다.",
        '5': "빗방울이 떨어집니다.",
        '6': "빗방울과 눈날림이 있습니다.",
        '7': "눈날림이 있습니다."
    }

    rain = mapping.get(rain, "정보 없음")  # Fallback to "정보 없음" if key not found

    # 초단기예보데이터
    url2 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
    response2 = requests.get(url2, params=params)
    root2 = etree.fromstring(response2.content)

    # 엘리먼트 선택
    items = root2.xpath('//item')

    # 딕셔너리로 만들기
    data = [{
        "baseDate": item.findtext("baseDate"),
        "baseTime": item.findtext("baseTime"),
        "category": item.findtext("category"),
        "fcstDate": item.findtext("fcstDate"),
        "fcstTime": item.findtext("fcstTime"),
        "fcstValue": item.findtext("fcstValue"),
        "nx": item.findtext("nx"),
        "ny": item.findtext("ny")
    } for item in items]

    # 데이터프레임으로 만들기
    df = pd.DataFrame(data)
    df = df[df['fcstDate'] == df['baseDate']]  # 오늘 예측 값만

    sky_dict = {
        '1': "맑음",
        '2': "구름조금",
        '3': "구름많음",
        '4': "흐림"
    }

    # 30분 뒤 하늘 상태는
    df = df[df['category'] == 'SKY']['fcstValue'].map(sky_dict)
    sky = df.values[0] if not df.empty else "정보 없음"

    return jsonify({'rain': rain, 'temp': temp, 'sky': sky})
    # print(sky,rain,temp)

if __name__ == '__main__':
    app.run(debug=True)

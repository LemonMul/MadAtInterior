from flask import Flask, request, jsonify
import requests
from lxml import etree

app = Flask(__name__)

@app.route('/weather', methods=['GET'])
def get_weather_info():
    base_date = request.args.get('base_date')
    base_time = request.args.get('base_time')
    nx = request.args.get('nx')
    ny = request.args.get('ny')

    # 초단기실황데이터
    url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst'
    params = {
        'serviceKey': 'YOUR_SERVICE_KEY_HERE',
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
    rain = root.xpath('//obsrValue/text()')[0]  # 강수
    temp = root.xpath('//obsrValue/text()')[3]  # 기온

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
    rain = mapping.get(rain, "정보 없음")

    # 초단기예보데이터 추가
    url2 = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst'
    response2 = requests.get(url2, params=params)
    root2 = etree.fromstring(response2.content)

    # 데이터 추출 및 하늘 상태 분류
    sky_codes = root2.xpath('//item[category="SKY"]/fcstValue/text()')
    sky_dict = {
        '1': "맑음",
        '2': "구름조금",
        '3': "구름많음",
        '4': "흐림"
    }
    sky = sky_dict.get(sky_codes[0], "정보 없음") if sky_codes else "정보 없음"

    return jsonify({'rain': rain, 'temp': temp, 'sky': sky})

if __name__ == '__main__':
    app.run(debug=True)

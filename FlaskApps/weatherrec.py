# weatherrec.py
import requests
import pandas as pd
import numpy as np
from haversine import haversine

def get_place_recommendation(my_loc, sky, rain, temp):
    park_name, lib_name, muse_name = None, None, None
    park_lat, lib_lat, muse_lat = None, None, None
    park_long, lib_long, muse_long = None, None, None
    park_adres, lib_adres, muse_adres = None, None, None

    if (sky in ['맑음', '흐림']) and (rain == '강수없음') and (15 <= float(temp) <= 29):
        # 공원 정보 불러오기 및 추천 로직
        park_url = 'http://openAPI.seoul.go.kr:8088/57524f76506d656e3732636a52457a/json/SearchParkInfoService/1/1000/'
        park_response = requests.get(park_url)
        park_data = park_response.json()['SearchParkInfoService']['row']
        park = pd.DataFrame(park_data)
        park.rename(columns={'P_PARK': "NAME", 'P_ADDR': "ADRES", 'XCNTS': 'LATITUDE', 'YDNTS': "LONGITUDE"}, inplace=True)
        park['LATITUDE'].replace('', np.nan, inplace=True)
        park['LONGITUDE'].replace('', np.nan, inplace=True)
        park = park.dropna()
        park['LATITUDE'] = park['LATITUDE'].astype(float)
        park['LONGITUDE'] = park['LONGITUDE'].astype(float)
        # 가장 가까운 위치 찾기
        min_distance = float('inf')
        for index, row in park.iterrows():
            point = (row['LATITUDE'], row['LONGITUDE'])
            distance = haversine(my_loc, point)
            if distance < min_distance:
                min_distance = distance
                park_name, park_lat, park_long, park_adres = row['NAME'], row['LATITUDE'], row['LONGITUDE'], row['ADRES']
    elif rain != '강수없음':
        # 도서관 정보 불러오기 및 추천 로직
        lib_url = 'http://openAPI.seoul.go.kr:8088/57524f76506d656e3732636a52457a/json/SeoulLibraryTimeInfo/1/1000/'
        lib_response = requests.get(lib_url)
        lib_data = lib_response.json()['SeoulLibraryTimeInfo']['row']
        lib = pd.DataFrame(lib_data)
        lib_url2 = 'http://openAPI.seoul.go.kr:8088/57524f76506d656e3732636a52457a/json/SeoulLibraryTimeInfo/1001/2000/'
        lib_response2 = requests.get(lib_url2)
        lib_data2 = lib_response2.json()['SeoulLibraryTimeInfo']['row']
        lib2 = pd.DataFrame(lib_data2)
        lib = pd.concat([lib,lib2])
        lib.rename(columns={'LBRRY_NAME': "NAME", 'ADRES': "ADRES", 'XCNTS': 'LATITUDE', 'YDNTS': "LONGITUDE"}, inplace=True)
        lib['LATITUDE'] = lib['LATITUDE'].astype(float)
        lib['LONGITUDE'] = lib['LONGITUDE'].astype(float)
        # 가장 가까운 위치 찾기
        min_distance = float('inf')
        for index, row in lib.iterrows():
            point = (row['LATITUDE'], row['LONGITUDE'])
            distance = haversine(my_loc, point)
            if distance < min_distance:
                min_distance = distance
                lib_name, lib_lat, lib_long, lib_adres = row['NAME'], row['LATITUDE'], row['LONGITUDE'], row['ADRES']
    else:
        # 박물관 정보 불러오기 및 추천 로직
        muse_url = 'http://openAPI.seoul.go.kr:8088/57524f76506d656e3732636a52457a/json/SeoulMuseumInfo/1/1000/'
        muse_response = requests.get(muse_url)
        muse_data = muse_response.json()['SeoulMuseumInfo']['row']
        muse = pd.DataFrame(muse_data)
        muse.rename(columns={'MUSEUM_NAME': "NAME", 'ADDR': "ADRES", 'XCNTS': 'LATITUDE', 'YDNTS': "LONGITUDE"}, inplace=True)
        muse['LATITUDE'] = muse['LATITUDE'].astype(float)
        muse['LONGITUDE'] = muse['LONGITUDE'].astype(float)
        # 가장 가까운 위치 찾기
        min_distance = float('inf')
        for index, row in muse.iterrows():
            point = (row['LATITUDE'], row['LONGITUDE'])
            distance = haversine(my_loc, point)
            if distance < min_distance:
                min_distance = distance
                muse_name, muse_lat, muse_long, muse_adres = row['NAME'], row['LATITUDE'], row['LONGITUDE'], row['ADRES']

    result = {
        "name": park_name or lib_name or muse_name,
        "latitude": park_lat or lib_lat or muse_lat,
        "longitude": park_long or lib_long or muse_long,
        "address": park_adres or lib_adres or muse_adres,
        "place_type": "공원" if park_name else "도서관" if lib_name else "박물관"
    }
    return result

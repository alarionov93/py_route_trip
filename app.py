from flask import Flask, request, jsonify, render_template
from threading import Thread
from queue import Queue, Empty
# import models
# import config
import datetime
# import const
# import logging
from pprint import pprint
import json
import requests
import pdb


app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
	
	return render_template('index.html')

def get_coords(res_pts, idx, q):

	def parse_dict(d):
		try:
			item = d.popitem()
			elem = item[1]
		except AttributeError:
			return d
		
		return parse_dict(elem)
	try:
		res = requests.get("https://geocode-maps.yandex.ru/1.x?apikey=063a0509-ec40-4683-b6e3-cdd341b15416&geocode=%s&results=5&format=json" % res_pts[idx], headers={'User-Agent': 'curl/7.78.0', 'Accept': '*/*'}).json()
	except IndexError:
		print(idx, res_pts)
		raise Exception("AAAAAAAAAAAA")
	for lst_elem in parse_dict(res):
		try:
			kind = lst_elem['GeoObject']['metaDataProperty']['GeocoderMetaData']['kind']
			name = lst_elem['GeoObject']['name']
			if kind != 'hydro':
				q.put((idx, [lst_elem['GeoObject']['Point']['pos'].split(' ')[1], lst_elem['GeoObject']['Point']['pos'].split(' ')[0]]))
		except KeyError:
			print("[ERROR]: Can not get some keys!")


@app.route("/get_pts", methods=['GET'])
def points():

	txt = open('data.json', 'r')
	pts_data = open('points.txt', 'r').read()
	struct = json.load(txt)
	p_lst = pts_data.split(';')

	res_pts = []
	idxs = []
	for p in p_lst:
		try:
			for ref_pt in struct[p]:
				res_pts.append([ref_pt["coord"].split(',')[0], ref_pt["coord"].split(',')[1].strip()])
		except KeyError:
			res_pts.append(p)
			idxs.append(res_pts.index(p))

	# print(idxs)

	threads = []
	q = Queue()
	for idx in idxs:
		threads.append(Thread(target=get_coords, args=(res_pts, idx, q)))
		threads[-1].start()

	for t in threads:
		t.join()

	try:
		while 1:
			idx, res = q.get(timeout=1)
			res_pts[idx] = res
			# print(res_pts)
	except Empty:
		print("Фсё кончилось...")

	return json.dumps(res_pts, ensure_ascii=0)






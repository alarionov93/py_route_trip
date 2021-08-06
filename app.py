from flask import Flask, request, jsonify, render_template
# import models
# import config
import datetime
# import const
# import logging
import json

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():

	'''
	Only testing
	'''
	# txt = open('data.json', 'r')
	# struct = json.load(txt)
	# points = 'КатавИвановск-ВерхКатавка-Лемеза-Искушата-Усмангали-Айгир-Бердагулово-Серменево-ВерхнийАвзян-Макарово-Аскарово-Старосубхангулово-ШульганТаш-Иргызлы-Бикбулатово-Мурадым-Мраково-Нугуш-Ахмерово-Вертолетная'
	# p_lst = points.split('-')
	# # for k in struct:
	# 	# if k in p_lst:
	# 		# print(struct[k])
	# res_pts = []
	# for p in p_lst:
	# 	try:
	# 		for ref_pt in struct[p]:
	# 			res_pts.append([ref_pt["coord"].split(',')[0], ref_pt["coord"].split(',')[1]])
	# 	except KeyError:
	# 		res_pts.append(p)
	###################

	return render_template('index.html')

@app.route("/get_pts", methods=['GET'])
def points():

	txt = open('data.json', 'r')
	pts_data = open('points.txt', 'r').read()
	struct = json.load(txt)
	p_lst = pts_data.split(';')
	# for k in struct:
		# if k in p_lst:
			# print(struct[k])
	res_pts = []
	for p in p_lst:
		try:
			for ref_pt in struct[p]:
				res_pts.append([ref_pt["coord"].split(',')[0], ref_pt["coord"].split(',')[1].strip()])
		except KeyError:
			res_pts.append(p)

	print(res_pts)

	return json.dumps(res_pts, ensure_ascii=0)

from flask import Flask, render_template, url_for, session, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, TODO

import database_sqlite 
import sys 

import sqlite3


app = Flask(__name__)


# connect the __init__.py to the database
# engine = create_engine('sqlite:///the_database.db')

database_sqlite




@app.route('/')
def index(): 
    todo_list = database_sqlite.get_all()
    return render_template('index.html', data = todo_list)

@app.route('/add_task', methods=['POST'])
def add_task():
    body = request.get_json()
    # print(body)
    
    name = body.get("name", None)
    content=body.get("content", None)
    last_id = database_sqlite.add_task(name, content)
    
    return jsonify({
        'success':True,
        'status':200,
        'todo':{
            'id': last_id, 
            'name': name, 
            'content': content
            }
    })




if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, render_template, url_for, session, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


import database_sqlite, database_setup 
import sys 

import sqlite3

sql_alchemy=False
app = Flask(__name__)
if sql_alchemy:
    database_setup.setup_db(app)
    # database_setup.db_drop_and_create_all()



# connect the __init__.py to the database
# engine = create_engine('sqlite:///the_database.db')

database_sqlite



@app.route('/')
def index(): 
    if sql_alchemy:
        todo_list = database_setup.TODO.select_all()
    else:
        todo_list = database_sqlite.get_all()
    
    print(todo_list)
    return render_template('index.html', data = todo_list)

@app.route('/add_task', methods=['POST'])
def add_task():
    body = request.get_json()
    # print(body)
    
    name = body.get("name", None)
    content=body.get("content", None)
    if sql_alchemy:
        last_id = database_sqlite.add_task(name, content)
    else:
        last_id = database_setup.TODO.insert(database_setup.TODO(None, name, content))
    
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
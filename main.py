# from SQLAlchemy.sql.schema import PrimaryKeyConstraint
#####
from flask import Flask, render_template, url_for, session, jsonify
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

@app.route('/add_task/<string:name>/<string:content>')
def add_task(name, content):
    
    database_sqlite.add_task(name, content)
    return ''




if __name__ == '__main__':
    app.run(debug=True)
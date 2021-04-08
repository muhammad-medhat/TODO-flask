import os
from sqlalchemy import Column, String, Integer
from flask_sqlalchemy import SQLAlchemy
import json

database_filename = "db_sqlalchemy.db"
project_dir = os.path.dirname(os.path.abspath(__file__))
database_path = "sqlite:///{}".format(
            os.path.join(project_dir, database_filename)
        )

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''


def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)


def db_drop_and_create_all():
    db.drop_all()
    db.create_all()

class TODO(db.Model):
    __tablename__ = 'todo'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    content = Column(String(250), nullable=False)
    prog = Column(Integer, default=0)
    # date_created = Column(datetime, default=dateTime.now())
    
    def __init__(self, id, name, content='', prog=0):
        self.id = id
        self.name = name
        self.content = content
        self.prog = prog
        

    def select_all():
        # q = db.session.query(TODO)
        return db.session.query(TODO).all()
    
    def insert(self):
        print('===========================')
        print(self.format())
        
        db.session.add(self)
        db.session.commit()
        return self.id

    def delete(self):
        db.session.delete(self)
        db.session.commit()
        
    def update(self):
        db.session.commit()
    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'content': self.content,
            'prog': self.prog
        }

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3

def init():
    db = sqlite3.connect('db_sqlite.db')
    cr = db.cursor()
    cr.execute("create table if not exists todo(id integer primary key, name text, content text, prog integer)")
    return db



# cr.execute("insert into todo (name, content, prog) values ('Developing Html', 'Creating a simple html page' , 20)")
# cr.execute("insert into todo (name, content, prog) values ('Developing Css',  'Creating a simple style'     , 50)")
# cr.execute("insert into todo (name, content, prog) values ('Developing Js',   'Creating a simple script'    , 80)")

# db.commit()
# db.close()

def get_all():
    db = init()
    cr=db.cursor()
    cr.execute('select * from todo order by id desc')
    ret = cr.fetchall()
    db.close()
    return ret
    

def add_task(name, content):
    db = init()
    cr=db.cursor()    
    cr.execute(f"insert into todo(name, content, prog) values ('{name}', '{content}', 0)")
    db.commit()
    db.close()
    return cr.lastrowid
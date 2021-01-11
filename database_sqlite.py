#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3

def init():
    db = sqlite3.connect('app.db')
    cr = db.cursor()
    cr.execute("create table if not exists todo(id integer primary key, name text, content text, prog integer)")
    return cr



# cr.execute("insert into todo (name, content, prog) values ('Developing Html', 'Creating a simple html page' , 20)")
# cr.execute("insert into todo (name, content, prog) values ('Developing Css',  'Creating a simple style'     , 50)")
# cr.execute("insert into todo (name, content, prog) values ('Developing Js',   'Creating a simple script'    , 80)")

# db.commit()
# db.close()

def get_all():
    cr = init()
    cr.execute('select * from todo')
    return cr.fetchall()
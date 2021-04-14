#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sqlite3

def init():
    db = sqlite3.connect('db_sqlite.db')
    cr = db.cursor()
    cr.execute('''
            create table if not exists todo(
                id integer primary key, 
                name text, 
                content text, 
                prog integer
            );''')
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
    l = [{
        'id':t[0], 'name':t[1], 'content':t[2], 'prog':t[3]
    } for t in ret]
    return l

def add_task(name, content):
    db = init()
    cr=db.cursor()    
    cr.execute(f'''
            insert into todo(
                name, content, prog
                ) 
            values (
                '{name}', 
                '{content}', 
                0);
            ''')
    db.commit()
    db.close()
    return cr.lastrowid

def delete(task_id):
    db = init()
    cr=db.cursor()    
    cr.execute(f'''
            delete from todo 
            where id={task_id};
        ''')
    db.commit()
    db.close()

def update(task_id, tname, tcont, tprog):
    q = f'''
    update todo 
        set name='{tname}', 
        content='{tcont}', 
        prog='{tprog}' 
        where id={task_id};'''
    print(q)
    db = init()
    cr=db.cursor()    
    cr.execute(q)
    db.commit()
    db.close()
